import { buildPublicApiUrl } from "./runtime";
import { getCampaignSlug } from "./config";
import type { FooterData } from "@/types";

type FooterResponse = {
  footer: FooterData;
};

/** Fetch footer from the browser (for static export on cPanel). */
export async function fetchFooterClient(slug = getCampaignSlug()): Promise<FooterData> {
  const response = await fetch(
    buildPublicApiUrl(`/footer?slug=${encodeURIComponent(slug)}`),
    {
      cache: "no-store",
      headers: { Accept: "application/json" },
    },
  );

  if (!response.ok) {
    throw new Error(`Không tải được footer (${response.status}).`);
  }

  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    throw new Error("API footer trả về dữ liệu không hợp lệ.");
  }

  const data = (await response.json()) as FooterResponse;
  return data.footer;
}
