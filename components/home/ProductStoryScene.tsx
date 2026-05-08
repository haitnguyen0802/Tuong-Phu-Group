"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Leaf, Sparkles, ShieldCheck } from "lucide-react";
import { useReducedMotion } from "motion/react";
import { ingredients } from "@/data/ingredients";
import { bestSellers } from "@/data/products";
import { cn } from "@/lib/cn";
import { ensureGsap } from "@/lib/gsap";
import { useLowEndDevice } from "@/lib/useLowEndDevice";
import { buttonStyles } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/animation/FadeIn";
import type { Ingredient, Product } from "@/types";

const STORY_POINTS = [
  {
    icon: Leaf,
    label: "Thu hoach som",
    text: "Sen duoc chon trong khung gio mat nhat de giu huong va hoat chat tu nhien.",
  },
  {
    icon: Sparkles,
    label: "Chiet xuat nhanh 6 gio",
    text: "Rut ngan thoi gian xu ly de giu polyphenol giup lam diu va ho tro phuc hoi da.",
  },
  {
    icon: ShieldCheck,
    label: "Cong thuc toi gian",
    text: "Giam thanh phan du thua, tap trung hieu qua va do an toan cho da nhay cam.",
  },
] as const;

type ProductStorySceneProps = {
  ingredientItems?: Ingredient[];
  productItems?: Product[];
};

export function ProductStoryScene({
  ingredientItems = ingredients,
  productItems = bestSellers,
}: ProductStorySceneProps) {
  const reduce = useReducedMotion();
  const lowEnd = useLowEndDevice();

  const sceneRef = React.useRef<HTMLElement | null>(null);
  const bgLayerRef = React.useRef<HTMLDivElement | null>(null);
  const ingredientLayerRef = React.useRef<HTMLDivElement | null>(null);
  const productLayerRef = React.useRef<HTMLDivElement | null>(null);
  const textLayerRef = React.useRef<HTMLDivElement | null>(null);

  const lotus =
    ingredientItems.find((item) => item.id === "lotus") ?? ingredientItems[0];
  const lotusProduct =
    productItems.find((item) => item.slug === "lotus-mist") ?? productItems[0];

  React.useEffect(() => {
    if (reduce || lowEnd) return;
    if (!sceneRef.current) return;

    const { gsap } = ensureGsap();
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const ctx = gsap.context(() => {
        const timeline = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: sceneRef.current,
            start: "top 80%",
            end: "bottom top",
            scrub: true,
          },
        });

        if (bgLayerRef.current) {
          timeline.fromTo(bgLayerRef.current, { yPercent: -6 }, { yPercent: 5 }, 0);
        }

        if (ingredientLayerRef.current) {
          timeline.fromTo(
            ingredientLayerRef.current,
            { yPercent: -10, rotation: -2 },
            { yPercent: 10, rotation: 2 },
            0,
          );
        }

        if (productLayerRef.current) {
          timeline.fromTo(
            productLayerRef.current,
            { yPercent: -7, scale: 0.96 },
            { yPercent: 9, scale: 1.03 },
            0,
          );
        }

        if (textLayerRef.current) {
          timeline.fromTo(
            textLayerRef.current,
            { yPercent: 6, opacity: 0.82 },
            { yPercent: -4, opacity: 1 },
            0,
          );
        }
      }, sceneRef);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, [reduce, lowEnd]);

  return (
    <section
      ref={sceneRef}
      aria-label="Cau chuyen san pham chu luc"
      className="relative isolate overflow-hidden py-20 sm:py-24 lg:py-28"
    >
      <div
        ref={bgLayerRef}
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0",
          "bg-[radial-gradient(120%_120%_at_20%_10%,rgba(255,255,255,0.88),transparent_45%)]",
        )}
      />

      <Container size="wide" className="relative">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-14">
          <div className="relative overflow-hidden rounded-[2rem] border border-line-100 bg-cream-100/65 p-3 sm:p-4 lg:p-6">
            <div
              ref={ingredientLayerRef}
              aria-hidden
              className="pointer-events-none absolute -left-10 -top-14 h-52 w-52 rounded-full bg-clay-300/40 blur-3xl"
            />
            <div
              ref={productLayerRef}
              className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] border border-cream-50/70"
            >
              <Image
                src={lotusProduct.frontImage.src}
                alt={lotusProduct.frontImage.alt}
                fill
                sizes="(min-width: 1024px) 44vw, (min-width: 768px) 60vw, 100vw"
                className="object-cover"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-ink-900/12 via-transparent to-white/15"
              />
            </div>
            <p className="mt-4 text-sm leading-relaxed text-ink-700 sm:mt-5 sm:text-base">
              {lotus.description}
            </p>
          </div>

          <div ref={textLayerRef} className="space-y-8">
            <FadeIn className="space-y-5" y={20}>
              <p className="eyebrow text-moss-700">Product story scene</p>
              <h2 className="text-balance font-display text-4xl leading-[1.05] text-ink-900 sm:text-5xl lg:text-6xl">
                {lotus.name}
                <span className="block text-clay-500">trong tung lan suong phuc hoi</span>
              </h2>
              <p className="max-w-xl text-pretty text-base leading-relaxed text-ink-600 sm:text-lg">
                Tu vung trong giau phu sa cua {lotus.region}, Verdara phat trien mot hanh trinh cham da
                toi gian: lam diu nhanh, khoa am nhe, va giu cam giac tuoi mat suot ngay.
              </p>
            </FadeIn>

            <div className="grid gap-4 sm:grid-cols-3 sm:gap-3">
              {STORY_POINTS.map((point, index) => {
                const Icon = point.icon;
                return (
                  <FadeIn
                    key={point.label}
                    delay={index * 0.08}
                    className="rounded-2xl border border-line-100 bg-cream-50/75 p-4"
                    y={18}
                  >
                    <Icon className="h-4 w-4 text-moss-700" strokeWidth={1.7} aria-hidden />
                    <p className="mt-2 text-sm font-semibold text-ink-800">{point.label}</p>
                    <p className="mt-1 text-sm leading-relaxed text-ink-600">{point.text}</p>
                  </FadeIn>
                );
              })}
            </div>

            <FadeIn delay={0.18} className="flex flex-wrap items-center gap-3" y={16}>
              <Link
                href={`/products/${lotusProduct.slug}`}
                className={buttonStyles({ variant: "primary", size: "lg" })}
                aria-label={`Kham pha ${lotusProduct.name}`}
              >
                Kham pha {lotusProduct.name}
              </Link>
              <Link
                href="/ingredients/lotus"
                className={buttonStyles({ variant: "outline", size: "lg" })}
                aria-label="Xem hanh trinh nguyen lieu sen Hau Giang"
              >
                Hanh trinh nguyen lieu
              </Link>
            </FadeIn>
          </div>
        </div>
      </Container>
    </section>
  );
}
