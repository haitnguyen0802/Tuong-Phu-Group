import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { ProductCard } from "@/components/product/ProductCard";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductInfo } from "@/components/product/ProductInfo";
import { getProductDetailData } from "@/lib/cms/get-products-data";

type ProductDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: ProductDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const detail = await getProductDetailData(slug);

  if (!detail) {
    return {
      title: "Product not found",
    };
  }

  return {
    title: detail.product.name,
    description: detail.product.shortDescription,
    alternates: {
      canonical: `/products/${detail.product.slug}`,
    },
  };
}

export const revalidate = 300;

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { slug } = await params;
  const detail = await getProductDetailData(slug);
  if (!detail) notFound();

  return (
    <section className="py-16 sm:py-20">
      <Container size="wide" className="space-y-8">
        <nav className="text-sm text-ink-500">
          <Link href="/">Home</Link> / <Link href="/products">Products</Link> /{" "}
          <span className="text-ink-700">{detail.product.name}</span>
        </nav>

        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <ProductGallery product={detail.product} />
          <ProductInfo product={detail.product} ingredientSummary={detail.ingredientSummary} />
        </div>

        {detail.related.length ? (
          <div className="space-y-4">
            <h2 className="font-display text-3xl text-ink-900">San pham lien quan</h2>
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {detail.related.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          </div>
        ) : null}
      </Container>
    </section>
  );
}
