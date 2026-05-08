import * as React from "react";
import { cn } from "@/lib/cn";
import { Eyebrow } from "./Eyebrow";

type Props = {
  eyebrow?: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  align?: "left" | "center";
  as?: "h1" | "h2" | "h3";
  className?: string;
};

export function SectionTitle({
  eyebrow,
  title,
  lead,
  align = "left",
  as: Tag = "h2",
  className,
}: Props) {
  return (
    <div
      className={cn(
        "flex max-w-3xl flex-col gap-4",
        align === "center" && "mx-auto items-center text-center",
        className,
      )}
    >
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <Tag
        className={cn(
          "font-display font-medium text-ink-900",
          Tag === "h1" && "text-4xl leading-[1.05] sm:text-5xl lg:text-6xl",
          Tag === "h2" && "text-balance text-3xl leading-[1.1] sm:text-4xl lg:text-5xl",
          Tag === "h3" && "text-2xl leading-[1.15] sm:text-3xl",
        )}
      >
        {title}
      </Tag>
      {lead ? (
        <p className="max-w-2xl text-pretty text-base leading-relaxed text-ink-500 sm:text-lg">
          {lead}
        </p>
      ) : null}
    </div>
  );
}
