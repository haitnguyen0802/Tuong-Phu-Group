import { FLAT_SHIPPING_FEE, FREE_SHIPPING_THRESHOLD } from "@/lib/constants/checkout";
import type { CartItem, OrderPricing } from "@/types";

export const currencyFormatter = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
  maximumFractionDigits: 0,
});

export function calculateSubtotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

export function calculateShippingFee(subtotal: number): number {
  if (subtotal <= 0) return 0;
  if (subtotal >= FREE_SHIPPING_THRESHOLD) return 0;
  return FLAT_SHIPPING_FEE;
}

export function calculateOrderPricing(items: CartItem[]): OrderPricing {
  const subtotal = calculateSubtotal(items);
  const shippingFee = calculateShippingFee(subtotal);
  return {
    subtotal,
    shippingFee,
    total: subtotal + shippingFee,
  };
}
