"use client";

import { Menu } from "lucide-react";
import { cn } from "@/lib/cn";
import { useUIStore } from "@/lib/store/useUIStore";

export function HeaderActions() {
  const open = useUIStore((s) => s.isMobileMenuOpen);
  const toggleMobileMenu = useUIStore((s) => s.toggleMobileMenu);

  return (
    <button
      type="button"
      aria-label="Mở menu"
      aria-expanded={open}
      aria-controls="mobile-menu"
      onClick={toggleMobileMenu}
      className={cn(
        "inline-flex h-11 w-11 items-center justify-center rounded-full text-ink-900",
        "transition-colors duration-200 hover:bg-cream-100",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-moss-700/40",
        "lg:hidden",
      )}
    >
      <Menu className="h-5 w-5" strokeWidth={1.6} />
    </button>
  );
}
