import { ApiError } from "@/lib/api/errors";
import { getServerFetchCache } from "@/lib/api/fetch-cache";
import { getPublicApiBaseUrl } from "@/lib/api/runtime";
import { resolveAdminToken } from "@/lib/api/admin-token";

type ApiEnv = {
  endpoint: string;
  adminToken: string | null;
  revalidateSeconds: number;
};

function toPositiveNumber(value: string | undefined, defaultValue: number) {
  if (!value) return defaultValue;
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : defaultValue;
}

export function getApiEnv(): ApiEnv {
  return {
    endpoint: getPublicApiBaseUrl(),
    adminToken:
      process.env.API_ADMIN_TOKEN ?? process.env.API_JWT ?? process.env.CMS_API_TOKEN ?? null,
    revalidateSeconds: toPositiveNumber(process.env.CMS_REVALIDATE_SECONDS, 300),
  };
}

function buildUrl(pathOrUrl: string): string {
  if (pathOrUrl.startsWith("http")) return pathOrUrl;
  const base = getApiEnv().endpoint.replace(/\/$/, "");
  return `${base}/${pathOrUrl.replace(/^\//, "")}`;
}

async function readErrorMessage(response: Response): Promise<string> {
  const body = (await response.json().catch(() => null)) as { message?: string } | null;
  return body?.message ?? response.statusText;
}

export async function fetchApiJson<T>(pathOrUrl: string, init: RequestInit = {}): Promise<T> {
  const url = buildUrl(pathOrUrl);
  const headers = new Headers(init.headers);

  let response: Response;
  try {
    response = await fetch(url, {
      ...init,
      headers,
      cache: init.cache ?? getServerFetchCache(),
    });
  } catch (error) {
    const reason = error instanceof Error ? error.message : "Unknown network error";
    throw new ApiError(`Không kết nối được API (${url}): ${reason}`, 503);
  }

  if (!response.ok) {
    throw new ApiError(await readErrorMessage(response), response.status);
  }

  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    throw new ApiError(
      `API trả về dữ liệu không hợp lệ (${contentType || "unknown"}). Kiểm tra NEXT_PUBLIC_API_BASE_URL.`,
      502,
    );
  }

  return (await response.json()) as T;
}

export async function fetchAdminApiJson<T>(pathOrUrl: string, init: RequestInit = {}): Promise<T> {
  const adminToken = await resolveAdminToken();

  const headers = new Headers(init.headers);
  headers.set("Authorization", `Bearer ${adminToken}`);

  return fetchApiJson<T>(pathOrUrl, { ...init, headers });
}

/** @deprecated Use fetchApiJson */
export async function fetchCmsJson<T>(pathOrUrl: string, init: RequestInit = {}): Promise<T> {
  return fetchApiJson<T>(pathOrUrl, init);
}

/** @deprecated Use getApiEnv */
export function getCmsEnv() {
  const env = getApiEnv();
  return {
    target: "api" as const,
    endpoint: env.endpoint,
    token: env.adminToken,
    revalidateSeconds: env.revalidateSeconds,
  };
}
