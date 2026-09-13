import { fetchSectionHeadings } from "@/lib/api/sectionHeadings";
import { ApiError } from "@/lib/api/errors";
import type { ProductBadge } from "@/types";
import {
  mapArticle,
  mapCertification,
  mapIngredient,
  mapProduct,
  mapSlide,
  mapSocialPost,
} from "./mappers";
import { queryFormatsCatalog, queryHomepagePayload } from "./queries";
import type { HomepageData } from "./types";

const PRODUCT_BADGES: ProductBadge[] = ["new", "bestseller", "low-stock", "limited"];

function requireHomepageSection<T>(value: T[] | undefined, section: string): T[] {
  if (!value) {
    throw new ApiError(`Homepage API is missing required section: ${section}`, 502);
  }
  return value;
}

export async function getHomepageData(): Promise<HomepageData> {
  const [homepage, sectionHeadings, formatsCatalog] = await Promise.all([
    queryHomepagePayload(),
    fetchSectionHeadings(),
    queryFormatsCatalog(),
  ]);

  return {
    slides: requireHomepageSection(homepage.slides, "slides").map(mapSlide),
    products: requireHomepageSection(homepage.products, "products").map((item) =>
      mapProduct(item, { productBadges: PRODUCT_BADGES }),
    ),
    ingredients: requireHomepageSection(homepage.ingredients, "ingredients").map(mapIngredient),
    certifications: requireHomepageSection(homepage.certifications, "certifications").map(
      mapCertification,
    ),
    articles: requireHomepageSection(homepage.articles, "articles").map(mapArticle),
    socialPosts: requireHomepageSection(homepage.socialPosts, "socialPosts").map(mapSocialPost),
    socialHandle: homepage.social?.handle ?? null,
    socialProfileHref: homepage.social?.profileHref ?? null,
    sectionHeadings,
    formatsCatalog,
  };
}
