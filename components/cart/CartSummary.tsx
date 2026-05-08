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
      <h2 className="font-display text-2xl text-ink-900">Tong quan don hang</h2>
      <dl className="space-y-2 text-sm text-ink-700">
        <div className="flex items-center justify-between">
          <dt>Tam tinh ({itemCount})</dt>
          <dd>{currencyFormatter.format(pricing.subtotal)}</dd>
        </div>
        <div className="flex items-center justify-between">
          <dt>Phi van chuyen</dt>
          <dd>{pricing.shippingFee === 0 ? "Mien phi" : currencyFormatter.format(pricing.shippingFee)}</dd>
        </div>
        <div className="h-px bg-line-200" />
        <div className="flex items-center justify-between text-base font-semibold text-ink-900">
          <dt>Tong cong</dt>
          <dd>{currencyFormatter.format(pricing.total)}</dd>
        </div>
      </dl>

      <Link
        href={checkoutHref}
        className={cn(buttonStyles({ variant: "primary", size: "lg" }), "w-full", compact && "h-11")}
      >
        Tien hanh thanh toan
      </Link>
    </aside>
  );
}
