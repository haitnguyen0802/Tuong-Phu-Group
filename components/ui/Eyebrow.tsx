import * as React from "react";
import { cn } from "@/lib/cn";

type Props = React.HTMLAttributes<HTMLSpanElement> & {
  tone?: "moss" | "clay" | "ink";
};

export function Eyebrow({ className, tone = "moss", ...rest }: Props) {
  return (
    <span
      className={cn(
        "eyebrow inline-flex items-center gap-2",
        tone === "moss" && "text-moss-700",
        tone === "clay" && "text-clay-500",
        tone === "ink" && "text-ink-700",
        className,
      )}
      {...rest}
    />
  );
}
