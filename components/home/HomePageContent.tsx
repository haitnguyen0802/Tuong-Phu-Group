"use client";

import * as React from "react";
import { HeroCarousel } from "@/components/home/HeroCarousel";
import { CertificationSection } from "@/components/home/CertificationSection";
import { BestSellerProductGrid } from "@/components/home/BestSellerProductGrid";
import { IngredientStorySection } from "@/components/home/IngredientStorySection";
import { NewsletterSection } from "@/components/home/NewsletterSection";
import { fetchHomepageDataClient } from "@/lib/cms/fetch-homepage-client";
import type { HomepageData } from "@/lib/cms/types";

type HomePageContentProps = {
  initialData: HomepageData;
};

/**
 * Static export (cPanel) bakes `initialData` at build time.
 * After hydration we refetch from the public API so CMS edits appear without rebuild.
 */
export function HomePageContent({ initialData }: HomePageContentProps) {
  const [data, setData] = React.useState(initialData);

  React.useEffect(() => {
    if (process.env.NEXT_PUBLIC_STATIC_RUNTIME !== "true") return;

    let cancelled = false;

    fetchHomepageDataClient().then((fresh) => {
      if (!cancelled) setData(fresh);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <>
      <HeroCarousel slides={data.slides} />
      <BestSellerProductGrid
        products={data.products}
        heading={data.sectionHeadings.featured}
      />
      <IngredientStorySection
        items={data.ingredients}
        heading={data.sectionHeadings.formats}
        formatsCatalog={data.formatsCatalog}
      />
      <CertificationSection
        items={data.certifications}
        heading={data.sectionHeadings.partners}
      />
      <NewsletterSection heading={data.sectionHeadings.newsletter} />
    </>
  );
}
