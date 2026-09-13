import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";

type Props = {
  className?: string;
  /** Use a higher-contrast treatment for dark backgrounds. */
  tone?: "default" | "light";
  brandName: string;
};

/**
 * Logotype lockup — sourced from the brand PNG asset in /public.
 */
export function Logo({ className, tone = "default", brandName }: Props) {
  const displayName = brandName;

  return (
    <Link
      href="/"
      aria-label={`${displayName} — về trang chủ`}
      className={cn("inline-flex items-center", className)}
    >
      <span
        className={cn(
          "relative h-[90px] w-[90px]",
          tone === "light" && "drop-shadow-[0_2px_6px_rgba(0,0,0,0.35)]",
        )}
      >
        <Image
          src="/images/01_Logo/logo_png.png"
          alt={displayName}
          fill
          sizes="90px"
          className="object-contain"
          priority
        />
      </span>
      <span className="sr-only">{displayName}</span>
    </Link>
  );
}
