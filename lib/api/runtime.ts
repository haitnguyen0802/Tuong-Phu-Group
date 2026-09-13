const FALLBACK_API_BASE_URL = "https://admin.tuongphugroup.com/api";

function normalizeBaseUrl(value: string): string {
  return value.endsWith("/") ? value.slice(0, -1) : value;
}

export function getPublicApiBaseUrl() {
  return normalizeBaseUrl(
    process.env.NEXT_PUBLIC_API_BASE_URL ?? process.env.NEXT_PUBLIC_API_URL ?? FALLBACK_API_BASE_URL,
  );
}

export function buildPublicApiUrl(path: string) {
  const baseUrl = getPublicApiBaseUrl();
  if (path.startsWith("http")) return path;
  return `${baseUrl}/${path.replace(/^\//, "")}`;
}
