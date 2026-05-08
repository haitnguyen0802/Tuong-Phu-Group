"use client";

import * as Dialog from "@radix-ui/react-dialog";
import Link from "next/link";
import { X } from "lucide-react";
import { CartLineItem } from "@/components/cart/CartLineItem";
import { CartSummary } from "@/components/cart/CartSummary";
import { buttonStyles } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { useCartStore } from "@/lib/store/useCartStore";
import { calculateOrderPricing } from "@/lib/utils/price";

export function CartDrawer() {
  const isOpen = useCartStore((state) => state.isOpen);
  const closeCart = useCartStore((state) => state.closeCart);
  const items = useCartStore((state) => state.items);

  const pricing = calculateOrderPricing(items);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => (open ? undefined : closeCart())}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-ink-900/45 backdrop-blur-sm" />
        <Dialog.Content
          className={cn(
            "fixed right-0 top-0 z-50 h-full w-full max-w-xl overflow-y-auto bg-cream-50 p-5 outline-none sm:p-6",
            "data-[state=open]:animate-[fade-in_160ms_ease-out]",
          )}
        >
          <div className="flex items-center justify-between">
            <Dialog.Title className="font-display text-2xl text-ink-900">Gio hang ({itemCount})</Dialog.Title>
            <Dialog.Close
              className={cn(buttonStyles({ variant: "ghost", size: "sm" }), "h-9 w-9 rounded-full p-0")}
              aria-label="Dong gio hang"
            >
              <X className="h-4 w-4" />
            </Dialog.Close>
          </div>

          {items.length === 0 ? (
            <div className="mt-12 space-y-4 text-center">
              <p className="text-base text-ink-700">Gio hang cua ban dang trong.</p>
              <Link href="/products" className={buttonStyles({ variant: "outline", size: "md" })}>
                Kham pha san pham
              </Link>
            </div>
          ) : (
            <div className="mt-6 space-y-5">
              <div className="space-y-3">
                {items.map((item) => (
                  <CartLineItem key={item.productId} item={item} />
                ))}
              </div>
              <CartSummary pricing={pricing} itemCount={itemCount} compact />
              <Link href="/cart" className={cn(buttonStyles({ variant: "outline", size: "md" }), "w-full")}>
                Xem gio hang day du
              </Link>
            </div>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
