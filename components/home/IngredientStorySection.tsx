import Image from "next/image";
import Link from "next/link";
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
  const displayIngredients = items.slice(0, 5);

  return (
    <section aria-label="Cau chuyen nguon goc nguyen lieu" className="py-24 sm:py-28">
      <Container size="wide" className="space-y-10">
        <FadeIn y={20}>
          <SectionTitle
            align="center"
            eyebrow="Ingredient story"
            title="Hon Viet trong moi cong thuc cham da."
            lead="Moi nguyen lieu duoc lua chon dua tren chat luong canh tac, tinh ben vung va kha nang mang lai hieu qua on dinh tren lan da nhay cam."
          />
        </FadeIn>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {displayIngredients.map((ingredient, index) => (
            <FadeIn
              key={ingredient.id}
              delay={index * 0.06}
              y={18}
              className="group overflow-hidden rounded-[1.6rem] border border-line-100 bg-cream-50"
            >
              <div className="relative aspect-[4/3] overflow-hidden border-b border-line-100">
                <Image
                  src={ingredient.image.src}
                  alt={ingredient.image.alt}
                  fill
                  sizes="(min-width: 1280px) 30vw, (min-width: 768px) 46vw, 100vw"
                  className="object-cover transition-transform duration-500 motion-safe:group-hover:scale-[1.03]"
                />
              </div>

              <div className="space-y-4 p-5">
                <h3 className="text-xl font-semibold text-ink-900">{ingredient.name}</h3>
                <p className="inline-flex items-center gap-2 text-sm text-moss-700">
                  <MapPin className="h-4 w-4" aria-hidden strokeWidth={1.7} />
                  {ingredient.region}
                </p>
                <p className="text-sm leading-relaxed text-ink-600">{ingredient.description}</p>
                <Link
                  href={`/ingredients/${ingredient.id}`}
                  className="inline-flex items-center gap-1 text-sm font-medium text-moss-700 transition-colors hover:text-moss-800"
                  aria-label={`Xem nguyen lieu ${ingredient.name}`}
                >
                  Xem nguyen lieu
                  <ArrowRight className="h-4 w-4" aria-hidden strokeWidth={1.8} />
                </Link>
              </div>
            </FadeIn>
          ))}
        </div>

        <div className="flex justify-center">
          <Link
            href="/ingredients"
            className={buttonStyles({ variant: "outline", size: "lg" })}
            aria-label="Xem tat ca nguyen lieu"
          >
            Xem tat ca nguyen lieu
          </Link>
        </div>
      </Container>
    </section>
  );
}
