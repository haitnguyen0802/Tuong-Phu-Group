import type { ImageAsset, ProductBadge } from "@/types";
import type {
  CmsArticle,
  CmsCertification,
  CmsImage,
  CmsIngredient,
  CmsProduct,
  CmsSlide,
  CmsSocialPost,
  MapperContext,
} from "./types";

function mapImage(image: CmsImage | undefined, fallback: ImageAsset): ImageAsset {
  if (!image) return fallback;
  return {
    src: image.src ?? image.url ?? fallback.src,
    alt: image.alt ?? fallback.alt,
    width: image.width ?? fallback.width,
    height: image.height ?? fallback.height,
  };
}

export function mapSlide(raw: CmsSlide, fallback: (typeof import("@/data/slides"))["heroSlides"][number]) {
  return {
    id: raw.id ?? fallback.id,
    eyebrow: raw.eyebrow ?? fallback.eyebrow,
    title: raw.title ?? fallback.title,
    description: raw.description ?? fallback.description,
    ctaLabel: raw.ctaLabel ?? fallback.ctaLabel,
    ctaHref: raw.ctaHref ?? fallback.ctaHref,
    backgroundClass: raw.backgroundClass ?? fallback.backgroundClass,
    accentClass: raw.accentClass ?? fallback.accentClass,
    image: mapImage(raw.image, fallback.image),
  };
}

export function mapProduct(
  raw: CmsProduct,
  fallback: (typeof import("@/data/products"))["bestSellers"][number],
  context: MapperContext,
) {
  const allowedBadges = new Set<ProductBadge>(context.productBadges);
  const mappedBadges = (raw.badges ?? fallback.badges).filter((badge): badge is ProductBadge =>
    allowedBadges.has(badge as ProductBadge),
  );

  return {
    id: raw.id ?? fallback.id,
    slug: raw.slug ?? fallback.slug,
    name: raw.name ?? fallback.name,
    shortDescription: raw.shortDescription ?? fallback.shortDescription,
    category: raw.category ?? fallback.category,
    price: raw.price ?? fallback.price,
    comparePrice: raw.comparePrice ?? fallback.comparePrice,
    stock: raw.stock ?? fallback.stock,
    badges: mappedBadges.length > 0 ? mappedBadges : fallback.badges,
    frontImage: mapImage(raw.frontImage, fallback.frontImage),
    backImage: mapImage(raw.backImage, fallback.backImage),
    galleryImages:
      raw.galleryImages?.map((image) => mapImage(image, fallback.frontImage)) ??
      fallback.galleryImages,
    ingredientIds: raw.ingredientIds ?? fallback.ingredientIds,
  };
}

export function mapIngredient(
  raw: CmsIngredient,
  fallback: (typeof import("@/data/ingredients"))["ingredients"][number],
) {
  return {
    id: raw.id ?? fallback.id,
    name: raw.name ?? fallback.name,
    region: raw.region ?? fallback.region,
    description: raw.description ?? fallback.description,
    image: mapImage(raw.image, fallback.image),
    toneClass: raw.toneClass ?? fallback.toneClass,
  };
}

export function mapCertification(
  raw: CmsCertification,
  fallback: (typeof import("@/data/certifications"))["certifications"][number],
) {
  return {
    id: raw.id ?? fallback.id,
    name: raw.name ?? fallback.name,
    organization: raw.organization ?? fallback.organization,
    description: raw.description ?? fallback.description,
    logo: raw.logo ?? fallback.logo,
  };
}

export function mapArticle(raw: CmsArticle, fallback: (typeof import("@/data/articles"))["articles"][number]) {
  return {
    id: raw.id ?? fallback.id,
    slug: raw.slug ?? fallback.slug,
    title: raw.title ?? fallback.title,
    excerpt: raw.excerpt ?? fallback.excerpt,
    category: raw.category ?? fallback.category,
    publishedAt: raw.publishedAt ?? fallback.publishedAt,
    readMinutes: raw.readMinutes ?? fallback.readMinutes,
    thumbnail: mapImage(raw.thumbnail, fallback.thumbnail),
  };
}

export function mapSocialPost(
  raw: CmsSocialPost,
  fallback: (typeof import("@/data/social"))["socialPosts"][number],
) {
  return {
    id: raw.id ?? fallback.id,
    href: raw.href ?? fallback.href,
    image: mapImage(raw.image, fallback.image),
    caption: raw.caption ?? fallback.caption,
    likes: raw.likes ?? fallback.likes,
    comments: raw.comments ?? fallback.comments,
  };
}
