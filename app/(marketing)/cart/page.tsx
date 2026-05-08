import type { Metadata } from "next";
import { CartPageClient } from "@/components/cart/CartPageClient";

export const metadata: Metadata = {
  title: "Cart",
  description: "Xem lai cac san pham da chon truoc khi thanh toan.",
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
