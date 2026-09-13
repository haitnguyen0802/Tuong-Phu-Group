import type { Product, ProductBadge } from "@/types";
import { mapIngredient, mapProduct } from "./mappers";
import {
  queryIngredients,
  queryProductBySlug,
  queryProducts,
} from "./queries";

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
};

export type ProductDetailData = {
  product: Product;
  related: Product[];
  ingredientSummary: string[];
};

function normalizeProducts(cmsProducts: Awaited<ReturnType<typeof queryProducts>>) {
  return cmsProducts.map((item) => mapProduct(item, { productBadges: PRODUCT_BADGES }));
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

  const categories = Array.from(new Set(products.map((item) => item.category)));
  const activeCategory =
    options.category && categories.includes(options.category) ? options.category : "all";
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
  };
}

export async function getProductDetailData(slug: string): Promise<ProductDetailData | null> {
  const [cmsProduct, cmsProducts, cmsIngredients] = await Promise.all([
    queryProductBySlug(slug),
    queryProducts(),
    queryIngredients(),
  ]);

  if (!cmsProduct) return null;

  const product = mapProduct(cmsProduct, { productBadges: PRODUCT_BADGES });
  const products = normalizeProducts(cmsProducts);

  const related = products
    .filter((item) => item.slug !== product.slug && item.category === product.category)
    .slice(0, 3);

  const ingredientMap = new Map(
    cmsIngredients.map((item) => [item.id, mapIngredient(item).name] as const),
  );
  const ingredientSummary = (product.ingredientIds ?? [])
    .map((id) => ingredientMap.get(id))
    .filter((name): name is string => Boolean(name));

  return {
    product,
    related,
    ingredientSummary,
  };
}
