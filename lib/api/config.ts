const DEFAULT_CAMPAIGN_SLUG = "default";

export function getCampaignSlug(): string {
  return (
    process.env.NEXT_PUBLIC_FOOTER_CAMPAIGN_SLUG ??
    process.env.FOOTER_CAMPAIGN_SLUG ??
    DEFAULT_CAMPAIGN_SLUG
  );
}
