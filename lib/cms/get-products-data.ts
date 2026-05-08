import { ingredients } from "@/data/ingredients";
import { bestSellers as fallbackProducts } from "@/data/products";
import type { Product, ProductBadge } from "@/types";
import { mapProduct } from "./mappers";
import { queryProducts } from "./queries";

const PRODUCT_BADGES: ProductBadge[] = ["new", "bestseller", "low-stock", "limited"];

type ProductSort = "name-asc" | "price-asc" | "price-desc";

export type ProductListingOptions = {
  category?: string;
  sort?: ProductSort;
};

export type ProductListingData = {
  items: Product[];
  categories: string[];
  activeCategory: string;
  activeSort: ProductSort;
  source: "cms" | "fallback";
};

export type ProductDetailData = {
  product: Product;
  related: Product[];
  ingredientSummary: string[];
  source: "cms" | "fallback";
};

function normalizeProducts(cmsProducts: Awaited<ReturnType<typeof queryProducts>>) {
  if (!cmsProducts.length) return fallbackProducts;
  return cmsProducts.map((item, index) =>
    mapProduct(item, fallbackProducts[index] ?? fallbackProducts[0], {
      productBadges: PRODUCT_BADGES,
    }),
  );
}

function sortProducts(items: Product[], sort: ProductSort) {
  const list = [...items];
  if (sort === "price-asc") return list.sort((a, b) => a.price - b.price);
  if (sort === "price-desc") return list.sort((a, b) => b.price - a.price);
  return list.sort((a, b) => a.name.localeCompare(b.name, "vi"));
}

export async function getProductListingData(
  options: ProductListingOptions = {},
): Promise<ProductListingData> {
  const cmsProducts = await queryProducts();
  const products = normalizeProducts(cmsProducts);
  const source = cmsProducts.length ? "cms" : "fallback";

  const categories = Array.from(new Set(products.map((item) => item.category)));
  const activeCategory = options.category && categories.includes(options.category)
    ? options.category
    : "all";
  const activeSort = options.sort ?? "name-asc";

  const filtered =
    activeCategory === "all"
      ? products
      : products.filter((item) => item.category === activeCategory);

  return {
    items: sortProducts(filtered, activeSort),
    categories,
    activeCategory,
    activeSort,
    source,
  };
}

export async function getProductDetailData(slug: string): Promise<ProductDetailData | null> {
  const cmsProducts = await queryProducts();
  const products = normalizeProducts(cmsProducts);
  const source = cmsProducts.length ? "cms" : "fallback";

  const product = products.find((item) => item.slug === slug);
  if (!product) return null;

  const related = products
    .filter((item) => item.slug !== product.slug && item.category === product.category)
    .slice(0, 3);

  const ingredientSummary = ingredients.slice(0, 3).map((item) => item.name);

  return {
    product,
    related,
    ingredientSummary,
    source,
  };
}
