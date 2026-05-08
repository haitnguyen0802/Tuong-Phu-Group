"use client";

import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/cn";
import { useUIStore } from "@/lib/store/useUIStore";
import { searchSuggestions } from "@/data/nav";
import { Eyebrow } from "@/components/ui/Eyebrow";

const FOCUS_DELAY_MS = 60;

/**
 * Full-screen search dialog.
 *
 * Phase 3 only ships the UX shell — the form intentionally stops at
 * `preventDefault()` and a placeholder console log. Real querying lives in a
 * later phase (Phase 5+ once we have product/article search wiring).
 */
export function SearchOverlay() {
  const open = useUIStore((s) => s.isSearchOpen);
  const close = useUIStore((s) => s.closeSearch);

  const [query, setQuery] = React.useState("");
  const inputRef = React.useRef<HTMLInputElement | null>(null);

  // Radix focuses the first focusable child by default — but we want the
  // input to be the entry point regardless of element order. Defer slightly
  // so the open animation has started before we steal focus.
  React.useEffect(() => {
    if (!open) return;
    const id = window.setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    }, FOCUS_DELAY_MS);
    return () => window.clearTimeout(id);
  }, [open]);

  const handleClose = React.useCallback(() => {
    // Reset state at close-time so the next open is a clean slate without
    // triggering a cascading re-render via an effect.
    setQuery("");
    close();
  }, [close]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;
    if (process.env.NODE_ENV !== "production") {
      console.info("[search] submit", trimmed);
    }
  };

  const handleSuggestionClick = (value: string) => {
    setQuery(value);
    requestAnimationFrame(() => {
      inputRef.current?.focus();
      inputRef.current?.setSelectionRange(value.length, value.length);
    });
  };

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(next) => {
        if (!next) handleClose();
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay
          className={cn(
            "fixed inset-0 z-40 bg-ink-900/45 backdrop-blur",
            "data-[state=open]:animate-[fade-in_200ms_ease-out]",
            "data-[state=closed]:animate-[fade-out_180ms_ease-out]",
          )}
        />
        <Dialog.Content
          aria-describedby={undefined}
          className={cn(
            "fixed z-50 outline-none",
            // Mobile = bottom sheet attached to top, full width.
            "inset-x-0 top-0 bg-cream-50 p-6 shadow-2xl",
            // Desktop = centered card.
            "sm:inset-auto sm:left-1/2 sm:top-1/2 sm:w-[min(92vw,720px)]",
            "sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-2xl sm:p-8",
            "data-[state=open]:animate-[fade-in_220ms_ease-out]",
            "data-[state=closed]:animate-[fade-out_180ms_ease-out]",
            "sm:data-[state=open]:animate-[scale-in_260ms_var(--ease-soft)]",
            "sm:data-[state=closed]:animate-[scale-out_200ms_var(--ease-soft)]",
          )}
        >
          <div className="flex items-center justify-between gap-4">
            <Dialog.Title asChild>
              <Eyebrow>Tìm kiếm</Eyebrow>
            </Dialog.Title>
            <Dialog.Close
              aria-label="Đóng tìm kiếm"
              className={cn(
                "grid h-9 w-9 place-items-center rounded-full text-ink-700",
                "transition-colors hover:bg-cream-100",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-moss-700/40",
              )}
            >
              <X className="h-4 w-4" strokeWidth={1.6} />
            </Dialog.Close>
          </div>

          <form
            role="search"
            onSubmit={handleSubmit}
            className={cn(
              "mt-4 flex items-center gap-3 border-b border-line-200 pb-4",
              "transition-colors duration-200 focus-within:border-moss-700",
            )}
          >
            <Search
              aria-hidden
              strokeWidth={1.6}
              className="h-5 w-5 text-ink-500"
            />
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              type="search"
              autoComplete="off"
              spellCheck={false}
              enterKeyHint="search"
              placeholder="Tìm sản phẩm, nguyên liệu, bài viết…"
              aria-label="Nhập từ khoá tìm kiếm"
              className={cn(
                "h-12 flex-1 bg-transparent font-display text-2xl text-ink-900",
                "placeholder:text-ink-300 focus:outline-none",
                "sm:text-3xl",
              )}
            />
            {query.length > 0 ? (
              <button
                type="button"
                aria-label="Xoá từ khoá"
                onClick={() => {
                  setQuery("");
                  inputRef.current?.focus();
                }}
                className="rounded-full px-2 py-1 text-xs uppercase tracking-wide text-ink-500 hover:text-moss-700"
              >
                Xoá
              </button>
            ) : null}
          </form>

          <div className="mt-6">
            <p className="eyebrow text-ink-500">Gợi ý phổ biến</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {searchSuggestions.map((suggestion) => (
                <SuggestionChip
                  key={suggestion}
                  active={query === suggestion}
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion}
                </SuggestionChip>
              ))}
            </div>
          </div>

          <p className="mt-6 text-xs leading-relaxed text-ink-500 sm:text-sm">
            Mẹo: nhấn{" "}
            <kbd className="rounded border border-line-200 bg-cream-100 px-1.5 py-0.5 font-sans text-[11px] font-medium text-ink-700">
              Esc
            </kbd>{" "}
            để đóng nhanh, hoặc thử với những từ khoá phía trên.
          </p>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

/* ---------------------------------- parts --------------------------------- */

function SuggestionChip({
  children,
  active,
  onClick,
}: {
  children: React.ReactNode;
  active?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex h-9 items-center rounded-full border px-4 text-sm transition-all duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-moss-700/40 focus-visible:ring-offset-2 focus-visible:ring-offset-cream-50",
        active
          ? "border-moss-700 bg-moss-700 text-cream-50"
          : "border-moss-700/25 text-moss-700 hover:border-moss-700 hover:bg-moss-700 hover:text-cream-50",
      )}
    >
      {children}
    </button>
  );
}
