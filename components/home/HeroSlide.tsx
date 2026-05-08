"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";
import { easeSoft } from "@/lib/motion";
import { useLowEndDevice } from "@/lib/useLowEndDevice";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { buttonStyles } from "@/components/ui/Button";
import type { CampaignSlide } from "@/types";

type HeroSlideProps = {
  slide: CampaignSlide;
  isActive: boolean;
  /** First slide should preload its image for LCP. */
  preload?: boolean;
};

/* -------------------------------------------------------------------------- */
/* Variants                                                                    */
/* -------------------------------------------------------------------------- */

const textWrapper: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.18,
    },
  },
};

const textWrapperReduced: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0, delayChildren: 0 },
  },
};

const textChild: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: easeSoft },
  },
};

const textChildReduced: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.35, ease: easeSoft },
  },
};

const sceneVariants: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.9, ease: easeSoft, delay: 0.05 },
  },
};

const sceneVariantsReduced: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.45, ease: easeSoft },
  },
};

/* -------------------------------------------------------------------------- */
/* Component                                                                   */
/* -------------------------------------------------------------------------- */

export function HeroSlide({ slide, isActive, preload = false }: HeroSlideProps) {
  const reduce = useReducedMotion();
  const lowEnd = useLowEndDevice();
  const safeWrapper = reduce ? textWrapperReduced : textWrapper;
  const safeText = reduce ? textChildReduced : textChild;
  const safeScene = reduce || lowEnd ? sceneVariantsReduced : sceneVariants;

  return (
    <article
      aria-roledescription="slide"
      aria-label={slide.title}
      aria-hidden={!isActive}
      className={cn("relative isolate overflow-hidden", slide.backgroundClass)}
    >
      {/* Decorative accent — soft blob behind the product scene. */}
      {slide.accentClass ? (
        <div
          aria-hidden
          className={cn(
            "pointer-events-none absolute -right-20 top-1/3 hidden h-[34rem] w-[34rem] rounded-full blur-3xl md:block",
            slide.accentClass,
          )}
        />
      ) : null}

      <Container
        size="wide"
        className={cn(
          "relative grid items-center gap-10 py-16 sm:py-20 lg:py-28",
          "md:grid-cols-[5fr_7fr] md:gap-12 lg:gap-16",
        )}
      >
        {/* -------- Text column -------- */}
        <motion.div
          initial="hidden"
          animate={isActive ? "visible" : "hidden"}
          variants={safeWrapper}
          className="relative z-10 flex flex-col gap-5 text-ink-900 md:gap-6"
        >
          <motion.div variants={safeText}>
            <Eyebrow tone="ink">{slide.eyebrow}</Eyebrow>
          </motion.div>

          <motion.h2
            variants={safeText}
            className={cn(
              "font-display font-medium leading-[1.05] tracking-tight",
              "text-balance text-4xl sm:text-5xl lg:text-6xl",
            )}
          >
            {slide.title}
          </motion.h2>

          <motion.p
            variants={safeText}
            className="max-w-xl text-pretty text-base leading-relaxed text-ink-700 sm:text-lg"
          >
            {slide.description}
          </motion.p>

          <motion.div variants={safeText} className="mt-2 flex flex-wrap items-center gap-4">
            <Link
              href={slide.ctaHref}
              // Inactive slides shouldn't be tabbable — Embla still keeps them
              // mounted so keyboard users could otherwise reach a hidden CTA.
              tabIndex={isActive ? 0 : -1}
              aria-label={`${slide.ctaLabel}: ${slide.title}`}
              className={cn(buttonStyles({ variant: "primary", size: "lg" }), "group/cta")}
            >
              {slide.ctaLabel}
              <ArrowRight
                aria-hidden
                strokeWidth={1.6}
                className="h-4 w-4 transition-transform duration-300 group-hover/cta:translate-x-0.5"
              />
            </Link>
          </motion.div>
        </motion.div>

        {/* -------- Image / scene column -------- */}
        <motion.div
          initial="hidden"
          animate={isActive ? "visible" : "hidden"}
          variants={safeScene}
          className="relative aspect-[4/5] w-full overflow-hidden rounded-card sm:aspect-[5/6] md:aspect-[4/5] lg:aspect-square"
        >
          <Image
            src={slide.image.src}
            alt={slide.image.alt}
            fill
            preload={preload}
            fetchPriority={preload ? "high" : undefined}
            sizes="(min-width: 1024px) 50vw, (min-width: 768px) 55vw, 100vw"
            className={cn(
              "object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
              isActive ? "scale-100" : "scale-[1.04]",
              lowEnd && "transition-none scale-100",
            )}
          />
          {/* Subtle vignette for legibility on top-aligned text overlays. */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-ink-900/15 via-transparent to-transparent"
          />
        </motion.div>
      </Container>
    </article>
  );
}

