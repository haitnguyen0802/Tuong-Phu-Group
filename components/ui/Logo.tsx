import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { brand } from "@/data/brand";

type Props = {
  className?: string;
  /** Use a darker fill for light backgrounds, lighter fill for hero overlays. */
  tone?: "default" | "light";
};

/**
 * Logotype lockup — display-serif wordmark with a small mark.
 * Custom logomark for Tường Phú Group; no third-party trademarks reused.
 */
export function Logo({ className, tone = "default" }: Props) {
  const colorClass = tone === "light" ? "text-cream-50" : "text-moss-800";
  return (
    <Link
      href="/"
      aria-label={`${brand.name} — về trang chủ`}
      className={cn("group inline-flex items-center gap-2.5", colorClass, className)}
    >
      <LogoMark className="h-8 w-8" />
      <span className="font-display text-2xl tracking-tight">
        {brand.name}
      </span>
    </Link>
  );
}

function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      aria-hidden
      className={cn("transition-transform duration-500 group-hover:rotate-[12deg]", className)}
    >
      <circle cx="20" cy="20" r="19" stroke="currentColor" strokeWidth="1.25" />
      <path
        d="M11 24c5-1 7.5-4 9-9 1.5 5 4 8 9 9-5 1-7.5 4-9 9-1.5-5-4-8-9-9z"
        fill="currentColor"
        opacity="0.85"
      />
    </svg>
  );
}
