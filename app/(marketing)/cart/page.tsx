import type { Metadata } from "next";
import { CartPageClient } from "@/components/cart/CartPageClient";

export const metadata: Metadata = {
  title: "Giỏ vị trí",
  description:
    "Xem lại các vị trí OOH bạn đang quan tâm trước khi gửi yêu cầu báo giá tới Tường Phú Group.",
  alternates: {
    canonical: "/cart",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function CartPage() {
  return <CartPageClient />;
}
