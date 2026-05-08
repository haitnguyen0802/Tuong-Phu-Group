import { brand } from "@/data/brand";

const FALLBACK_SITE_URL = "https://verdara.example";

function sanitizeSiteUrl(value: string): string {
  return value.endsWith("/") ? value.slice(0, -1) : value;
}

export const siteUrl = sanitizeSiteUrl(
  process.env.NEXT_PUBLIC_SITE_URL || FALLBACK_SITE_URL,
);

export const siteTitle = `${brand.name} — ${brand.tagline}`;
