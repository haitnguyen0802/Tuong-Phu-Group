type CmsEnv = {
  target: "strapi";
  endpoint: string | null;
  token: string | null;
  revalidateSeconds: number;
};

function toPositiveNumber(value: string | undefined, fallback: number) {
  if (!value) return fallback;
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

export function getCmsEnv(): CmsEnv {
  return {
    target: "strapi",
    endpoint: process.env.CMS_API_URL ?? null,
    token: process.env.CMS_API_TOKEN ?? null,
    revalidateSeconds: toPositiveNumber(process.env.CMS_REVALIDATE_SECONDS, 300),
  };
}

export async function fetchCmsJson<T>(pathOrUrl: string): Promise<T | null> {
  const env = getCmsEnv();
  if (!env.endpoint) return null;

  const url = pathOrUrl.startsWith("http")
    ? pathOrUrl
    : `${env.endpoint.replace(/\/$/, "")}/${pathOrUrl.replace(/^\//, "")}`;

  try {
    const response = await fetch(url, {
      headers: env.token ? { Authorization: `Bearer ${env.token}` } : undefined,
      next: { revalidate: env.revalidateSeconds },
    });
    if (!response.ok) return null;
    return (await response.json()) as T;
  } catch {
    return null;
  }
}
