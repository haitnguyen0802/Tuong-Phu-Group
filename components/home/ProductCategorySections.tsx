import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { buttonStyles } from "@/components/ui/Button";
import { FadeIn } from "@/components/animation/FadeIn";
import { ProductCard } from "@/components/home/ProductCard";
import type { Product } from "@/types";

type ProductGroup = {
  id: string;
  eyebrow: string;
  title: string;
  lead: string;
  /** Normalized (lowercase, no diacritics) keywords matched against category, name and slug. */
  keywords: string[];
};

const PRODUCT_GROUPS: ProductGroup[] = [
  {
    id: "ao-polo",
    eyebrow: "Nhóm sản phẩm",
    title: "Áo Polo",
    lead: "Áo thun polo đồng phục cho doanh nghiệp — chất liệu thoáng mát, in/thêu logo theo yêu cầu, số lượng linh hoạt.",
    keywords: ["polo"],
  },
  {
    id: "balo-tui-xach",
    eyebrow: "Nhóm sản phẩm",
    title: "Balo - Túi xách",
    lead: "Balo và túi xách quà tặng, sự kiện — gia công theo thiết kế riêng, đa dạng chất liệu và kích thước.",
    keywords: ["balo", "tui xach", "tui"],
  },
  {
    id: "ao-khoac",
    eyebrow: "Nhóm sản phẩm",
    title: "Áo khoác",
    lead: "Áo khoác đồng phục, áo gió sự kiện — bền đẹp, chống nắng gió, in ấn thương hiệu sắc nét.",
    keywords: ["khoac"],
  },
];

const COMBINING_MARKS_PATTERN = /[\u0300-\u036f]/g;
const D_LETTER_PATTERN = /[đĐ]/g;
const SEPARATOR_PATTERN = /[-_]+/g;

function normalizeText(value: string): string {
  return value
    .normalize("NFD")
    .replace(COMBINING_MARKS_PATTERN, "")
    .replace(D_LETTER_PATTERN, "d")
    .replace(SEPARATOR_PATTERN, " ")
    .toLowerCase();
}

function matchesGroup(product: Product, group: ProductGroup): boolean {
  const haystack = normalizeText(`${product.category} ${product.name} ${product.slug}`);
  return group.keywords.some((keyword) => haystack.includes(keyword));
}

/** Assign each product to the first matching group so it never shows up twice. */
function groupProducts(products: Product[]): Map<string, Product[]> {
  const byGroup = new Map<string, Product[]>(PRODUCT_GROUPS.map((group) => [group.id, []]));

  for (const product of products) {
    const group = PRODUCT_GROUPS.find((candidate) => matchesGroup(product, candidate));
    if (group) {
      byGroup.get(group.id)?.push(product);
    }
  }

  return byGroup;
}

type ProductCategorySectionsProps = {
  products: Product[];
};

export function ProductCategorySections({ products }: ProductCategorySectionsProps) {
  const byGroup = groupProducts(products);

  return (
    <>
      {PRODUCT_GROUPS.map((group) => {
        const groupProductList = byGroup.get(group.id) ?? [];
        if (groupProductList.length === 0) {
          return null;
        }

        return (
          <section
            key={group.id}
            id={group.id}
            aria-label={group.title}
            className="pb-24 sm:pb-28"
          >
            <Container size="wide" className="space-y-10">
              <FadeIn y={20}>
                <SectionTitle
                  eyebrow={group.eyebrow}
                  title={group.title}
                  lead={group.lead}
                  align="center"
                />
              </FadeIn>

              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {groupProductList.map((product, index) => (
                  <FadeIn key={product.id} delay={index * 0.06} y={18}>
                    <ProductCard product={product} />
                  </FadeIn>
                ))}
              </div>

              <div className="flex justify-center">
                <a
                  href="#newsletter"
                  className={buttonStyles({ variant: "outline", size: "lg" })}
                  aria-label={`Nhận tư vấn về ${group.title}`}
                >
                  Nhận tư vấn về {group.title}
                </a>
              </div>
            </Container>
          </section>
        );
      })}
    </>
  );
}
