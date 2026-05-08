"use client";

import * as React from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";

type HeroPaginationProps = {
  count: number;
  selected: number;
  /** Total ms the active dot needs to fill its progress bar. `null` disables progress (autoplay off). */
  progressDurationMs: number | null;
  onSelect: (index: number) => void;
  onPrev: () => void;
  onNext: () => void;
  /** Bumped every time autoplay restarts a snap so the active progress bar restarts its animation. */
  progressTick: number;
};

const arrowButton =
  "grid h-11 w-11 place-items-center rounded-full border border-ink-900/15 text-ink-900 backdrop-blur-sm bg-cream-50/50 transition-all duration-200 hover:border-ink-900/30 hover:bg-cream-50 hover:-translate-y-[1px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-moss-700/40 focus-visible:ring-offset-2 focus-visible:ring-offset-cream-50";

export function HeroPagination({
  count,
  selected,
  progressDurationMs,
  onSelect,
  onPrev,
  onNext,
  progressTick,
}: HeroPaginationProps) {
  return (
    <div
      role="group"
      aria-label="Điều hướng chiến dịch"
      className="flex items-center justify-between gap-6"
    >
      {/* Dot list ----------------------------------------------------------- */}
      <ul className="flex items-center gap-2.5">
        {Array.from({ length: count }, (_, i) => {
          const isActive = i === selected;
          return (
            <li key={i}>
              <button
                type="button"
                aria-label={`Đi tới slide ${i + 1} trên ${count}`}
                aria-current={isActive ? "true" : undefined}
                onClick={() => onSelect(i)}
                className={cn(
                  "group relative flex h-3 items-center overflow-hidden rounded-full transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-moss-700/40 focus-visible:ring-offset-2 focus-visible:ring-offset-cream-50",
                  isActive ? "w-9 bg-ink-900/15" : "w-3 bg-ink-900/25 hover:bg-ink-900/45",
                )}
              >
                {isActive ? (
                  <ProgressFill
                    key={progressTick}
                    durationMs={progressDurationMs}
                  />
                ) : null}
                <span className="sr-only">
                  Slide {i + 1}
                </span>
              </button>
            </li>
          );
        })}
        <li className="ml-3 hidden items-center gap-1 text-xs tabular-nums text-ink-700 sm:flex">
          <span className="font-medium">{String(selected + 1).padStart(2, "0")}</span>
          <span aria-hidden className="text-ink-300">
            /
          </span>
          <span className="text-ink-500">{String(count).padStart(2, "0")}</span>
        </li>
      </ul>

      {/* Prev / Next -------------------------------------------------------- */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          aria-label="Slide trước"
          onClick={onPrev}
          className={arrowButton}
        >
          <ArrowLeft className="h-4 w-4" strokeWidth={1.6} aria-hidden />
        </button>
        <button
          type="button"
          aria-label="Slide tiếp theo"
          onClick={onNext}
          className={arrowButton}
        >
          <ArrowRight className="h-4 w-4" strokeWidth={1.6} aria-hidden />
        </button>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* ProgressFill                                                                */
/* -------------------------------------------------------------------------- */

/**
 * Pure CSS animation so the autoplay progress is rock-solid even when JS is
 * busy painting the rest of the page. We use a `key` reset on the parent to
 * restart the animation each time autoplay schedules the next snap.
 *
 * When `durationMs` is null (autoplay off / reduced-motion), the bar simply
 * fills statically.
 */
function ProgressFill({ durationMs }: { durationMs: number | null }) {
  return (
    <span
      aria-hidden
      className="absolute inset-y-0 left-0 bg-ink-900"
      style={
        durationMs === null
          ? { width: "100%" }
          : {
              width: "100%",
              transformOrigin: "left",
              animation: `hero-progress ${durationMs}ms linear forwards`,
            }
      }
    />
  );
}
