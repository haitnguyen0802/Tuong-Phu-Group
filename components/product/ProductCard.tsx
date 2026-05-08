import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Product } from "@/types";
import { ProductBadges } from "./ProductBadges";

type ProductCardProps = {
  product: Product;
};

const currency = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
  maximumFractionDigits: 0,
});

export function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[1.6rem] border border-line-100 bg-cream-50">
      <Link href={`/products/${product.slug}`} className="block">
        <div className="relative aspect-[4/5] overflow-hidden border-b border-line-100">
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
            className="object-cover opacity-0 transition-opacity duration-500 motion-safe:group-hover:opacity-100"
          />
        </div>
      </Link>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <p className="text-xs uppercase tracking-[0.14em] text-ink-500">{product.category}</p>
        <h3 className="text-lg font-semibold text-ink-900">
          <Link href={`/products/${product.slug}`}>{product.name}</Link>
        </h3>
        <p className="text-sm leading-relaxed text-ink-600">{product.shortDescription}</p>
        <ProductBadges badges={product.badges} />

        <div className="mt-auto flex items-end justify-between gap-3">
          <div className="flex items-end gap-2">
            <span className="text-lg font-semibold text-ink-900">{currency.format(product.price)}</span>
            {product.comparePrice ? (
              <span className="text-sm text-ink-400 line-through">
                {currency.format(product.comparePrice)}
              </span>
            ) : null}
          </div>
          <Link
            href={`/products/${product.slug}`}
            className="inline-flex items-center gap-1 text-sm font-medium text-moss-700"
          >
            Xem chi tiet
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </div>
    </article>
  );
}
