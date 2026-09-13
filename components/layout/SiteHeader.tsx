"use client";

import * as React from "react";
import { Header } from "@/components/layout/Header";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { SearchOverlay } from "@/components/layout/SearchOverlay";
import { fetchNavigationClient } from "@/lib/api/fetch-navigation-client";
import type { NavItem } from "@/types";

type SiteHeaderProps = {
  brandName: string;
  initialNavItems: NavItem[];
  initialSearchSuggestions: string[];
};

const MIN_REFETCH_INTERVAL_MS = 15_000;

/**
 * Static export bakes navigation at build time.
 * After hydration we refetch (cache-busted) so CMS navigation edits appear
 * without rebuilding. Also refreshes when the tab becomes visible again.
 */
export function SiteHeader({
  brandName,
  initialNavItems,
  initialSearchSuggestions,
}: SiteHeaderProps) {
  const [navItems, setNavItems] = React.useState(initialNavItems);
  const [searchSuggestions, setSearchSuggestions] = React.useState(
    initialSearchSuggestions,
  );
  const lastFetchAtRef = React.useRef(0);

  const refresh = React.useEffectEvent(() => {
    const now = Date.now();
    if (now - lastFetchAtRef.current < MIN_REFETCH_INTERVAL_MS) return;
    lastFetchAtRef.current = now;

    fetchNavigationClient()
      .then((nav) => {
        if (nav.headerSections.length) setNavItems(nav.headerSections);
        setSearchSuggestions(nav.searchSuggestions);
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

  return (
    <>
      <Header brandName={brandName} navItems={navItems} />
      <SearchOverlay searchSuggestions={searchSuggestions} />
      <MobileMenu brandName={brandName} navItems={navItems} />
    </>
  );
}
