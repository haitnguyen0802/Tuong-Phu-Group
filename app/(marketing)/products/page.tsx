import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ProductGrid } from "@/components/product/ProductGrid";
import { getProductListingData } from "@/lib/cms/get-products-data";
import { siteUrl } from "@/lib/site";

type ProductsPageProps = {
  searchParams: Promise<{
    category?: string;
    sort?: "name-asc" | "price-asc" | "price-desc";
  }>;
};

export const metadata: Metadata = {
  title: "Products",
  description: "Danh sach san pham cham da thuong hieu Verdara.",
  alternates: { canonical: "/products" },
};

export const revalidate = 300;

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const params = await searchParams;
  const data = await getProductListingData({
    category: params.category,
    sort: params.sort,
  });

  const sortOptions = [
    { value: "name-asc", label: "Ten A-Z" },
    { value: "price-asc", label: "Gia thap den cao" },
    { value: "price-desc", label: "Gia cao den thap" },
  ] as const;

  return (
    <section className="py-16 sm:py-20">
      <Container size="wide" className="space-y-8">
        <div className="space-y-3">
          <p className="eyebrow text-moss-700">Product listing</p>
          <h1 className="font-display text-4xl text-ink-900 sm:text-5xl">San pham Verdara</h1>
          <p className="text-sm text-ink-500">
            Data source: <span className="font-medium">{data.source}</span> • Canonical: {siteUrl}/products
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-line-100 bg-cream-50 p-4">
          <div className="flex flex-wrap gap-2">
            <Link
              href="/products"
              className={`rounded-full px-4 py-2 text-sm ${data.activeCategory === "all" ? "bg-moss-700 text-cream-50" : "bg-cream-100 text-ink-700"}`}
            >
              Tat ca
            </Link>
            {data.categories.map((category) => (
              <Link
                key={category}
                href={`/products?category=${encodeURIComponent(category)}&sort=${data.activeSort}`}
                className={`rounded-full px-4 py-2 text-sm ${data.activeCategory === category ? "bg-moss-700 text-cream-50" : "bg-cream-100 text-ink-700"}`}
              >
                {category}
              </Link>
            ))}
          </div>

          <form action="/products" method="get" className="flex items-center gap-2">
            {data.activeCategory !== "all" ? (
              <input type="hidden" name="category" value={data.activeCategory} />
            ) : null}
            <label htmlFor="sort" className="text-sm text-ink-700">
              Sap xep
            </label>
            <select
              id="sort"
              name="sort"
              defaultValue={data.activeSort}
              className="rounded-full border border-line-200 bg-cream-50 px-4 py-2 text-sm"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <button type="submit" className="rounded-full bg-moss-700 px-4 py-2 text-sm text-cream-50">
              Ap dung
            </button>
          </form>
        </div>

        <ProductGrid items={data.items} />
      </Container>
    </section>
  );
}
