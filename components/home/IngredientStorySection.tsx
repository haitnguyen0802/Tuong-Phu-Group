import Image from "next/image";
import { ArrowRight, MapPin } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { FadeIn } from "@/components/animation/FadeIn";
import { buttonStyles } from "@/components/ui/Button";
import { ingredients } from "@/data/ingredients";
import type { Ingredient } from "@/types";

type IngredientStorySectionProps = {
  items?: Ingredient[];
};

export function IngredientStorySection({ items = ingredients }: IngredientStorySectionProps) {
  const displayFormats = items.slice(0, 5);

  return (
    <section aria-label="Loại hình quảng cáo OOH" className="py-24 sm:py-28">
      <Container size="wide" className="space-y-10">
        <FadeIn y={20}>
          <SectionTitle
            align="center"
            eyebrow="Loại hình OOH"
            title="Đa định dạng — phục vụ mọi câu chuyện thương hiệu."
            lead="Mỗi loại hình OOH được Tường Phú Group lựa chọn dựa trên hành vi tiêu dùng, lưu lượng khu vực và mục tiêu campaign — đảm bảo chi phí trên 1.000 lượt nhìn (CPM) tối ưu."
          />
        </FadeIn>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {displayFormats.map((format, index) => (
            <FadeIn
              key={format.id}
              delay={index * 0.06}
              y={18}
              className="group border-line-100 bg-cream-50 overflow-hidden rounded-[1.6rem] border"
            >
              <div className="border-line-100 relative aspect-[4/3] overflow-hidden border-b">
                <Image
                  src={format.image.src}
                  alt={format.image.alt}
                  fill
                  sizes="(min-width: 1280px) 30vw, (min-width: 768px) 46vw, 100vw"
                  className="object-cover transition-transform duration-500 motion-safe:group-hover:scale-[1.03]"
                />
              </div>

              <div className="space-y-4 p-5">
                <h3 className="text-ink-900 text-xl font-semibold">{format.name}</h3>
                <p className="text-moss-700 inline-flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4" aria-hidden strokeWidth={1.7} />
                  {format.region}
                </p>
                <p className="text-ink-600 text-sm leading-relaxed">{format.description}</p>
                <a
                  href="#newsletter"
                  className="text-moss-700 hover:text-moss-800 inline-flex items-center gap-1 text-sm font-medium transition-colors"
                  aria-label={`Tư vấn loại hình ${format.name}`}
                >
                  Tư vấn loại hình
                  <ArrowRight className="h-4 w-4" aria-hidden strokeWidth={1.8} />
                </a>
              </div>
            </FadeIn>
          ))}
        </div>

        <div className="flex justify-center">
          <a
            href="#newsletter"
            className={buttonStyles({ variant: "outline", size: "lg" })}
            aria-label="Tư vấn tất cả loại hình OOH"
          >
            Tư vấn loại hình OOH
          </a>
        </div>
      </Container>
    </section>
  );
}
