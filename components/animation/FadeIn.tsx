"use client";

import * as React from "react";
import { motion, useReducedMotion, type HTMLMotionProps } from "motion/react";
import { easeSoft } from "@/lib/motion";
import { useLowEndDevice } from "@/lib/useLowEndDevice";

type FadeInProps = Omit<HTMLMotionProps<"div">, "variants" | "initial" | "whileInView"> & {
  delay?: number;
  duration?: number;
  /** Distance to translate the element from when entering. */
  y?: number;
  /** Run the reveal once and then stop observing. */
  once?: boolean;
  /** How much of the element must be visible before triggering. */
  amount?: number;
  as?: keyof React.JSX.IntrinsicElements;
};

/**
 * Lightweight entrance animation wrapper.
 * Falls back to a static element when the user prefers reduced motion.
 */
export function FadeIn({
  delay = 0,
  duration = 0.7,
  y = 24,
  once = true,
  amount = 0.25,
  className,
  children,
  ...rest
}: FadeInProps) {
  const reduce = useReducedMotion();
  const lowEnd = useLowEndDevice();

  if (reduce || lowEnd) {
    return (
      <div className={className} {...(rest as React.HTMLAttributes<HTMLDivElement>)}>
        {children as React.ReactNode}
      </div>
    );
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration, delay, ease: easeSoft }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
