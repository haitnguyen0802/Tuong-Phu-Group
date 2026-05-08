"use client";

import Link from "next/link";
import type { Product } from "@/types";
import { buttonStyles } from "@/components/ui/Button";
import { useCartStore } from "@/lib/store/useCartStore";
import { ProductBadges } from "./ProductBadges";

const currency = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
  maximumFractionDigits: 0,
});

type ProductInfoProps = {
  product: Product;
  ingredientSummary: string[];
};

export function ProductInfo({ product, ingredientSummary }: ProductInfoProps) {
  const addItem = useCartStore((state) => state.addItem);
  const outOfStock = product.stock < 1;

  return (
    <div className="space-y-6">
      <p className="text-xs uppercase tracking-[0.14em] text-moss-700">{product.category}</p>
      <h1 className="font-display text-4xl leading-tight text-ink-900 sm:text-5xl">{product.name}</h1>
      <p className="text-base leading-relaxed text-ink-600">{product.shortDescription}</p>
      <ProductBadges badges={product.badges} />

      <div className="flex items-end gap-3">
        <p className="text-2xl font-semibold text-ink-900">{currency.format(product.price)}</p>
        {product.comparePrice ? (
          <p className="text-sm text-ink-400 line-through">{currency.format(product.comparePrice)}</p>
        ) : null}
      </div>

      <p className="text-sm text-clay-600">
        {product.stock <= 10 ? `Chi con ${product.stock} san pham` : `San co ${product.stock} san pham`}
      </p>

      <div className="space-y-2">
        <p className="text-sm font-medium text-ink-800">Nguyen lieu noi bat</p>
        <ul className="flex flex-wrap gap-2">
          {ingredientSummary.map((name) => (
            <li
              key={name}
              className="rounded-full border border-line-200 bg-cream-50 px-3 py-1 text-xs text-ink-700"
            >
              {name}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          className={buttonStyles({ variant: "primary", size: "lg" })}
          disabled={outOfStock}
          onClick={() =>
            addItem(
              {
                productId: product.id,
                slug: product.slug,
                name: product.name,
                price: product.price,
                image: product.frontImage,
                stock: product.stock,
              },
              1,
            )
          }
        >
          {outOfStock ? "Tam het hang" : "Them vao gio"}
        </button>
        <Link href="/products" className={buttonStyles({ variant: "outline", size: "lg" })}>
          Quay lai danh sach
        </Link>
      </div>
    </div>
  );
}
