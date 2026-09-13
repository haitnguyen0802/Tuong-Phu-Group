function isDevelopmentRuntime() {
  return process.env.NODE_ENV === "development";
}

/**
 * Static export cannot use `no-store` during prerender (Next.js treats it as dynamic).
 * Use `force-cache` for production builds, and clear `.next/cache/fetch-cache`
 * before each build via `prepare-build-env.mjs` so CMS data stays fresh.
 */
export function getServerFetchCache(): RequestCache {
  return isDevelopmentRuntime() ? "no-store" : "force-cache";
}

export function getServerFetchInit(init: RequestInit = {}): RequestInit {
  if (isDevelopmentRuntime()) {
    return init;
  }

  return {
    ...init,
    cache: init.cache ?? getServerFetchCache(),
  };
}
