import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { buttonStyles } from "@/components/ui/Button";
import { bestSellers } from "@/data/products";
import type { Product, ProductBadge } from "@/types";

const BADGE_LABELS: Record<ProductBadge, string> = {
  bestseller: "Hot",
  new: "Mới",
  "low-stock": "Sắp hết slot",
  limited: "Độc quyền",
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
    <article className="group border-line-100 bg-cream-50 relative flex h-full flex-col overflow-hidden rounded-[1.7rem] border transition-all duration-300 motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-[0_22px_45px_-30px_rgba(31,36,34,0.36)] motion-reduce:transform-none">
      <div className="block">
        <div className="border-line-100 bg-cream-100/70 relative aspect-[4/5] overflow-hidden border-b">
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
                className="text-ink-700 rounded-full border border-white/50 bg-white/85 px-2.5 py-1 text-[11px] font-semibold tracking-[0.12em] uppercase"
              >
                {BADGE_LABELS[badge]}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-ink-500 text-xs tracking-[0.14em] uppercase">{product.category}</p>
        <h3 className="text-ink-900 mt-2 text-lg font-semibold">{product.name}</h3>
        <p className="text-ink-600 mt-2 text-sm leading-relaxed">{product.shortDescription}</p>
        <p className="text-clay-600 mt-3 text-sm">
          {product.stock <= 5
            ? `Chỉ còn ${product.stock} slot trong tháng`
            : `${product.stock} slot khả dụng`}
        </p>

        <div className="mt-4 flex items-end justify-between gap-3">
          <div className="flex items-end gap-2">
            <span className="text-ink-900 text-lg font-semibold">{formatPrice(product.price)}</span>
            <span className="text-ink-500 text-xs">/tháng</span>
            {product.comparePrice ? (
              <span className="text-ink-400 text-sm line-through">
                {formatPrice(product.comparePrice)}
              </span>
            ) : null}
          </div>
          <a
            href="#newsletter"
            className="text-moss-700 hover:text-moss-800 inline-flex items-center gap-1 text-sm font-medium transition-colors"
            aria-label={`Yêu cầu báo giá ${product.name}`}
          >
            Báo giá nhanh
            <ArrowRight className="h-4 w-4" aria-hidden strokeWidth={1.8} />
          </a>
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
    <section aria-label="Vị trí OOH nổi bật" className="pt-8 pb-24 sm:pb-28 lg:pt-12">
      <Container size="wide" className="space-y-10">
        <SectionTitle
          align="center"
          eyebrow="Vị trí nổi bật"
          title="Top vị trí OOH được brand đặt nhiều nhất tại Tường Phú Group."
          lead="Danh mục được tổng hợp từ dữ liệu booking 2025 — ưu tiên các vị trí có lưu lượng cao, hợp đồng độc quyền và phù hợp đa ngành hàng."
        />

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="flex justify-center">
          <a
            href="#newsletter"
            className={buttonStyles({ variant: "outline", size: "lg" })}
            aria-label="Tư vấn vị trí OOH của Tường Phú Group"
          >
            Tư vấn vị trí OOH
          </a>
        </div>
      </Container>
    </section>
  );
}
