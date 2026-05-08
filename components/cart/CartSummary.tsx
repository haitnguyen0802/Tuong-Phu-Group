import Link from "next/link";
import { buttonStyles } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { currencyFormatter } from "@/lib/utils/price";
import type { OrderPricing } from "@/types";

type CartSummaryProps = {
  pricing: OrderPricing;
  itemCount: number;
  checkoutHref?: string;
  compact?: boolean;
};

export function CartSummary({
  pricing,
  itemCount,
  checkoutHref = "/checkout",
  compact = false,
}: CartSummaryProps) {
  return (
    <aside className="space-y-4 rounded-3xl border border-line-100 bg-cream-50 p-5 sm:p-6">
      <h2 className="font-display text-2xl text-ink-900">Tóm tắt báo giá</h2>
      <dl className="space-y-2 text-sm text-ink-700">
        <div className="flex items-center justify-between">
          <dt>Tổng tạm tính ({itemCount} vị trí)</dt>
          <dd>{currencyFormatter.format(pricing.subtotal)}</dd>
        </div>
        <div className="flex items-center justify-between">
          <dt>Phí khảo sát & lắp đặt</dt>
          <dd>
            {pricing.shippingFee === 0
              ? "Miễn phí"
              : currencyFormatter.format(pricing.shippingFee)}
          </dd>
        </div>
        <div className="h-px bg-line-200" />
        <div className="flex items-center justify-between text-base font-semibold text-ink-900">
          <dt>Tổng dự kiến / tháng</dt>
          <dd>{currencyFormatter.format(pricing.total)}</dd>
        </div>
      </dl>

      <p className="text-xs text-ink-500">
        Báo giá cuối cùng phụ thuộc vào thời lượng campaign, thiết kế và hiện trạng vị trí.
      </p>

      <Link
        href={checkoutHref}
        className={cn(
          buttonStyles({ variant: "primary", size: "lg" }),
          "w-full",
          compact && "h-11",
        )}
      >
        Gửi yêu cầu báo giá
      </Link>
    </aside>
  );
}
