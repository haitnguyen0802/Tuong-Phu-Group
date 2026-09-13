import { rmSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const projectRoot = resolve(import.meta.dirname, "..");
const envProductionPath = resolve(projectRoot, ".env.production.local");
const fetchCacheDir = resolve(projectRoot, ".next/cache/fetch-cache");

const apiBaseUrl =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://admin.tuongphugroup.com/api";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://xuongmaysaigon.vn";
const siteKey = process.env.NEXT_PUBLIC_API_SITE_KEY ?? "xuongmay";
const adminUsername = process.env.ADMIN_USERNAME ?? "admin";
const adminPassword = process.env.ADMIN_PASSWORD ?? "change_this_password";

async function fetchAdminToken() {
  const response = await fetch(`${apiBaseUrl.replace(/\/$/, "")}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-Site-Key": siteKey },
    body: JSON.stringify({ username: adminUsername, password: adminPassword }),
  });

  const payload = await response.json().catch(() => null);

  if (!response.ok || !payload?.token) {
    throw new Error(payload?.message ?? `Login failed (${response.status})`);
  }

  return payload.token;
}

async function main() {
  rmSync(fetchCacheDir, { recursive: true, force: true });
  console.log("Cleared Next.js fetch cache.");

  const existingToken = process.env.API_ADMIN_TOKEN?.trim();
  if (existingToken) {
    console.log("API_ADMIN_TOKEN is already set. Skipping login.");
    const lines = [
      `NEXT_PUBLIC_API_BASE_URL=${apiBaseUrl}`,
      `NEXT_PUBLIC_API_SITE_KEY=${siteKey}`,
      `NEXT_PUBLIC_SITE_URL=${siteUrl}`,
      `NEXT_PUBLIC_STATIC_RUNTIME=true`,
      `API_ADMIN_TOKEN=${existingToken}`,
    ];
    writeFileSync(envProductionPath, `${lines.join("\n")}\n`, "utf8");
    console.log(`Synced ${envProductionPath} with current env vars.`);
    return;
  }

  console.log(`Fetching admin token from ${apiBaseUrl} ...`);
  const token = await fetchAdminToken();

  const lines = [
    `NEXT_PUBLIC_API_BASE_URL=${apiBaseUrl}`,
    `NEXT_PUBLIC_API_SITE_KEY=${siteKey}`,
    `NEXT_PUBLIC_SITE_URL=${siteUrl}`,
    `NEXT_PUBLIC_STATIC_RUNTIME=true`,
    `API_ADMIN_TOKEN=${token}`,
  ];

  writeFileSync(envProductionPath, `${lines.join("\n")}\n`, "utf8");
  console.log(`Wrote ${envProductionPath}`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
