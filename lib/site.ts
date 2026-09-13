import { getSiteChromeData } from "@/lib/api/site";

const FALLBACK_SITE_URL = "https://tuongphugroup.vn";

function sanitizeSiteUrl(value: string): string {
  return value.endsWith("/") ? value.slice(0, -1) : value;
}

export const siteUrl = sanitizeSiteUrl(
  process.env.NEXT_PUBLIC_SITE_URL || FALLBACK_SITE_URL,
);

export async function getSiteTitle() {
  const chrome = await getSiteChromeData();
  return `${chrome.brand.name} — ${chrome.brand.tagline}`;
}
