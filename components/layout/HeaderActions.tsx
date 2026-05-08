"use client";

import { Heart, Menu, Search, ShoppingBag, User } from "lucide-react";
import { useCartCount, useCartStore } from "@/lib/store/useCartStore";
import { useUIStore } from "@/lib/store/useUIStore";
import { cn } from "@/lib/cn";

type Props = {
  className?: string;
};

const iconButton =
  "flex h-10 w-10 items-center justify-center rounded-full text-ink-900 transition-colors duration-200 hover:bg-cream-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-moss-700/40";

export function HeaderActions({ className }: Props) {
  const openSearch = useUIStore((s) => s.openSearch);
  const toggleMobileMenu = useUIStore((s) => s.toggleMobileMenu);
  const openCart = useCartStore((s) => s.openCart);
  const cartCount = useCartCount();

  return (
    <div className={cn("flex items-center gap-1 sm:gap-2", className)}>
      <button
        type="button"
        aria-label="Tìm kiếm"
        className={iconButton}
        onClick={openSearch}
      >
        <Search className="h-5 w-5" strokeWidth={1.6} />
      </button>
      <button
        type="button"
        aria-label="Tài khoản khách hàng"
        className={cn(iconButton, "hidden sm:inline-flex")}
      >
        <User className="h-5 w-5" strokeWidth={1.6} />
      </button>
      <button
        type="button"
        aria-label="Vị trí đã lưu"
        className={cn(iconButton, "hidden sm:inline-flex")}
      >
        <Heart className="h-5 w-5" strokeWidth={1.6} />
      </button>
      <button
        type="button"
        aria-label={`Mở giỏ vị trí đang quan tâm, ${cartCount} mục`}
        className={cn(iconButton, "relative")}
        onClick={openCart}
      >
        <ShoppingBag className="h-5 w-5" strokeWidth={1.6} />
        <span
          aria-hidden
          className="absolute -right-0.5 -top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-clay-500 px-1 text-[10px] font-semibold text-cream-50"
        >
          {cartCount}
        </span>
      </button>
      <button
        type="button"
        aria-label="Mở menu di động"
        className={cn(iconButton, "lg:hidden")}
        onClick={toggleMobileMenu}
      >
        <Menu className="h-5 w-5" strokeWidth={1.6} />
      </button>
    </div>
  );
}
