import Image from "next/image";
import { ArrowRight, MapPin } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { FadeIn } from "@/components/animation/FadeIn";
import { buttonStyles } from "@/components/ui/Button";
import type { FormatsCatalog, Ingredient, SectionHeading } from "@/types";

type IngredientStorySectionProps = {
  items: Ingredient[];
  heading?: SectionHeading;
  formatsCatalog?: FormatsCatalog | null;
};

export function IngredientStorySection({
  items,
  heading,
  formatsCatalog,
}: IngredientStorySectionProps) {
  const displayFormats = items.slice(0, 5);

  return (
    <section
      id="formats"
      aria-label="Các dự án đã triển khai"
      className="py-24 sm:py-28"
    >
      <Container size="wide" className="space-y-10">
        <FadeIn y={20}>
          <SectionTitle heading={heading} />
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

          {formatsCatalog ? (
            <FadeIn
              delay={displayFormats.length * 0.06}
              y={18}
              className="group relative overflow-hidden rounded-[1.6rem] border border-white/60 bg-[radial-gradient(140%_95%_at_15%_10%,rgba(255,255,255,0.95)_0%,rgba(235,223,198,0.75)_40%,rgba(196,106,79,0.35)_100%)] shadow-[0_26px_70px_-40px_rgba(47,74,60,0.65)]"
            >
              <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.28)_0%,rgba(255,255,255,0.08)_40%,rgba(255,255,255,0.35)_100%)]" />
              <div
                aria-hidden
                className="pointer-events-none absolute -left-12 top-10 h-32 w-32 rounded-full bg-moss-200/70 blur-2xl"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute -right-8 bottom-8 h-36 w-36 rounded-full bg-clay-300/70 blur-2xl"
              />

              <div className="relative z-10 grid h-full grid-rows-[auto_1fr] gap-5 p-5">
                <div className="flex items-center justify-between gap-4">
                  <p className="text-ink-800 text-xs font-semibold tracking-[0.2em] uppercase">
                    {formatsCatalog.eyebrow}
                  </p>
                  <span className="text-ink-600 rounded-full border border-white/70 bg-white/60 px-3 py-1 text-[11px] font-semibold tracking-[0.12em] uppercase">
                    {formatsCatalog.badge}
                  </span>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-white/70 bg-white/75 p-4">
                    <h3 className="text-ink-900 text-lg font-semibold">
                      {formatsCatalog.feature.title}
                    </h3>
                    <p className="text-ink-700 mt-2 text-sm leading-relaxed">
                      {formatsCatalog.feature.description}
                    </p>
                  </div>

                  <div className="grid gap-3">
                    {formatsCatalog.highlights.map((highlight) => (
                      <div
                        key={highlight.title}
                        className="rounded-2xl border border-white/70 bg-white/70 p-4"
                      >
                        <p className="text-ink-800 text-sm font-semibold">{highlight.title}</p>
                        <p className="text-ink-700 mt-1 text-xs">{highlight.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <a
                  href={formatsCatalog.cta.href}
                  className="inline-flex w-fit items-center gap-2 rounded-full border border-moss-700/35 bg-white/80 px-4 py-2 text-sm font-semibold text-moss-800 transition-all duration-200 hover:-translate-y-[1px] hover:border-moss-700/60 hover:bg-white"
                  aria-label={formatsCatalog.cta.ariaLabel}
                >
                  {formatsCatalog.cta.label}
                  <ArrowRight className="h-4 w-4" aria-hidden strokeWidth={1.8} />
                </a>
              </div>
            </FadeIn>
          ) : null}
        </div>

        <div className="flex justify-center">
          <a
            href="#newsletter"
            className={buttonStyles({ variant: "outline", size: "lg" })}
            aria-label="Tư vấn tất cả các hạng mục OOH"
          >
            Tư vấn các hạng mục OOH
          </a>
        </div>
      </Container>
    </section>
  );
}
