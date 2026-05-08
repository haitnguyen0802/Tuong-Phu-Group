import { articles as fallbackArticles } from "@/data/articles";
import { certifications as fallbackCertifications } from "@/data/certifications";
import { ingredients as fallbackIngredients } from "@/data/ingredients";
import { bestSellers as fallbackProducts } from "@/data/products";
import {
  socialHandle as fallbackSocialHandle,
  socialPosts as fallbackSocialPosts,
  socialProfileHref as fallbackSocialProfileHref,
} from "@/data/social";
import { heroSlides as fallbackSlides } from "@/data/slides";
import type { ProductBadge } from "@/types";
import { mapArticle, mapCertification, mapIngredient, mapProduct, mapSlide, mapSocialPost } from "./mappers";
import {
  queryArticles,
  queryCertifications,
  queryHomepagePayload,
  queryIngredients,
  queryProducts,
  querySlides,
  querySocialMeta,
  querySocialPosts,
} from "./queries";
import type { HomepageData } from "./types";

const PRODUCT_BADGES: ProductBadge[] = ["new", "bestseller", "low-stock", "limited"];

function withFallback<T>(input: T[] | undefined | null, fallback: T[]) {
  return input && input.length > 0 ? input : fallback;
}

export async function getHomepageData(): Promise<HomepageData> {
  const homepage = await queryHomepagePayload();

  const [
    slidesResult,
    productsResult,
    ingredientsResult,
    certificationsResult,
    articlesResult,
    socialPostsResult,
    socialMetaResult,
  ] = await Promise.allSettled([
    homepage?.slides ? Promise.resolve(homepage.slides) : querySlides(),
    homepage?.products ? Promise.resolve(homepage.products) : queryProducts(),
    homepage?.ingredients ? Promise.resolve(homepage.ingredients) : queryIngredients(),
    homepage?.certifications
      ? Promise.resolve(homepage.certifications)
      : queryCertifications(),
    homepage?.articles ? Promise.resolve(homepage.articles) : queryArticles(),
    homepage?.socialPosts ? Promise.resolve(homepage.socialPosts) : querySocialPosts(),
    homepage?.social ? Promise.resolve(homepage.social) : querySocialMeta(),
  ]);

  const cmsSlides = slidesResult.status === "fulfilled" ? slidesResult.value : [];
  const cmsProducts = productsResult.status === "fulfilled" ? productsResult.value : [];
  const cmsIngredients =
    ingredientsResult.status === "fulfilled" ? ingredientsResult.value : [];
  const cmsCertifications =
    certificationsResult.status === "fulfilled" ? certificationsResult.value : [];
  const cmsArticles = articlesResult.status === "fulfilled" ? articlesResult.value : [];
  const cmsSocialPosts =
    socialPostsResult.status === "fulfilled" ? socialPostsResult.value : [];
  const cmsSocialMeta = socialMetaResult.status === "fulfilled" ? socialMetaResult.value : null;

  const slides = withFallback(
    cmsSlides.map((item, index) => mapSlide(item, fallbackSlides[index] ?? fallbackSlides[0])),
    fallbackSlides,
  );

  const products = withFallback(
    cmsProducts.map((item, index) =>
      mapProduct(item, fallbackProducts[index] ?? fallbackProducts[0], {
        productBadges: PRODUCT_BADGES,
      }),
    ),
    fallbackProducts,
  );

  const ingredients = withFallback(
    cmsIngredients.map((item, index) =>
      mapIngredient(item, fallbackIngredients[index] ?? fallbackIngredients[0]),
    ),
    fallbackIngredients,
  );

  const certifications = withFallback(
    cmsCertifications.map((item, index) =>
      mapCertification(item, fallbackCertifications[index] ?? fallbackCertifications[0]),
    ),
    fallbackCertifications,
  );

  const articles = withFallback(
    cmsArticles.map((item, index) =>
      mapArticle(item, fallbackArticles[index] ?? fallbackArticles[0]),
    ),
    fallbackArticles,
  );

  const socialPosts = withFallback(
    cmsSocialPosts.map((item, index) =>
      mapSocialPost(item, fallbackSocialPosts[index] ?? fallbackSocialPosts[0]),
    ),
    fallbackSocialPosts,
  );

  const hasCmsData =
    cmsSlides.length > 0 ||
    cmsProducts.length > 0 ||
    cmsIngredients.length > 0 ||
    cmsCertifications.length > 0 ||
    cmsArticles.length > 0 ||
    cmsSocialPosts.length > 0;

  const cmsCoverage = {
    slides: cmsSlides.length > 0,
    products: cmsProducts.length > 0,
    ingredients: cmsIngredients.length > 0,
    certifications: cmsCertifications.length > 0,
    articles: cmsArticles.length > 0,
    socialPosts: cmsSocialPosts.length > 0,
  };
  const allFromCms = Object.values(cmsCoverage).every(Boolean);

  return {
    slides,
    products,
    ingredients,
    certifications,
    articles,
    socialPosts,
    socialHandle: cmsSocialMeta?.handle ?? fallbackSocialHandle,
    socialProfileHref: cmsSocialMeta?.profileHref ?? fallbackSocialProfileHref,
    source: !hasCmsData ? "fallback" : allFromCms ? "cms" : "mixed",
  };
}
