import Image from "next/image";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { ingredients } from "@/data/ingredients";
import { cn } from "@/lib/cn";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { FadeIn } from "@/components/animation/FadeIn";
import { buttonStyles } from "@/components/ui/Button";
import type { Ingredient } from "@/types";

const COMMITMENTS = [
  "100% thuan chay va khong thu nghiem tren dong vat.",
  "Nguyen lieu Viet co truy xuat ro, uu tien vung canh tac ben vung.",
  "Cong thuc toi gian, minh bach va ton trong lan da nhay cam.",
] as const;

type BrandPhilosophyProps = {
  ingredientItems?: Ingredient[];
};

export function BrandPhilosophy({ ingredientItems = ingredients }: BrandPhilosophyProps) {
  const lotus =
    ingredientItems.find((item) => item.id === "lotus") ?? ingredientItems[0];

  return (
    <section aria-label="Triet ly thuong hieu Verdara" className="pb-24 pt-10 sm:pb-28 lg:pt-14">
      <Container size="wide">
        <div className="grid gap-10 rounded-[2rem] border border-line-100 bg-cream-50/80 p-6 shadow-[0_24px_56px_-36px_rgba(31,36,34,0.25)] sm:p-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-14 lg:p-12">
          <FadeIn className="space-y-7" y={20}>
            <SectionTitle
              as="h2"
              eyebrow="Brand philosophy"
              title={
                <>
                  Cham da bang tinh than
                  <span className="block text-moss-700">trung thuc va ben vung.</span>
                </>
              }
              lead="Verdara tin rang lan da khoe den tu su nhat quan: nguyen lieu tot, cong thuc ro rang, va cam ket lau dai voi cong dong ban dia noi chung toi lay cam hung."
            />

            <ul className="space-y-3">
              {COMMITMENTS.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-ink-700 sm:text-base">
                  <CheckCircle2
                    className="mt-0.5 h-5 w-5 shrink-0 text-moss-700"
                    strokeWidth={1.8}
                    aria-hidden
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-3">
              <Link href="/story" className={buttonStyles({ variant: "primary", size: "lg" })}>
                Xem cau chuyen thuong hieu
              </Link>
              <Link
                href="/certifications"
                className={buttonStyles({ variant: "outline", size: "lg" })}
              >
                Cam ket va chung nhan
              </Link>
            </div>
          </FadeIn>

          <FadeIn className="relative" delay={0.08} y={24}>
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.6rem] border border-line-100 sm:aspect-[5/6] lg:aspect-[4/5]">
              <Image
                src={lotus.image.src}
                alt={lotus.image.alt}
                fill
                sizes="(min-width: 1024px) 40vw, (min-width: 768px) 70vw, 100vw"
                className="object-cover"
              />
              <div
                aria-hidden
                className={cn(
                  "pointer-events-none absolute inset-0 bg-gradient-to-t",
                  "from-ink-900/35 via-transparent to-transparent",
                )}
              />
            </div>
            <div className="absolute bottom-4 left-4 right-4 rounded-2xl border border-white/35 bg-white/80 p-4 backdrop-blur">
              <p className="eyebrow text-moss-700">{lotus.name}</p>
              <p className="mt-1 text-sm leading-relaxed text-ink-700">{lotus.region}</p>
            </div>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
