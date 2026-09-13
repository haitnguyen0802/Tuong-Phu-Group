import { ApiError } from "@/lib/api/errors";
import { getServerFetchInit } from "@/lib/api/fetch-cache";
import { buildPublicApiUrl, withSiteHeaders } from "./runtime";

let cachedAdminToken: string | null = null;

type LoginResponse = {
  token?: string;
  message?: string;
};

export async function resolveAdminToken(): Promise<string> {
  const staticToken =
    process.env.API_ADMIN_TOKEN ?? process.env.API_JWT ?? process.env.CMS_API_TOKEN ?? null;
  if (staticToken) return staticToken;
  if (cachedAdminToken) return cachedAdminToken;

  const username = process.env.ADMIN_USERNAME;
  const password = process.env.ADMIN_PASSWORD;
  if (!username || !password) {
    throw new ApiError(
      "Thiếu API_ADMIN_TOKEN hoặc ADMIN_USERNAME/ADMIN_PASSWORD để gọi admin API.",
      401,
    );
  }

  const response = await fetch(
    buildPublicApiUrl("/auth/login"),
    getServerFetchInit({
      method: "POST",
      headers: withSiteHeaders({ "Content-Type": "application/json" }),
      body: JSON.stringify({ username, password }),
    }),
  );

  const payload = (await response.json().catch(() => null)) as LoginResponse | null;
  if (!response.ok || !payload?.token) {
    throw new ApiError(payload?.message ?? "Không thể đăng nhập admin API.", response.status || 401);
  }

  cachedAdminToken = payload.token;
  return cachedAdminToken;
}
