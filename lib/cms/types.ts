import type {
  Article,
  CampaignSlide,
  Certification,
  ImageAsset,
  Ingredient,
  Product,
  ProductBadge,
  SocialPost,
} from "@/types";
import type { z } from "zod";
import type {
  cmsArticleSchema,
  cmsCertificationSchema,
  cmsHomepageSchema,
  cmsImageSchema,
  cmsIngredientSchema,
  cmsProductSchema,
  cmsSlideSchema,
  cmsSocialMetaSchema,
  cmsSocialPostSchema,
} from "./schemas";

export type CmsImage = z.infer<typeof cmsImageSchema> & Partial<ImageAsset>;
export type CmsSlide = z.infer<typeof cmsSlideSchema>;
export type CmsProduct = z.infer<typeof cmsProductSchema>;
export type CmsIngredient = z.infer<typeof cmsIngredientSchema>;
export type CmsCertification = z.infer<typeof cmsCertificationSchema>;
export type CmsArticle = z.infer<typeof cmsArticleSchema>;
export type CmsSocialPost = z.infer<typeof cmsSocialPostSchema>;
export type CmsSocialMeta = z.infer<typeof cmsSocialMetaSchema>;
export type CmsHomepageResponse = z.infer<typeof cmsHomepageSchema>;

export type HomepageData = {
  slides: CampaignSlide[];
  products: Product[];
  ingredients: Ingredient[];
  certifications: Certification[];
  articles: Article[];
  socialPosts: SocialPost[];
  socialHandle: string;
  socialProfileHref: string;
  source: "cms" | "fallback" | "mixed";
};

export type MapperContext = {
  productBadges: ProductBadge[];
};
