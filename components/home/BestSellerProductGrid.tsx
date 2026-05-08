import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { buttonStyles } from "@/components/ui/Button";
import { bestSellers } from "@/data/products";
import type { Product, ProductBadge } from "@/types";

const BADGE_LABELS: Record<ProductBadge, string> = {
  bestseller: "Best seller",
  new: "Moi",
  "low-stock": "Sap het",
  limited: "Gioi han",
};

const currencyFormatter = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
  maximumFractionDigits: 0,
});

function formatPrice(value: number) {
  return currencyFormatter.format(value);
}

function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[1.7rem] border border-line-100 bg-cream-50 transition-all duration-300 motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-[0_22px_45px_-30px_rgba(31,36,34,0.36)] motion-reduce:transform-none">
      <Link
        href={`/products/${product.slug}`}
        className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-moss-700/40 focus-visible:ring-offset-2 focus-visible:ring-offset-cream-50"
        aria-label={`Xem chi tiet ${product.name}`}
      >
        <div className="relative aspect-[4/5] overflow-hidden border-b border-line-100 bg-cream-100/70">
          <Image
            src={product.frontImage.src}
            alt={product.frontImage.alt}
            fill
            sizes="(min-width: 1280px) 22vw, (min-width: 768px) 30vw, 100vw"
            className="object-cover transition-opacity duration-500 motion-safe:group-hover:opacity-0"
          />
          <Image
            src={product.backImage.src}
            alt={product.backImage.alt}
            fill
            sizes="(min-width: 1280px) 22vw, (min-width: 768px) 30vw, 100vw"
            className="object-cover opacity-0 transition-opacity duration-500 motion-safe:group-hover:opacity-100 motion-reduce:hidden"
          />
          <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex flex-wrap gap-2 p-4">
            {product.badges.slice(0, 2).map((badge) => (
              <span
                key={badge}
                className="rounded-full border border-white/50 bg-white/85 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-700"
              >
                {BADGE_LABELS[badge]}
              </span>
            ))}
          </div>
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs uppercase tracking-[0.14em] text-ink-500">{product.category}</p>
        <h3 className="mt-2 text-lg font-semibold text-ink-900">
          <Link
            href={`/products/${product.slug}`}
            className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-moss-700/40 focus-visible:ring-offset-2 focus-visible:ring-offset-cream-50"
          >
            {product.name}
          </Link>
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-ink-600">{product.shortDescription}</p>
        <p className="mt-3 text-sm text-clay-600">
          {product.stock <= 10 ? `Chi con ${product.stock} san pham` : `San co ${product.stock} san pham`}
        </p>

        <div className="mt-4 flex items-end justify-between gap-3">
          <div className="flex items-end gap-2">
            <span className="text-lg font-semibold text-ink-900">{formatPrice(product.price)}</span>
            {product.comparePrice ? (
              <span className="text-sm text-ink-400 line-through">{formatPrice(product.comparePrice)}</span>
            ) : null}
          </div>
          <Link
            href={`/products/${product.slug}`}
            className="inline-flex items-center gap-1 text-sm font-medium text-moss-700 transition-colors hover:text-moss-800"
            aria-label={`Mua nhanh ${product.name}`}
          >
            Mua nhanh
            <ArrowRight className="h-4 w-4" aria-hidden strokeWidth={1.8} />
          </Link>
        </div>
      </div>
    </article>
  );
}

type BestSellerProductGridProps = {
  products?: Product[];
};

export function BestSellerProductGrid({ products = bestSellers }: BestSellerProductGridProps) {
  return (
    <section aria-label="San pham ban chay" className="pb-24 pt-8 sm:pb-28 lg:pt-12">
      <Container size="wide" className="space-y-10">
        <SectionTitle
          align="center"
          eyebrow="Best seller"
          title="Lua chon duoc dat mua nhieu nhat tai Verdara."
          lead="Danh sach san pham duoc doi ngu cong thuc toi uu ve cam giac su dung, do an toan va kha nang phuc hoi nen da."
        />

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="flex justify-center">
          <Link
            href="/products"
            className={buttonStyles({ variant: "outline", size: "lg" })}
            aria-label="Xem tat ca san pham Verdara"
          >
            Xem tat ca san pham
          </Link>
        </div>
      </Container>
    </section>
  );
}
