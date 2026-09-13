"use client";

import * as React from "react";
import Link from "next/link";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/cn";
import { useUIStore } from "@/lib/store/useUIStore";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import type { NavItem } from "@/types";

type MobileMenuProps = {
  brandName: string;
  navItems: NavItem[];
};

/**
 * Mobile + tablet drawer ( < lg ).
 *
 * Visibility wired through `useUIStore` so the burger button (HeaderActions)
 * and other triggers don't need to know each other. Radix handles focus trap,
 * scroll lock, ESC and ARIA — we only style + animate.
 */
export function MobileMenu({ brandName, navItems }: MobileMenuProps) {
  const open = useUIStore((s) => s.isMobileMenuOpen);
  const close = useUIStore((s) => s.closeMobileMenu);

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(next) => {
        if (!next) close();
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay
          className={cn(
            "fixed inset-0 z-40 bg-ink-900/40 backdrop-blur-sm lg:hidden",
            "data-[state=open]:animate-[fade-in_200ms_ease-out]",
            "data-[state=closed]:animate-[fade-out_180ms_ease-out]",
          )}
        />
        <Dialog.Content
          id="mobile-menu"
          aria-describedby={undefined}
          className={cn(
            "fixed inset-y-0 right-0 z-100 flex h-dvh w-full max-w-md flex-col",
            "bg-cream-50 shadow-2xl outline-none lg:hidden",
            "data-[state=open]:animate-[slide-in-right_320ms_var(--ease-soft)]",
            "data-[state=closed]:animate-[slide-out-right_240ms_var(--ease-soft)]",
          )}
        >
          <Dialog.Title className="sr-only">Menu di động</Dialog.Title>

          <div className="flex h-[90px] shrink-0 items-center justify-between border-b border-line-100 px-5">
            <Logo brandName={brandName} />
            <Dialog.Close
              aria-label="Đóng menu"
              className={cn(
                "grid h-10 w-10 place-items-center rounded-full text-ink-900",
                "transition-colors duration-200 hover:bg-cream-100",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-moss-700/40",
              )}
            >
              <X className="h-5 w-5" strokeWidth={1.6} />
            </Dialog.Close>
          </div>

          <nav
            aria-label="Điều hướng di động"
            className="flex-1 overflow-y-auto px-5 py-4"
          >
            <div className="flex flex-col">
              {navItems.map((item) => (
                <MobileMenuLink key={item.href} item={item} onNavigate={close} />
              ))}
            </div>
          </nav>

          <div className="border-t border-line-100 p-5">
            <Button variant="primary" size="md" className="w-full">
              Yêu cầu báo giá
            </Button>
            <p className="mt-3 text-center text-xs text-ink-500">
              Hotline 0398829946 — phản hồi báo giá trong 24h
            </p>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

/* ---------------------------------- parts --------------------------------- */

type MobileMenuItemProps = {
  item: NavItem;
  onNavigate: () => void;
};

function MobileMenuLink({ item, onNavigate }: MobileMenuItemProps) {
  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    onNavigate();

    const hashIndex = item.href.indexOf("#");
    if (hashIndex === -1) return;

    if (window.location.pathname !== "/") return;

    const targetId = item.href.slice(hashIndex + 1);
    if (!targetId) return;

    const target = document.getElementById(targetId);
    if (!target) return;

    event.preventDefault();
    history.replaceState(null, "", `#${targetId}`);
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <Link
      href={item.href}
      onClick={handleClick}
      className={cn(
        "border-b border-line-100/70 py-4 text-base font-medium",
        "text-ink-900 transition-colors hover:text-moss-700",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-moss-700/40",
      )}
    >
      {item.label}
    </Link>
  );
}
