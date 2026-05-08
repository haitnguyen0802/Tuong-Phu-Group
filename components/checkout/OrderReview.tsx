import { currencyFormatter } from "@/lib/utils/price";
import type { CartItem, OrderPricing } from "@/types";

type OrderReviewProps = {
  items: CartItem[];
  pricing: OrderPricing;
};

export function OrderReview({ items, pricing }: OrderReviewProps) {
  return (
    <aside className="space-y-4 rounded-3xl border border-line-100 bg-cream-50 p-5 sm:p-6">
      <h2 className="font-display text-2xl text-ink-900">Tóm tắt yêu cầu báo giá</h2>
      <ul className="space-y-2 text-sm text-ink-700">
        {items.map((item) => (
          <li key={item.productId} className="flex items-start justify-between gap-3">
            <span>
              {item.name} × {item.quantity} tháng
            </span>
            <span>{currencyFormatter.format(item.price * item.quantity)}</span>
          </li>
        ))}
      </ul>

      <div className="h-px bg-line-200" />

      <dl className="space-y-1.5 text-sm text-ink-700">
        <div className="flex items-center justify-between">
          <dt>Tạm tính</dt>
          <dd>{currencyFormatter.format(pricing.subtotal)}</dd>
        </div>
        <div className="flex items-center justify-between">
          <dt>Phí khảo sát & lắp đặt</dt>
          <dd>
            {pricing.shippingFee
              ? currencyFormatter.format(pricing.shippingFee)
              : "Miễn phí"}
          </dd>
        </div>
        <div className="flex items-center justify-between text-base font-semibold text-ink-900">
          <dt>Tổng dự kiến</dt>
          <dd>{currencyFormatter.format(pricing.total)}</dd>
        </div>
      </dl>

      <p className="text-xs text-ink-500">
        Báo giá chính thức sẽ được Tường Phú Group gửi qua email trong vòng 24h sau khi
        nhận yêu cầu.
      </p>
    </aside>
  );
}
