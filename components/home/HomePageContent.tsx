"use client";

import * as React from "react";
import { HeroCarousel } from "@/components/home/HeroCarousel";
import { CertificationSection } from "@/components/home/CertificationSection";
import { BestSellerProductGrid } from "@/components/home/BestSellerProductGrid";
import { ProductCategorySections } from "@/components/home/ProductCategorySections";
import { NewsletterSection } from "@/components/home/NewsletterSection";
import { fetchHomepageDataClient } from "@/lib/cms/fetch-homepage-client";
import type { HomepageData } from "@/lib/cms/types";

type HomePageContentProps = {
  initialData: HomepageData;
};

const MIN_REFETCH_INTERVAL_MS = 15_000;

/**
 * Static export (cPanel) bakes `initialData` at build time.
 * After hydration we refetch from the public API (cache-busted) so CMS edits
 * appear without rebuild. Also refreshes when the tab becomes visible again
 * (Chrome often keeps a stale disk-cached first paint).
 */
export function HomePageContent({ initialData }: HomePageContentProps) {
  const [data, setData] = React.useState(initialData);
  const lastFetchAtRef = React.useRef(0);

  const refresh = React.useEffectEvent(() => {
    const now = Date.now();
    if (now - lastFetchAtRef.current < MIN_REFETCH_INTERVAL_MS) return;
    lastFetchAtRef.current = now;

    fetchHomepageDataClient()
      .then((fresh) => {
        setData((prev) => ({ ...prev, ...fresh }));
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
      // Back/forward cache can restore a stale snapshot in Chrome.
      if (event.persisted) refresh();
    };

    document.addEventListener("visibilitychange", onVisible);
    window.addEventListener("pageshow", onPageShow);

    return () => {
      document.removeEventListener("visibilitychange", onVisible);
      window.removeEventListener("pageshow", onPageShow);
    };
  }, []);

  return (
    <>
      <HeroCarousel slides={data.slides} />
      <BestSellerProductGrid
        products={data.products}
        heading={data.sectionHeadings.featured}
      />
      <ProductCategorySections products={data.products} />
      <CertificationSection
        items={data.certifications}
        heading={data.sectionHeadings.partners}
      />
      <NewsletterSection heading={data.sectionHeadings.newsletter} />
    </>
  );
}
