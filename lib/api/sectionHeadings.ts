import { fetchApiJson } from "@/lib/cms/client";
import type { SectionHeading, SectionKey } from "@/types";

type SectionHeadingsResponse = {
  sectionHeadings: SectionHeading[];
};

export type SectionHeadingsMap = Partial<Record<SectionKey, SectionHeading>>;

function toSectionHeadingsMap(headings: SectionHeading[]): SectionHeadingsMap {
  return Object.fromEntries(headings.map((heading) => [heading.sectionKey, heading]));
}

export async function fetchSectionHeadings(): Promise<SectionHeadingsMap> {
  const data = await fetchApiJson<SectionHeadingsResponse>("/section-headings");
  return toSectionHeadingsMap(data.sectionHeadings);
}

export async function getSectionHeading(sectionKey: SectionKey): Promise<SectionHeading> {
  return fetchApiJson<SectionHeading>(`/section-headings/${encodeURIComponent(sectionKey)}`);
}

export { toSectionHeadingsMap };
