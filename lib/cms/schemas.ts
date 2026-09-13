import { z } from "zod";

export const cmsImageSchema = z
  .object({
    src: z.string().optional(),
    url: z.string().optional(),
    alt: z.string().optional(),
    width: z.number().int().positive().optional(),
    height: z.number().int().positive().optional(),
  })
  .refine((data) => Boolean(data.src || data.url), {
    message: "Image requires src or url",
  });

export const cmsSlideSchema = z.object({
  id: z.string(),
  eyebrow: z.string(),
  title: z.string(),
  description: z.string(),
  ctaLabel: z.string(),
  ctaHref: z.string(),
  backgroundClass: z.string(),
  accentClass: z.string().optional(),
  image: cmsImageSchema,
});

export const cmsProductSchema = z.object({
  id: z.string(),
  slug: z.string(),
  name: z.string(),
  shortDescription: z.string(),
  category: z.string(),
  price: z.number().nonnegative(),
  comparePrice: z.number().nonnegative().nullable().optional(),
  stock: z.number().int().nonnegative(),
  badges: z.array(z.string()).optional(),
  frontImage: cmsImageSchema,
  backImage: cmsImageSchema,
  galleryImages: z.array(cmsImageSchema).optional(),
  ingredientIds: z.array(z.string()).optional(),
});

export const cmsIngredientSchema = z.object({
  id: z.string(),
  name: z.string(),
  region: z.string(),
  description: z.string(),
  image: cmsImageSchema,
  toneClass: z.string(),
});

export const cmsCertificationSchema = z.object({
  id: z.string(),
  name: z.string(),
  organization: z.string(),
  description: z.string(),
  logo: z.string(),
});

export const cmsArticleSchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  excerpt: z.string(),
  category: z.string(),
  publishedAt: z.string(),
  readMinutes: z.number().int().positive(),
  thumbnail: cmsImageSchema,
});

export const cmsSocialPostSchema = z.object({
  id: z.string(),
  href: z.string(),
  image: cmsImageSchema,
  caption: z.string(),
  likes: z.number().int().nonnegative(),
  comments: z.number().int().nonnegative(),
});

export const cmsSocialMetaSchema = z.object({
  handle: z.string(),
  profileHref: z.string(),
});

export const cmsSectionHeadingSchema = z.object({
  id: z.string(),
  sectionKey: z.enum(["featured", "formats", "partners", "newsletter"]),
  eyebrow: z.string().nullable(),
  title: z.string(),
  lead: z.string().nullable(),
  align: z.enum(["center", "left"]),
  enabled: z.boolean(),
  sortOrder: z.number().int(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const cmsFormatsCatalogSchema = z.object({
  id: z.string(),
  eyebrow: z.string(),
  badge: z.string(),
  feature: z.object({
    title: z.string(),
    description: z.string(),
  }),
  highlights: z.array(
    z.object({
      title: z.string(),
      description: z.string(),
    }),
  ),
  cta: z.object({
    label: z.string(),
    href: z.string(),
    ariaLabel: z.string(),
  }),
  enabled: z.boolean(),
  sortOrder: z.number().int(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

const brandSocialSchema = z.object({
  label: z.string(),
  href: z.string(),
  icon: z.enum(["instagram", "facebook", "tiktok", "youtube"]),
});

export const cmsBrandSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  tagline: z.string(),
  description: z.string(),
  socials: z.array(brandSocialSchema),
  contact: z.object({
    hotline: z.string(),
    email: z.string(),
    address: z.string(),
  }),
});

export const cmsNavigationSchema = z.object({
  id: z.string().optional(),
  navItems: z.array(z.unknown()).nullable().optional(),
  headerSections: z.array(
    z.object({
      label: z.string(),
      href: z.string(),
      highlight: z.boolean().optional(),
      groups: z
        .array(
          z.object({
            title: z.string(),
            items: z.array(
              z.object({
                label: z.string(),
                href: z.string(),
                description: z.string().optional(),
              }),
            ),
          }),
        )
        .optional(),
    }),
  ),
  searchSuggestions: z.array(z.string()),
});

export const cmsHomepageSchema = z.object({
  slides: z.array(cmsSlideSchema).optional(),
  products: z.array(cmsProductSchema).optional(),
  ingredients: z.array(cmsIngredientSchema).optional(),
  certifications: z.array(cmsCertificationSchema).optional(),
  articles: z.array(cmsArticleSchema).optional(),
  socialPosts: z.array(cmsSocialPostSchema).optional(),
  social: cmsSocialMetaSchema.nullable().optional(),
  sectionHeadings: z.array(cmsSectionHeadingSchema).optional(),
  navigation: cmsNavigationSchema.optional(),
  formatsCatalog: cmsFormatsCatalogSchema.nullable().optional(),
});

export const cmsAnnouncementsSchema = z.union([
  z.array(z.string()),
  z.object({ items: z.array(z.string()) }),
]);
