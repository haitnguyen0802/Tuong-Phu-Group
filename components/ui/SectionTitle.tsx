import * as React from "react";
import { cn } from "@/lib/cn";
import type { SectionHeading } from "@/types";
import { Eyebrow } from "./Eyebrow";

type Props = {
  heading?: SectionHeading;
  eyebrow?: string;
  title?: React.ReactNode;
  lead?: React.ReactNode;
  align?: "left" | "center";
  as?: "h1" | "h2" | "h3";
  className?: string;
};

export function SectionTitle({
  heading,
  eyebrow: eyebrowProp,
  title: titleProp,
  lead: leadProp,
  align: alignProp = "left",
  as: Tag = "h2",
  className,
}: Props) {
  if (heading === undefined && titleProp === undefined) {
    return null;
  }

  const eyebrow = heading?.eyebrow ?? eyebrowProp;
  const title = heading?.title ?? titleProp;
  const lead = heading?.lead ?? leadProp;
  const align = heading?.align ?? alignProp;

  if (!title) {
    return null;
  }
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
