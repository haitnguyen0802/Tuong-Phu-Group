import { buildPublicApiUrl, withSiteHeaders } from "./runtime";

/**
 * Browser HTTP cache (especially Chrome) can keep stale CMS GET responses
 * even when `cache: "no-store"` is set, if the URL stays identical.
 * Append a unique query so every live refetch bypasses disk/memory cache.
 */
export function withClientCacheBust(url: string): string {
  const parsed = new URL(url);
  parsed.searchParams.set("_", String(Date.now()));
  return parsed.toString();
}

/** Request init for browser → public API (never reuse a cached response). */
export function getClientFetchInit(init: RequestInit = {}): RequestInit {
  const headers = withSiteHeaders(init.headers);
  if (!headers.has("Accept")) {
    headers.set("Accept", "application/json");
  }
  headers.set("Cache-Control", "no-cache");
  headers.set("Pragma", "no-cache");

  return {
    ...init,
    cache: "no-store",
    headers,
  };
}

/** Fetch a public API path from the browser with cache-busting. */
export function fetchPublicApiClient(path: string, init?: RequestInit): Promise<Response> {
  return fetch(withClientCacheBust(buildPublicApiUrl(path)), getClientFetchInit(init));
}
