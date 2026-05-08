"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { announcements } from "@/data/brand";
import { easeSoft } from "@/lib/motion";

const ROTATE_MS = 5500;

export function AnnouncementBar() {
  const [index, setIndex] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce || announcements.length <= 1) return;
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % announcements.length);
    }, ROTATE_MS);
    return () => window.clearInterval(id);
  }, [reduce]);

  const current = announcements[index];

  return (
    <div
      role="region"
      aria-label="Thông báo từ Verdara"
      className="bg-moss-800 text-cream-100"
    >
      <div className="mx-auto flex h-9 w-full max-w-[90rem] items-center justify-center px-4 text-xs sm:text-[13px]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.p
            key={current}
            initial={reduce ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -6 }}
            transition={{ duration: 0.4, ease: easeSoft }}
            className="truncate text-center tracking-wide"
          >
            {current}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}
