"use client";

import type { Transition, Variants } from "motion/react";
import { useReducedMotion } from "motion/react";

/**
 * Shared motion configuration for the marketing site.
 * Tuned to feel premium and gentle: long ease-out curve, modest distances,
 * slightly delayed children for staggered reveals.
 */

export const easeSoft: Transition["ease"] = [0.22, 1, 0.36, 1];

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: easeSoft },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: easeSoft },
  },
};

export const stagger = (stagger = 0.08, delayChildren = 0.1): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: stagger, delayChildren },
  },
});

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: easeSoft },
  },
};

/**
 * Hook wrapper so we can ship reduced-motion friendly variants without
 * leaking motion/react into every component file.
 *
 * When `prefers-reduced-motion: reduce`, every keyframe is collapsed into an
 * opacity-only fade so we still get a hint of motion without movement.
 */
export function useSafeVariants(variants: Variants): Variants {
  const reduce = useReducedMotion();
  if (!reduce) return variants;
  const safe: Variants = {};
  for (const key of Object.keys(variants)) {
    const v = variants[key] as Record<string, unknown> | undefined;
    const opacity = (v && typeof v.opacity === "number" ? v.opacity : 1) as number;
    safe[key] = {
      opacity,
      transition: { duration: 0.001 },
    };
  }
  return safe;
}
