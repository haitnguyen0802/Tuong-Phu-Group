import type { Brand, FooterData, NavItem } from "@/types";
import { fetchApiJson } from "@/lib/cms/client";
import { cmsNavigationSchema } from "@/lib/cms/schemas";
import { ApiError } from "./errors";
import { fetchFooter } from "./footer";
import { normalizeJsonFields, parseMaybeJson, pickFirst } from "./normalize";

type SiteChromeData = {
  brand: Brand;
  headerSections: NavItem[];
  searchSuggestions: string[];
};

function deriveTagline(footer: FooterData): string {
  const configured = process.env.NEXT_PUBLIC_SITE_TAGLINE?.trim();
  if (configured) return configured;

  const firstSentence = footer.description.split(/[.!?]/)[0]?.trim();
  return firstSentence || footer.name;
}

function footerToBrand(footer: FooterData): Brand {
  return {
    name: footer.name,
    tagline: deriveTagline(footer),
    description: footer.description,
    socials: footer.socials,
    contact: footer.contact,
  };
}

function readNavigation(value: unknown): Pick<SiteChromeData, "headerSections" | "searchSuggestions"> {
  const current = pickFirst(value);
  if (!current) {
    throw new ApiError("Navigation data from API is missing", 502);
  }

  const normalized = normalizeJsonFields(current, ["navItems", "headerSections", "searchSuggestions"]);
  const parsed = cmsNavigationSchema.safeParse(normalized);
  if (!parsed.success) {
    throw new ApiError("Navigation data from API is invalid", 502);
  }

  if (!parsed.data.headerSections.length) {
    throw new ApiError("Navigation headerSections from API is empty", 502);
  }

  return {
    headerSections: parsed.data.headerSections,
    searchSuggestions: parsed.data.searchSuggestions,
  };
}

export async function getSiteChromeData(): Promise<SiteChromeData> {
  const [footer, navigationResult] = await Promise.all([
    fetchFooter(),
    fetchApiJson<unknown>("/navigation"),
  ]);

  const navigation = readNavigation(navigationResult);

  return {
    brand: footerToBrand(footer),
    headerSections: navigation.headerSections,
    searchSuggestions: navigation.searchSuggestions,
  };
}

export { parseMaybeJson, normalizeJsonFields, pickFirst };
