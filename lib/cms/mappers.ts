import type {
  Article,
  CampaignSlide,
  Certification,
  FormatsCatalog,
  ImageAsset,
  Ingredient,
  Product,
  ProductBadge,
  SocialPost,
} from "@/types";
import type {
  CmsArticle,
  CmsCertification,
  CmsFormatsCatalog,
  CmsImage,
  CmsIngredient,
  CmsProduct,
  CmsSlide,
  CmsSocialPost,
  MapperContext,
} from "./types";

function mapImage(image: CmsImage): ImageAsset {
  const src = image.src ?? image.url;
  if (!src) {
    throw new Error("Image is missing src or url");
  }

  return {
    src,
    alt: image.alt ?? "",
    width: image.width,
    height: image.height,
  };
}

export function mapSlide(raw: CmsSlide): CampaignSlide {
  return {
    id: raw.id,
    eyebrow: raw.eyebrow,
    title: raw.title,
    description: raw.description,
    ctaLabel: raw.ctaLabel,
    ctaHref: raw.ctaHref,
    backgroundClass: raw.backgroundClass,
    accentClass: raw.accentClass,
    image: mapImage(raw.image),
  };
}

export function mapProduct(raw: CmsProduct, context: MapperContext): Product {
  const allowedBadges = new Set<ProductBadge>(context.productBadges);
  const badges = (raw.badges ?? []).filter((badge): badge is ProductBadge =>
    allowedBadges.has(badge as ProductBadge),
  );

  return {
    id: raw.id,
    slug: raw.slug,
    name: raw.name,
    shortDescription: raw.shortDescription,
    category: raw.category,
    price: raw.price ?? 0,
    comparePrice: raw.comparePrice ?? undefined,
    stock: raw.stock ?? 0,
    badges,
    frontImage: mapImage(raw.frontImage),
    backImage: raw.backImage ? mapImage(raw.backImage) : mapImage(raw.frontImage),
    galleryImages: raw.galleryImages?.map((image) => mapImage(image)),
    ingredientIds: raw.ingredientIds,
  };
}

export function mapIngredient(raw: CmsIngredient): Ingredient {
  return {
    id: raw.id,
    name: raw.name,
    region: raw.region,
    description: raw.description,
    image: mapImage(raw.image),
    toneClass: raw.toneClass,
  };
}

export function mapCertification(raw: CmsCertification): Certification {
  return {
    id: raw.id,
    name: raw.name,
    organization: raw.organization,
    description: raw.description,
    logo: raw.logo,
  };
}

export function mapArticle(raw: CmsArticle): Article {
  return {
    id: raw.id,
    slug: raw.slug,
    title: raw.title,
    excerpt: raw.excerpt,
    category: raw.category,
    publishedAt: raw.publishedAt,
    readMinutes: raw.readMinutes,
    thumbnail: mapImage(raw.thumbnail),
  };
}

export function mapSocialPost(raw: CmsSocialPost): SocialPost {
  return {
    id: raw.id,
    href: raw.href,
    image: mapImage(raw.image),
    caption: raw.caption,
    likes: raw.likes,
    comments: raw.comments,
  };
}

export function mapFormatsCatalog(raw: CmsFormatsCatalog): FormatsCatalog {
  return {
    id: raw.id,
    eyebrow: raw.eyebrow,
    badge: raw.badge,
    feature: {
      title: raw.feature.title,
      description: raw.feature.description,
    },
    highlights: raw.highlights.map((highlight) => ({
      title: highlight.title,
      description: highlight.description,
    })),
    cta: {
      label: raw.cta.label,
      href: raw.cta.href,
      ariaLabel: raw.cta.ariaLabel,
    },
    enabled: raw.enabled,
    sortOrder: raw.sortOrder,
    createdAt: raw.createdAt,
    updatedAt: raw.updatedAt,
  };
}
