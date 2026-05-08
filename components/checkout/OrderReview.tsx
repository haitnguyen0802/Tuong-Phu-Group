import { currencyFormatter } from "@/lib/utils/price";
import type { CartItem, OrderPricing } from "@/types";

type OrderReviewProps = {
  items: CartItem[];
  pricing: OrderPricing;
};

export function OrderReview({ items, pricing }: OrderReviewProps) {
  return (
    <aside className="space-y-4 rounded-3xl border border-line-100 bg-cream-50 p-5 sm:p-6">
      <h2 className="font-display text-2xl text-ink-900">Order review</h2>
      <ul className="space-y-2 text-sm text-ink-700">
        {items.map((item) => (
          <li key={item.productId} className="flex items-start justify-between gap-3">
            <span>
              {item.name} x {item.quantity}
            </span>
            <span>{currencyFormatter.format(item.price * item.quantity)}</span>
          </li>
        ))}
      </ul>

      <div className="h-px bg-line-200" />

      <dl className="space-y-1.5 text-sm text-ink-700">
        <div className="flex items-center justify-between">
          <dt>Subtotal</dt>
          <dd>{currencyFormatter.format(pricing.subtotal)}</dd>
        </div>
        <div className="flex items-center justify-between">
          <dt>Shipping</dt>
          <dd>{pricing.shippingFee ? currencyFormatter.format(pricing.shippingFee) : "Mien phi"}</dd>
        </div>
        <div className="flex items-center justify-between text-base font-semibold text-ink-900">
          <dt>Total</dt>
          <dd>{currencyFormatter.format(pricing.total)}</dd>
        </div>
      </dl>
    </aside>
  );
}
