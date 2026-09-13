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
import type { CmsHomepageResponse, HomepageData } from "./types";

const PRODUCT_BADGES: ProductBadge[] = ["new", "bestseller", "low-stock", "limited"];

function requireHomepageSection<T>(value: T[] | undefined, section: string): T[] {
  if (!value) {
    throw new ApiError(`Homepage API is missing required section: ${section}`, 502);
  }
  return value;
}

export function homepagePayloadToData(
  homepage: CmsHomepageResponse,
): Omit<HomepageData, "sectionHeadings" | "formatsCatalog"> {
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
  };
}
