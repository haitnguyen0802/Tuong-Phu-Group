export type ImageAsset = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
};

export type NavItem = {
  label: string;
  href: string;
  highlight?: boolean;
  groups?: NavGroup[];
};

export type NavGroup = {
  title: string;
  items: { label: string; href: string; description?: string }[];
};

export type CampaignSlide = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  /** Background gradient classes (Tailwind) for the hero background layer. */
  backgroundClass: string;
  /** Foreground "product / scene" image. */
  image: ImageAsset;
  /** Decorative accent (kept lightweight). */
  accentClass?: string;
};

export type ProductBadge = "new" | "bestseller" | "low-stock" | "limited";

export type Product = {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  category: string;
  price: number;
  comparePrice?: number;
  stock: number;
  badges: ProductBadge[];
  frontImage: ImageAsset;
  backImage: ImageAsset;
  galleryImages?: ImageAsset[];
  ingredientIds?: string[];
};

export type Ingredient = {
  id: string;
  name: string;
  region: string;
  description: string;
  image: ImageAsset;
  /** Tailwind class applied to the side panel when this ingredient is active. */
  toneClass: string;
};

export type Certification = {
  id: string;
  name: string;
  organization: string;
  description: string;
  /** Inline SVG path or img src. */
  logo: string;
};

export type Article = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  publishedAt: string;
  readMinutes: number;
  thumbnail: ImageAsset;
};

export type SocialPost = {
  id: string;
  href: string;
  image: ImageAsset;
  caption: string;
  likes: number;
  comments: number;
};

export type Brand = {
  name: string;
  tagline: string;
  description: string;
  socials: FooterSocial[];
  contact: {
    hotline: string;
    email: string;
    address: string;
  };
};

export type FooterLogo = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type FooterSocial = {
  label: string;
  href: string;
  icon: "facebook" | "instagram" | "tiktok" | "youtube" | string;
};

export type FooterData = {
  name: string;
  logo: FooterLogo | null;
  description: string;
  contact: {
    hotline: string;
    hotline1: string;
    hotline2: string;
    email: string;
    email1: string;
    email2: string;
    address: string;
  };
  socials: FooterSocial[];
  footerCopyright: string;
};

export type FormatsCatalogHighlight = {
  title: string;
  description: string;
};

export type FormatsCatalogFeature = {
  title: string;
  description: string;
};

export type FormatsCatalogCta = {
  label: string;
  href: string;
  ariaLabel: string;
};

export type FormatsCatalog = {
  id: string;
  eyebrow: string;
  badge: string;
  feature: FormatsCatalogFeature;
  highlights: FormatsCatalogHighlight[];
  cta: FormatsCatalogCta;
  enabled: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
};

export type SectionKey = "featured" | "formats" | "partners" | "newsletter";
export type SectionAlign = "center" | "left";

export type SectionHeading = {
  id: string;
  sectionKey: SectionKey;
  eyebrow: string | null;
  title: string;
  lead: string | null;
  align: SectionAlign;
  enabled: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
};

export type CartItem = {
  productId: string;
  slug: string;
  name: string;
  price: number;
  image: ImageAsset;
  quantity: number;
  stock: number;
};

export type CheckoutFormValues = {
  contact: {
    email: string;
  };
  shipping: {
    fullName: string;
    phone: string;
    addressLine1: string;
    ward: string;
    district: string;
    city: string;
  };
  note?: string;
};

export type OrderPricing = {
  subtotal: number;
  shippingFee: number;
  total: number;
};

export type MockOrderPayload = {
  orderCode: string;
  items: CartItem[];
  pricing: OrderPricing;
  customer: CheckoutFormValues;
  createdAt: string;
};
