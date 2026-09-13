import { SiteFooter } from "@/components/layout/SiteFooter";
import { fetchFooter } from "@/lib/api";

export default async function MarketingLayout({ children }: { children: React.ReactNode }) {
  const footer = await fetchFooter();

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">{children}</main>
      <SiteFooter initialFooter={footer} />
    </div>
  );
}
