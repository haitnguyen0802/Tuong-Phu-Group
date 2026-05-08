import type { ProductBadge } from "@/types";

const LABELS: Record<ProductBadge, string> = {
  bestseller: "Hot",
  new: "Mới",
  "low-stock": "Sắp hết slot",
  limited: "Độc quyền",
};

type ProductBadgesProps = {
  badges: ProductBadge[];
};

export function ProductBadges({ badges }: ProductBadgesProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {badges.map((badge) => (
        <span
          key={badge}
          className="rounded-full border border-line-200 bg-cream-50 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-700"
        >
          {LABELS[badge]}
        </span>
      ))}
    </div>
  );
}
