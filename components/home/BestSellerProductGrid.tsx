import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { buttonStyles } from "@/components/ui/Button";
import type { Product, ProductBadge, SectionHeading } from "@/types";

const BADGE_LABELS: Record<ProductBadge, string> = {
  bestseller: "Hot",
  new: "Mới",
  "low-stock": "Sắp hết slot",
  limited: "Độc quyền",
};


function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group border-line-100 bg-cream-50 overflow-hidden rounded-[1.6rem] border">
      <div className="border-line-100 relative aspect-[4/3] overflow-hidden border-b">
        <Image
          src={product.frontImage.src}
          alt={product.frontImage.alt}
          fill
          sizes="(min-width: 1280px) 30vw, (min-width: 768px) 46vw, 100vw"
          className="object-cover transition-opacity duration-500 motion-safe:group-hover:opacity-0"
        />
        <Image
          src={product.backImage.src}
          alt={product.backImage.alt}
          fill
          sizes="(min-width: 1280px) 30vw, (min-width: 768px) 46vw, 100vw"
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

      <div className="space-y-4 p-5">
        <p className="text-ink-500 text-xs tracking-[0.14em] uppercase">{product.category}</p>
        <h3 className="text-ink-900 text-xl font-semibold">{product.name}</h3>
        <p className="text-ink-600 text-sm leading-relaxed">{product.shortDescription}</p>
        <p className="text-clay-600 text-sm">
          {product.stock <= 5
            ? `Chỉ còn ${product.stock} slot trong tháng`
            : `${product.stock} slot khả dụng`}
        </p>
        <div className="flex items-center justify-between gap-3">
          <p className="text-ink-500 text-xs">Liên hệ email để nhận báo giá chi tiết.</p>
          <a
            href="mailto:sales@tuongphugroup.vn"
            className="text-moss-700 hover:text-moss-800 inline-flex shrink-0 items-center gap-1 text-sm font-medium transition-colors"
            aria-label={`Liên hệ báo giá ${product.name}`}
          >
            Gửi email
            <ArrowRight className="h-4 w-4" aria-hidden strokeWidth={1.8} />
          </a>
        </div>
      </div>
    </article>
  );
}

type BestSellerProductGridProps = {
  products: Product[];
  heading?: SectionHeading;
};

export function BestSellerProductGrid({ products, heading }: BestSellerProductGridProps) {
  return (
    <section
      id="featured"
      aria-label="Các hạng mục OOH"
      className="pt-8 pb-24 sm:pb-28 lg:pt-12"
    >
      <Container size="wide" className="space-y-10">
        <SectionTitle heading={heading} />

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="flex justify-center">
          <a
            href="#newsletter"
            className={buttonStyles({ variant: "outline", size: "lg" })}
            aria-label="Tư vấn các hạng mục OOH của Tường Phú Group"
          >
            Tư vấn các hạng mục OOH của Tường Phú Group
          </a>
        </div>
      </Container>
    </section>
  );
}
