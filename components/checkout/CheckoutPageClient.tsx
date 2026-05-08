"use client";

import Link from "next/link";
import { CheckoutForm } from "@/components/checkout/CheckoutForm";
import { OrderReview } from "@/components/checkout/OrderReview";
import { buttonStyles } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { useCartStore } from "@/lib/store/useCartStore";
import { calculateOrderPricing } from "@/lib/utils/price";

export function CheckoutPageClient() {
  const items = useCartStore((state) => state.items);
  const pricing = calculateOrderPricing(items);

  return (
    <section className="py-16 sm:py-20">
      <Container size="wide" className="space-y-8">
        <div className="space-y-2">
          <p className="eyebrow text-moss-700">Yêu cầu báo giá</p>
          <h1 className="font-display text-4xl text-ink-900 sm:text-5xl">
            Gửi yêu cầu báo giá OOH
          </h1>
          <p className="text-sm text-ink-500">
            Điền thông tin doanh nghiệp & campaign — Tường Phú Group sẽ phản hồi báo
            giá chi tiết trong vòng 24h.
          </p>
        </div>

        {items.length === 0 ? (
          <div className="rounded-3xl border border-line-100 bg-cream-50 p-8 text-center">
            <p className="text-base text-ink-700">
              Giỏ vị trí trống. Vui lòng chọn ít nhất một vị trí trước khi gửi yêu cầu báo
              giá.
            </p>
            <Link
              href="/products"
              className={buttonStyles({ variant: "primary", size: "md" })}
            >
              Đến danh mục vị trí OOH
            </Link>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <CheckoutForm />
            <div className="space-y-4 lg:sticky lg:top-24">
              <OrderReview items={items} pricing={pricing} />
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}
