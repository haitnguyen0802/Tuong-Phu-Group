const FALLBACK_API_BASE_URL = "https://admin.tuongphugroup.com/api";

/**
 * Multi-site backend routes requests to the correct database via the
 * `X-Site-Key` header. Every API call must carry this key so the data
 * comes from the Xưởng May site instead of the default site.
 *
 * WARNING: the backend only accepts the exact keys `tuongphu-group` and
 * `xuongmay`. Any invalid key (e.g. `xuongmay-tpg`) is silently treated as
 * the default site (`tuongphu-group`), so this value must stay `xuongmay`.
 */
const DEFAULT_SITE_KEY = "xuongmay";

function normalizeBaseUrl(value: string): string {
  return value.endsWith("/") ? value.slice(0, -1) : value;
}

export function getPublicApiBaseUrl() {
  return normalizeBaseUrl(
    process.env.NEXT_PUBLIC_API_BASE_URL ?? process.env.NEXT_PUBLIC_API_URL ?? FALLBACK_API_BASE_URL,
  );
}

export function getApiSiteKey() {
  return process.env.NEXT_PUBLIC_API_SITE_KEY ?? DEFAULT_SITE_KEY;
}

/** Merge the required `X-Site-Key` header into the given headers (without overriding an explicit value). */
export function withSiteHeaders(init?: HeadersInit): Headers {
  const headers = new Headers(init);
  if (!headers.has("X-Site-Key")) {
    headers.set("X-Site-Key", getApiSiteKey());
  }
  return headers;
}

export function buildPublicApiUrl(path: string) {
  const baseUrl = getPublicApiBaseUrl();
  if (path.startsWith("http")) return path;
  return `${baseUrl}/${path.replace(/^\//, "")}`;
}
