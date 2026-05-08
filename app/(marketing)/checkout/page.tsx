import type { Metadata } from "next";
import { CheckoutPageClient } from "@/components/checkout/CheckoutPageClient";

export const metadata: Metadata = {
  title: "Yêu cầu báo giá",
  description:
    "Gửi yêu cầu báo giá OOH tới Tường Phú Group — phản hồi chi tiết trong vòng 24h.",
  alternates: {
    canonical: "/checkout",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function CheckoutPage() {
  return <CheckoutPageClient />;
}
