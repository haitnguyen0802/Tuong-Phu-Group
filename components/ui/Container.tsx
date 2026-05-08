import * as React from "react";
import { cn } from "@/lib/cn";

type ContainerProps = React.HTMLAttributes<HTMLDivElement> & {
  size?: "default" | "wide" | "narrow";
  as?: React.ElementType;
};

/**
 * Centered horizontal container with breakpoint-aware padding.
 * Variants:
 *  - narrow  → 64rem  (article reading width)
 *  - default → 80rem  (general content)
 *  - wide    → 90rem  (full-bleed sections with breathing room)
 */
export function Container({
  className,
  size = "default",
  as: Component = "div",
  ...rest
}: ContainerProps) {
  return (
    <Component
      className={cn(
        "mx-auto w-full px-5 sm:px-8 lg:px-12",
        size === "narrow" && "max-w-4xl",
        size === "default" && "max-w-7xl",
        size === "wide" && "max-w-[90rem]",
        className,
      )}
      {...rest}
    />
  );
}
