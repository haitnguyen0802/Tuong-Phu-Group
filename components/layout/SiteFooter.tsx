"use client";

import * as React from "react";
import { fetchFooterClient } from "@/lib/api/fetch-footer-client";
import type { FooterData } from "@/types";
import { Footer } from "./Footer";

type SiteFooterProps = {
  initialFooter: FooterData;
};

/**
 * Static export bakes `initialFooter` at build time.
 * After hydration we refetch from the public API so CMS footer edits appear without rebuild.
 */
export function SiteFooter({ initialFooter }: SiteFooterProps) {
  const [footer, setFooter] = React.useState(initialFooter);

  React.useEffect(() => {
    if (process.env.NEXT_PUBLIC_STATIC_RUNTIME !== "true") return;

    let cancelled = false;

    fetchFooterClient()
      .then((fresh) => {
        if (!cancelled) setFooter(fresh);
      })
      .catch(() => {
        // Keep build-time snapshot when live fetch fails.
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return <Footer footer={footer} />;
}
