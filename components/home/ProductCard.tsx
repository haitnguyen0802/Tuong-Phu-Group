import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { Product, ProductBadge } from "@/types";

const BADGE_LABELS: Record<ProductBadge, string> = {
  bestseller: "Hot",
  new: "Mới",
  "low-stock": "Sắp hết slot",
  limited: "Độc quyền",
};

export function ProductCard({ product }: { product: Product }) {
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
        {product.stock > 0 ? (
          <p className="text-clay-600 text-sm">
            {product.stock <= 5
              ? `Chỉ còn ${product.stock} slot trong tháng`
              : `${product.stock} slot khả dụng`}
          </p>
        ) : null}
        <div className="flex items-center justify-between gap-3">
          <p className="text-ink-500 text-xs">Liên hệ email để nhận báo giá chi tiết.</p>
          <a
            href="mailto:sales@tuongphugroup.vn"
            className="text-moss-700 hover:text-moss-800 inline-flex shrink-0 items-center gap-1 text-sm font-medium transition-colors"
            aria-label={`Liên hệ báo giá ${product.name}`}
          >
            Liên hệ
            <ArrowRight className="h-4 w-4" aria-hidden strokeWidth={1.8} />
          </a>
        </div>
      </div>
    </article>
  );
}
