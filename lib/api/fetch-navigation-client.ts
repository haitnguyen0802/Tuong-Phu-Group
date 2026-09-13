import { fetchPublicApiClient } from "./fetch-public-client";
import { normalizeJsonFields } from "./normalize";
import { cmsNavigationSchema } from "@/lib/cms/schemas";
import type { NavItem } from "@/types";

export type NavigationData = {
  headerSections: NavItem[];
  searchSuggestions: string[];
};

/** Fetch navigation from the browser (for static export on cPanel). */
export async function fetchNavigationClient(): Promise<NavigationData> {
  const response = await fetchPublicApiClient("/navigation");

  if (!response.ok) {
    throw new Error(`Không tải được navigation (${response.status}).`);
  }

  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    throw new Error("API navigation trả về dữ liệu không hợp lệ.");
  }

  const raw: unknown = await response.json();
  const normalized = normalizeJsonFields(raw, [
    "navItems",
    "headerSections",
    "searchSuggestions",
  ]);

  const parsed = cmsNavigationSchema.safeParse(normalized);
  if (!parsed.success) {
    throw new Error("Navigation từ API không hợp lệ.");
  }

  return {
    headerSections: parsed.data.headerSections,
    searchSuggestions: parsed.data.searchSuggestions,
  };
}
