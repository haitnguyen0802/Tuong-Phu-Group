import { z } from "zod";

export const cmsImageSchema = z.object({
  src: z.string().optional(),
  url: z.string().optional(),
  alt: z.string().optional(),
  width: z.number().int().positive().optional(),
  height: z.number().int().positive().optional(),
});

export const cmsSlideSchema = z.object({
  id: z.string().optional(),
  eyebrow: z.string().optional(),
  title: z.string().optional(),
  description: z.string().optional(),
  ctaLabel: z.string().optional(),
  ctaHref: z.string().optional(),
  backgroundClass: z.string().optional(),
  accentClass: z.string().optional(),
  image: cmsImageSchema.optional(),
});

export const cmsProductSchema = z.object({
  id: z.string().optional(),
  slug: z.string().optional(),
  name: z.string().optional(),
  shortDescription: z.string().optional(),
  category: z.string().optional(),
  price: z.number().nonnegative().optional(),
  comparePrice: z.number().nonnegative().optional(),
  stock: z.number().int().nonnegative().optional(),
  badges: z.array(z.string()).optional(),
  frontImage: cmsImageSchema.optional(),
  backImage: cmsImageSchema.optional(),
  galleryImages: z.array(cmsImageSchema).optional(),
  ingredientIds: z.array(z.string()).optional(),
});

export const cmsIngredientSchema = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  region: z.string().optional(),
  description: z.string().optional(),
  image: cmsImageSchema.optional(),
  toneClass: z.string().optional(),
});

export const cmsCertificationSchema = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  organization: z.string().optional(),
  description: z.string().optional(),
  logo: z.string().optional(),
});

export const cmsArticleSchema = z.object({
  id: z.string().optional(),
  slug: z.string().optional(),
  title: z.string().optional(),
  excerpt: z.string().optional(),
  category: z.string().optional(),
  publishedAt: z.string().optional(),
  readMinutes: z.number().int().positive().optional(),
  thumbnail: cmsImageSchema.optional(),
});

export const cmsSocialPostSchema = z.object({
  id: z.string().optional(),
  href: z.string().optional(),
  image: cmsImageSchema.optional(),
  caption: z.string().optional(),
  likes: z.number().int().nonnegative().optional(),
  comments: z.number().int().nonnegative().optional(),
});

export const cmsSocialMetaSchema = z.object({
  handle: z.string().optional(),
  profileHref: z.string().optional(),
});

export const cmsHomepageSchema = z.object({
  slides: z.array(cmsSlideSchema).optional(),
  products: z.array(cmsProductSchema).optional(),
  ingredients: z.array(cmsIngredientSchema).optional(),
  certifications: z.array(cmsCertificationSchema).optional(),
  articles: z.array(cmsArticleSchema).optional(),
  socialPosts: z.array(cmsSocialPostSchema).optional(),
  social: cmsSocialMetaSchema.optional(),
});

export const cmsProductsSchema = z.object({
  products: z.array(cmsProductSchema),
});
