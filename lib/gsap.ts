"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Register GSAP plugins on the client exactly once.
 * Call `ensureGsap()` from any client component that uses ScrollTrigger.
 */
let registered = false;

export function ensureGsap() {
  if (typeof window === "undefined") return { gsap, ScrollTrigger };
  if (!registered) {
    gsap.registerPlugin(ScrollTrigger);
    registered = true;
  }
  return { gsap, ScrollTrigger };
}

export { gsap, ScrollTrigger };
