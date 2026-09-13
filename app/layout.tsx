import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { getSiteChromeData } from "@/lib/api";
import { siteUrl } from "@/lib/site";
import { isMaintenanceMode } from "@/lib/maintenance";
import { MaintenancePage } from "@/components/maintenance/MaintenancePage";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { CartDrawer } from "@/components/cart/CartDrawer";

const sans = Roboto({
  variable: "--font-sans",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "700", "900"],
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  // Chế độ bảo trì: metadata tĩnh, không gọi API (phòng khi backend đang tắt).
  if (isMaintenanceMode()) {
    return {
      title: "Website đang bảo trì — Xưởng May Sài Gòn",
      description:
        "Xưởng May Sài Gòn đang nâng cấp hệ thống. Vui lòng liên hệ hotline hoặc email trong thời gian bảo trì.",
      metadataBase: new URL(siteUrl),
      robots: { index: false, follow: false },
      icons: { icon: "/favicon.ico" },
    };
  }

  const chrome = await getSiteChromeData();
  const { brand } = chrome;
  const siteTitle = `${brand.name} — ${brand.tagline}`;

  return {
    title: {
      default: siteTitle,
      template: `%s · ${brand.name}`,
    },
    description: brand.description,
    metadataBase: new URL(siteUrl),
    keywords: [
      "quảng cáo OOH",
      "quảng cáo ngoài trời",
      "bảng LED",
      "frame thang máy",
      "atrium TTTM",
      "billboard",
      "Tường Phú Group",
      "quảng cáo chợ",
    ],
    alternates: {
      canonical: "/",
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      type: "website",
      title: siteTitle,
      description: brand.description,
      siteName: brand.name,
      url: siteUrl,
      locale: "vi_VN",
      images: [
        {
          url: "/images/03_Quang_Cao_Ngoai_Troi/slide_04_image_01_image5.jpg",
          width: 1200,
          height: 630,
          alt: `${brand.name} — giải pháp quảng cáo OOH toàn diện`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: siteTitle,
      description: brand.description,
      images: ["/images/03_Quang_Cao_Ngoai_Troi/slide_04_image_01_image5.jpg"],
    },
    icons: {
      icon: "/favicon.ico",
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Chế độ bảo trì: mọi trang đều hiển thị trang bảo trì, không render header/nav.
  if (isMaintenanceMode()) {
    return (
      <html lang="vi" className={sans.variable}>
        <body
          className="min-h-screen bg-background text-foreground antialiased"
          suppressHydrationWarning
        >
          <MaintenancePage />
        </body>
      </html>
    );
  }

  const chrome = await getSiteChromeData();

  return (
    <html
      lang="vi"
      data-scroll-behavior="smooth"
      className={sans.variable}
    >
      <body
        className="min-h-screen bg-background text-foreground antialiased"
        suppressHydrationWarning
      >
        <SiteHeader
          brandName={chrome.brand.name}
          initialNavItems={chrome.headerSections}
          initialSearchSuggestions={chrome.searchSuggestions}
        />
        {children}
        <CartDrawer />
      </body>
    </html>
  );
}
