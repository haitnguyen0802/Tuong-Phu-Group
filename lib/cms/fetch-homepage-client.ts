import { fetchPublicApiClient } from "@/lib/api/fetch-public-client";
import { homepagePayloadToPartialData } from "./homepage-from-payload";
import {
  API_QUERIES,
  parseFormatsCatalog,
  parseFormatsCatalogStatus,
  parseHomepagePayload,
} from "./queries";
import type { HomepageData } from "./types";
import type { FormatsCatalog } from "@/types";
import type { SectionHeading, SectionKey } from "@/types";

type SectionHeadingsMap = Partial<Record<SectionKey, SectionHeading>>;

/**
 * Public status for the "Bảng kích thước" card.
 * Returns null when the endpoint is missing so callers can fall back to the
 * catalog payload's own `enabled` flag.
 */
async function fetchFormatsCatalogStatusClient(): Promise<boolean | null> {
  const response = await fetchPublicApiClient(API_QUERIES.formatsCatalogStatus);

  if (response.status === 404 || response.status === 501) return null;
  if (!response.ok) return null;

  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return null;

  const raw: unknown = await response.json();
  const status = parseFormatsCatalogStatus(raw);
  return status ? status.enabled : null;
}

/**
 * Fetch the formats catalog promo card in the browser.
 * Returns null when disabled (status API), empty, or 404.
 */
async function fetchFormatsCatalogClient(): Promise<FormatsCatalog | null> {
  const enabled = await fetchFormatsCatalogStatusClient();
  if (enabled === false) return null;

  const response = await fetchPublicApiClient(API_QUERIES.formatsCatalog);

  if (response.status === 404) return null;
  if (!response.ok) return null;

  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return null;

  const raw: unknown = await response.json();
  return parseFormatsCatalog(raw);
}

async function fetchSectionHeadingsClient(): Promise<SectionHeadingsMap> {
  const response = await fetchPublicApiClient("/section-headings");

  if (!response.ok) {
    throw new Error(`Không tải được section headings (${response.status}).`);
  }

  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    throw new Error("API section headings trả về dữ liệu không hợp lệ.");
  }

  const data = (await response.json()) as { sectionHeadings?: SectionHeading[] };
  const headings = data.sectionHeadings ?? [];
  return Object.fromEntries(headings.map((heading) => [heading.sectionKey, heading]));
}

/** Fetch the homepage sections (slides, products, ingredients, ...) in the browser. */
async function fetchHomepageSectionsClient(): Promise<Partial<HomepageData>> {
  const response = await fetchPublicApiClient(API_QUERIES.homepage);

  if (!response.ok) {
    throw new Error(`Không tải được dữ liệu trang chủ (${response.status}).`);
  }

  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    throw new Error("API trang chủ trả về dữ liệu không hợp lệ.");
  }

  const raw: unknown = await response.json();
  return homepagePayloadToPartialData(parseHomepagePayload(raw));
}

/**
 * Fetch homepage CMS data from the browser (for static export on cPanel).
 *
 * Each part is fetched independently so a single failing/changed section never
 * discards live updates for the others. The caller merges the returned partial
 * over the build-time snapshot.
 */
export async function fetchHomepageDataClient(): Promise<Partial<HomepageData>> {
  const [sections, sectionHeadings, formatsCatalog] = await Promise.allSettled([
    fetchHomepageSectionsClient(),
    fetchSectionHeadingsClient(),
    fetchFormatsCatalogClient(),
  ]);

  const result: Partial<HomepageData> = {};

  if (sections.status === "fulfilled") {
    Object.assign(result, sections.value);
  }
  if (sectionHeadings.status === "fulfilled") {
    result.sectionHeadings = sectionHeadings.value;
  }
  if (formatsCatalog.status === "fulfilled") {
    // Explicit null means "hide card" — must overwrite the build-time snapshot.
    result.formatsCatalog = formatsCatalog.value;
  }

  return result;
}
