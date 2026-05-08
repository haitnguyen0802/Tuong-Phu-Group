import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { SearchOverlay } from "@/components/layout/SearchOverlay";
import { CartDrawer } from "@/components/cart/CartDrawer";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <AnnouncementBar />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />

      {/* Header-driven overlays. Both are client islands that read state from
          `useUIStore`, so the trigger (HeaderActions) and the surface stay
          decoupled. Mounted at the layout root so they portal above all routes. */}
      <MobileMenu />
      <SearchOverlay />
      <CartDrawer />
    </div>
  );
}
