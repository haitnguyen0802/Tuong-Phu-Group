"use client";

import * as React from "react";
import { fetchFooterClient } from "@/lib/api/fetch-footer-client";
import type { FooterData } from "@/types";
import { Footer } from "./Footer";

type SiteFooterProps = {
  initialFooter: FooterData;
};

const MIN_REFETCH_INTERVAL_MS = 15_000;

/**
 * Static export bakes `initialFooter` at build time.
 * After hydration we refetch (cache-busted) so CMS footer edits appear without rebuild.
 */
export function SiteFooter({ initialFooter }: SiteFooterProps) {
  const [footer, setFooter] = React.useState(initialFooter);
  const lastFetchAtRef = React.useRef(0);

  const refresh = React.useEffectEvent(() => {
    const now = Date.now();
    if (now - lastFetchAtRef.current < MIN_REFETCH_INTERVAL_MS) return;
    lastFetchAtRef.current = now;

    fetchFooterClient()
      .then((fresh) => {
        setFooter(fresh);
      })
      .catch(() => {
        // Keep build-time snapshot when live fetch fails.
      });
  });

  React.useEffect(() => {
    refresh();

    const onVisible = () => {
      if (document.visibilityState === "visible") refresh();
    };
    const onPageShow = (event: PageTransitionEvent) => {
      if (event.persisted) refresh();
    };

    document.addEventListener("visibilitychange", onVisible);
    window.addEventListener("pageshow", onPageShow);

    return () => {
      document.removeEventListener("visibilitychange", onVisible);
      window.removeEventListener("pageshow", onPageShow);
    };
  }, []);

  return <Footer footer={footer} />;
}
