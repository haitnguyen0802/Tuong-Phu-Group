import type { Product } from "@/types";
import { ProductCard } from "./ProductCard";

type ProductGridProps = {
  items: Product[];
};

export function ProductGrid({ items }: ProductGridProps) {
  if (!items.length) {
    return (
      <div className="rounded-3xl border border-line-100 bg-cream-50 p-8 text-center text-ink-600">
        Không tìm thấy vị trí OOH phù hợp với bộ lọc hiện tại.
      </div>
    );
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {items.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
