"use client";

import * as React from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/cn";
import { easeSoft } from "@/lib/motion";
import { Container } from "@/components/ui/Container";
import type { NavItem } from "@/types";

type MegaMenuProps = {
  /** A nav item that has populated `groups`. Items without groups should use a plain link. */
  item: NavItem;
  className?: string;
};

const OPEN_DELAY_MS = 100;
const CLOSE_DELAY_MS = 150;

/**
 * Desktop-only dropdown for nav items that ship with `groups`.
 *
 * Behaviour:
 *  - Hover with intent: opens after a short delay so quick mouse-throughs
 *    don't flicker the panel; closes after a slightly longer delay so the
 *    user can travel from trigger → panel without losing it.
 *  - Keyboard: focusing the trigger opens the panel; blurring outside the
 *    trigger+panel cluster closes it.
 *  - Escape: closes and returns focus to the trigger.
 *  - Outside click / scroll: closes.
 *  - `prefers-reduced-motion`: drops the translate, keeps a fade.
 */
export function MegaMenu({ item, className }: MegaMenuProps) {
  const [open, setOpen] = React.useState(false);
  const openTimer = React.useRef<number | null>(null);
  const closeTimer = React.useRef<number | null>(null);
  const triggerRef = React.useRef<HTMLAnchorElement | null>(null);
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const panelId = React.useId();
  const reduce = useReducedMotion();

  const clearTimers = React.useCallback(() => {
    if (openTimer.current !== null) {
      window.clearTimeout(openTimer.current);
      openTimer.current = null;
    }
    if (closeTimer.current !== null) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }, []);

  const scheduleOpen = React.useCallback(() => {
    if (closeTimer.current !== null) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    if (openTimer.current !== null) return;
    openTimer.current = window.setTimeout(() => {
      openTimer.current = null;
      setOpen(true);
    }, OPEN_DELAY_MS);
  }, []);

  const scheduleClose = React.useCallback(() => {
    if (openTimer.current !== null) {
      window.clearTimeout(openTimer.current);
      openTimer.current = null;
    }
    if (closeTimer.current !== null) return;
    closeTimer.current = window.setTimeout(() => {
      closeTimer.current = null;
      setOpen(false);
    }, CLOSE_DELAY_MS);
  }, []);

  const closeNow = React.useCallback(() => {
    clearTimers();
    setOpen(false);
  }, [clearTimers]);

  React.useEffect(() => clearTimers, [clearTimers]);

  // ESC closes + returns focus to the trigger.
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeNow();
        triggerRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, closeNow]);

  // Outside click closes the panel (covers cases where pointer leaves
  // before the close timer resolves, e.g. drag-and-release scenarios).
  React.useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!containerRef.current) return;
      if (containerRef.current.contains(e.target as Node)) return;
      closeNow();
    };
    window.addEventListener("pointerdown", onPointerDown);
    return () => window.removeEventListener("pointerdown", onPointerDown);
  }, [open, closeNow]);

  const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    const next = e.relatedTarget as Node | null;
    if (next && e.currentTarget.contains(next)) return;
    scheduleClose();
  };

  return (
    <div
      ref={containerRef}
      className={cn("relative", className)}
      onMouseEnter={scheduleOpen}
      onMouseLeave={scheduleClose}
      onFocus={scheduleOpen}
      onBlur={handleBlur}
    >
      <Link
        ref={triggerRef}
        href={item.href}
        aria-expanded={open}
        aria-controls={panelId}
        aria-haspopup="true"
        className={cn(
          "relative inline-flex h-10 items-center gap-1 transition-colors duration-200 hover:text-moss-700",
          "after:pointer-events-none after:absolute after:inset-x-0 after:bottom-1 after:h-px after:bg-moss-700 after:transition-transform after:duration-300",
          open ? "text-moss-700 after:scale-x-100" : "after:scale-x-0 hover:after:scale-x-100",
          item.highlight && "text-clay-500 hover:text-clay-600",
        )}
      >
        {item.label}
      </Link>

      <AnimatePresence>
        {open && item.groups && item.groups.length > 0 ? (
          <>
            {/* Subtle scrim under panel — reads as a hairline shadow rather than a real overlay. */}
            <motion.div
              aria-hidden
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: easeSoft }}
              className="fixed inset-x-0 top-full z-20 h-screen bg-ink-900/5"
            />

            <motion.div
              id={panelId}
              role="region"
              aria-label={item.label}
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -4 }}
              transition={{ duration: 0.28, ease: easeSoft }}
              className={cn(
                "absolute left-1/2 top-full z-30 w-screen -translate-x-1/2",
                "border-t border-line-100 bg-cream-50/95 backdrop-blur",
                "shadow-[0_24px_48px_-32px_rgba(31,36,34,0.25)]",
              )}
            >
              <Container size="wide" className="grid gap-10 py-10 md:grid-cols-3">
                {item.groups.map((group) => (
                  <div key={group.title}>
                    <p className="eyebrow text-ink-700">{group.title}</p>
                    <ul className="mt-4 space-y-3">
                      {group.items.map((sub) => (
                        <li key={sub.href}>
                          <Link
                            href={sub.href}
                            onClick={closeNow}
                            className={cn(
                              "group/item flex items-start gap-3 rounded-lg px-2 py-2 -mx-2",
                              "text-sm text-ink-900 transition-colors duration-200",
                              "hover:bg-cream-100/70 hover:text-moss-700",
                              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-moss-700/40",
                            )}
                          >
                            <span className="flex flex-1 flex-col gap-0.5">
                              <span className="font-medium">{sub.label}</span>
                              {sub.description ? (
                                <span className="text-ink-500">{sub.description}</span>
                              ) : null}
                            </span>
                            <ArrowUpRight
                              aria-hidden
                              strokeWidth={1.6}
                              className={cn(
                                "mt-0.5 h-4 w-4 -translate-x-1 opacity-0",
                                "transition-all duration-200",
                                "group-hover/item:translate-x-0 group-hover/item:opacity-100",
                                "group-focus-visible/item:translate-x-0 group-focus-visible/item:opacity-100",
                              )}
                            />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </Container>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
