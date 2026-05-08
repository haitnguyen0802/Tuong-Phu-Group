"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { buttonStyles } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { currencyFormatter } from "@/lib/utils/price";
import { useCartStore } from "@/lib/store/useCartStore";
import type { CartItem } from "@/types";

type CartLineItemProps = {
  item: CartItem;
};

export function CartLineItem({ item }: CartLineItemProps) {
  const updateQty = useCartStore((state) => state.updateQty);
  const removeItem = useCartStore((state) => state.removeItem);

  return (
    <article className="flex gap-4 rounded-2xl border border-line-100 bg-cream-50 p-3">
      <div className="relative h-24 w-20 overflow-hidden rounded-xl bg-cream-100">
        <Image src={item.image.src} alt={item.image.alt} fill className="object-cover" sizes="80px" />
      </div>

      <div className="min-w-0 flex-1 space-y-2">
        <div className="space-y-1">
          <Link href={`/products/${item.slug}`} className="line-clamp-2 text-sm font-medium text-ink-900">
            {item.name}
          </Link>
          <p className="text-sm text-ink-600">{currencyFormatter.format(item.price)}</p>
        </div>

        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center rounded-full border border-line-200">
            <button
              type="button"
              className={cn(buttonStyles({ variant: "ghost", size: "sm" }), "h-8 w-8 rounded-full p-0")}
              onClick={() => updateQty(item.productId, item.quantity - 1)}
              aria-label={`Giam so luong ${item.name}`}
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="min-w-8 text-center text-sm text-ink-900">{item.quantity}</span>
            <button
              type="button"
              className={cn(buttonStyles({ variant: "ghost", size: "sm" }), "h-8 w-8 rounded-full p-0")}
              onClick={() => updateQty(item.productId, item.quantity + 1)}
              aria-label={`Tang so luong ${item.name}`}
              disabled={item.quantity >= item.stock}
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>

          <button
            type="button"
            onClick={() => removeItem(item.productId)}
            className="inline-flex items-center gap-1 text-xs text-ink-500 hover:text-clay-600"
            aria-label={`Xoa ${item.name} khoi gio hang`}
          >
            <Trash2 className="h-3.5 w-3.5" /> Xoa
          </button>
        </div>
      </div>
    </article>
  );
}
