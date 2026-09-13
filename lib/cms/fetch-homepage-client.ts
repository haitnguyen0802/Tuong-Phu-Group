import { fetchSectionHeadings } from "@/lib/api/sectionHeadings";
import { buildPublicApiUrl } from "@/lib/api/runtime";
import { homepagePayloadToData } from "./homepage-from-payload";
import { API_QUERIES, parseFormatsCatalog, parseHomepagePayload } from "./queries";
import type { HomepageData } from "./types";
import type { FormatsCatalog } from "@/types";

/** Fetch the formats catalog promo card in the browser. Returns null when empty/disabled/404. */
async function fetchFormatsCatalogClient(): Promise<FormatsCatalog | null> {
  const response = await fetch(buildPublicApiUrl(API_QUERIES.formatsCatalog), {
    cache: "no-store",
    headers: { Accept: "application/json" },
  });

  if (response.status === 404) return null;
  if (!response.ok) return null;

  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return null;

  const raw: unknown = await response.json();
  return parseFormatsCatalog(raw);
}

/** Fetch homepage CMS data from the browser (for static export on cPanel). */
export async function fetchHomepageDataClient(): Promise<HomepageData> {
  const [homepageResponse, sectionHeadings, formatsCatalog] = await Promise.all([
    fetch(buildPublicApiUrl(API_QUERIES.homepage), {
      cache: "no-store",
      headers: { Accept: "application/json" },
    }),
    fetchSectionHeadings(),
    fetchFormatsCatalogClient(),
  ]);

  if (!homepageResponse.ok) {
    throw new Error(`Không tải được dữ liệu trang chủ (${homepageResponse.status}).`);
  }

  const contentType = homepageResponse.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    throw new Error("API trang chủ trả về dữ liệu không hợp lệ.");
  }

  const raw: unknown = await homepageResponse.json();

  return {
    ...homepagePayloadToData(parseHomepagePayload(raw)),
    sectionHeadings,
    formatsCatalog,
  };
}
