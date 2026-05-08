"use client";

import * as React from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useReducedMotion } from "motion/react";
import { cn } from "@/lib/cn";
import { useLowEndDevice } from "@/lib/useLowEndDevice";
import { Container } from "@/components/ui/Container";
import type { CampaignSlide } from "@/types";
import { HeroSlide } from "./HeroSlide";
import { HeroPagination } from "./HeroPagination";

type HeroCarouselProps = {
  slides: CampaignSlide[];
  className?: string;
};

const AUTOPLAY_DELAY_MS = 6500;

/**
 * Hero campaign carousel.
 *
 * Behaviour:
 *  - Embla handles touch/drag, snap, loop. We pin slides to 100% width.
 *  - Autoplay plugin (delay {@link AUTOPLAY_DELAY_MS}) — pauses on hover or
 *    keyboard focus so users can read without the carousel sliding away.
 *  - Keyboard: ←/→ on the section move between slides.
 *  - Reduced motion: autoplay is suppressed and Embla snap duration is reduced
 *    to a single-frame value, effectively jumping rather than animating.
 *  - Per-slide reveal animation lives in {@link HeroSlide} keyed on `isActive`.
 */
export function HeroCarousel({ slides, className }: HeroCarouselProps) {
  const reduce = useReducedMotion();
  const lowEnd = useLowEndDevice();

  // Plugin instance kept in lazy state so the same Autoplay is reused across
  // renders. (A ref would also work but ESLint forbids reading .current during
  // render — state read is fine.)
  const [autoplay] = React.useState(() =>
    Autoplay({
      delay: AUTOPLAY_DELAY_MS,
      stopOnMouseEnter: true,
      stopOnFocusIn: true,
      stopOnInteraction: false,
      playOnInit: true,
    }),
  );

  const plugins = React.useMemo(
    () => (reduce || lowEnd ? [] : [autoplay]),
    [reduce, lowEnd, autoplay],
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      containScroll: false,
      skipSnaps: false,
      duration: reduce || lowEnd ? 1 : 38,
    },
    plugins,
  );

  const [selected, setSelected] = React.useState(0);
  const [autoplayActive, setAutoplayActive] = React.useState(false);
  const [progressTick, setProgressTick] = React.useState(0);

  const scrollTo = React.useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi],
  );
  const scrollPrev = React.useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = React.useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  // Sync selected index + bump progress tick on every snap so the active
  // pagination dot can restart its CSS progress animation.
  React.useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => {
      setSelected(emblaApi.selectedScrollSnap());
      setProgressTick((tick) => tick + 1);
    };
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi]);

  // Reflect the autoplay plugin's running state so the progress fill freezes
  // when the user hovers / focuses the carousel. When `reduce` is true we
  // don't load the plugin → no subscription → state stays `false`.
  React.useEffect(() => {
    if (!emblaApi || reduce || lowEnd) return;
    const autoplayPlugin = emblaApi.plugins().autoplay;
    if (!autoplayPlugin) return;
    const sync = () => setAutoplayActive(autoplayPlugin.isPlaying());
    emblaApi.on("autoplay:play", sync);
    emblaApi.on("autoplay:stop", sync);
    sync();
    return () => {
      emblaApi.off("autoplay:play", sync);
      emblaApi.off("autoplay:stop", sync);
    };
  }, [emblaApi, reduce, lowEnd]);

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Vị trí OOH nổi bật của Tường Phú Group"
      className={cn("relative isolate", className)}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") {
          e.preventDefault();
          scrollPrev();
        } else if (e.key === "ArrowRight") {
          e.preventDefault();
          scrollNext();
        }
      }}
    >
      {/* Embla viewport. We crop the row of slides via `overflow-hidden`. */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div
          // Live region so screen readers announce the active slide title.
          aria-live="polite"
          aria-atomic="false"
          className="flex"
        >
          {slides.map((slide, i) => (
            <div
              key={slide.id}
              className="min-w-0 flex-[0_0_100%]"
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} trên ${slides.length}: ${slide.title}`}
            >
              <HeroSlide
                slide={slide}
                isActive={i === selected}
                preload={i === 0}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Pagination + arrows pinned to the bottom of the hero. */}
      <Container
        size="wide"
        className={cn(
          "pointer-events-none absolute inset-x-0 bottom-6 z-10 sm:bottom-10",
        )}
      >
        <div className="pointer-events-auto">
          <HeroPagination
            count={slides.length}
            selected={selected}
            onSelect={scrollTo}
            onPrev={scrollPrev}
            onNext={scrollNext}
            progressDurationMs={autoplayActive ? AUTOPLAY_DELAY_MS : null}
            progressTick={progressTick}
          />
        </div>
      </Container>
    </section>
  );
}
