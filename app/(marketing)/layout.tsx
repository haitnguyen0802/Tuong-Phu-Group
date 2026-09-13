import { SiteFooter } from "@/components/layout/SiteFooter";
import { fetchFooter } from "@/lib/api";
import { isMaintenanceMode } from "@/lib/maintenance";

export default async function MarketingLayout({ children }: { children: React.ReactNode }) {
  // Chế độ bảo trì: root layout đã hiển thị trang bảo trì, bỏ qua fetch footer.
  if (isMaintenanceMode()) {
    return <>{children}</>;
  }

  const footer = await fetchFooter();

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">{children}</main>
      <SiteFooter initialFooter={footer} />
    </div>
  );
}
