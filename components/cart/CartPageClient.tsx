"use client";

import Link from "next/link";
import { CartLineItem } from "@/components/cart/CartLineItem";
import { CartSummary } from "@/components/cart/CartSummary";
import { Container } from "@/components/ui/Container";
import { buttonStyles } from "@/components/ui/Button";
import { useCartStore } from "@/lib/store/useCartStore";
import { calculateOrderPricing } from "@/lib/utils/price";

export function CartPageClient() {
  const items = useCartStore((state) => state.items);
  const pricing = calculateOrderPricing(items);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <section className="py-16 sm:py-20">
      <Container size="wide" className="space-y-8">
        <div className="space-y-2">
          <p className="eyebrow text-moss-700">Cart</p>
          <h1 className="font-display text-4xl text-ink-900 sm:text-5xl">Gio hang cua ban</h1>
        </div>

        {items.length === 0 ? (
          <div className="rounded-3xl border border-line-100 bg-cream-50 p-8 text-center">
            <p className="text-base text-ink-700">Ban chua co san pham nao trong gio hang.</p>
            <Link href="/products" className={buttonStyles({ variant: "primary", size: "md" })}>
              Di mua sam
            </Link>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
            <div className="space-y-3">
              {items.map((item) => (
                <CartLineItem key={item.productId} item={item} />
              ))}
            </div>
            <div className="lg:sticky lg:top-24">
              <CartSummary pricing={pricing} itemCount={itemCount} />
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}
