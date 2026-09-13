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

type HomepageSections = Omit<HomepageData, "sectionHeadings" | "formatsCatalog">;

/**
 * Maps only the sections present in the payload, without throwing on missing
 * ones. Used for the static-runtime client refetch so a single missing/changed
 * section never discards live updates for the others (the caller merges the
 * result over the build-time snapshot).
 */
export function homepagePayloadToPartialData(
  homepage: CmsHomepageResponse,
): Partial<HomepageSections> {
  const result: Partial<HomepageSections> = {};

  if (homepage.slides) result.slides = homepage.slides.map(mapSlide);
  if (homepage.products) {
    result.products = homepage.products.map((item) =>
      mapProduct(item, { productBadges: PRODUCT_BADGES }),
    );
  }
  if (homepage.ingredients) result.ingredients = homepage.ingredients.map(mapIngredient);
  if (homepage.certifications) {
    result.certifications = homepage.certifications.map(mapCertification);
  }
  if (homepage.articles) result.articles = homepage.articles.map(mapArticle);
  if (homepage.socialPosts) result.socialPosts = homepage.socialPosts.map(mapSocialPost);
  if (homepage.social !== undefined) {
    result.socialHandle = homepage.social?.handle ?? null;
    result.socialProfileHref = homepage.social?.profileHref ?? null;
  }

  return result;
}
