import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { buttonStyles } from "@/components/ui/Button";
import { ProductCard } from "@/components/home/ProductCard";
import type { Product, SectionHeading } from "@/types";

type BestSellerProductGridProps = {
  products: Product[];
  heading?: SectionHeading;
};

export function BestSellerProductGrid({ products, heading }: BestSellerProductGridProps) {
  return (
    <section
      id="featured"
      aria-label="Các hạng mục OOH"
      className="pt-8 pb-24 sm:pb-28 lg:pt-12"
    >
      <Container size="wide" className="space-y-10">
        <SectionTitle heading={heading} />

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="flex justify-center">
          <a
            href="#newsletter"
            className={buttonStyles({ variant: "outline", size: "lg" })}
            aria-label="Nhận tư vấn thông tin chi tiết về các sản phẩm"
          >
            Nhận tư vấn thông tin chi tiết về các sản phẩm
          </a>
        </div>
      </Container>
    </section>
  );
}
