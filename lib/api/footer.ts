import { fetchApiJson } from "@/lib/cms/client";
import { getCampaignSlug } from "./config";
import type { FooterData } from "@/types";

type FooterResponse = {
  id: string;
  slug: string;
  footer: FooterData;
  updatedAt: string;
};

export async function fetchFooter(slug = getCampaignSlug()): Promise<FooterData> {
  const data = await fetchApiJson<FooterResponse>(
    `/footer?slug=${encodeURIComponent(slug)}`,
  );
  return data.footer;
}
