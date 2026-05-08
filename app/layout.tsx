import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { brand } from "@/data/brand";
import { siteTitle, siteUrl } from "@/lib/site";

const sans = Inter({
  variable: "--font-sans",
  subsets: ["latin", "vietnamese"],
  display: "swap",
});

const display = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: siteTitle,
    template: `%s · ${brand.name}`,
  },
  description: brand.description,
  metadataBase: new URL(siteUrl),
  keywords: [
    "my pham thuan chay",
    "cham soc da",
    "nguyen lieu viet nam",
    "verdara",
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
        url: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9",
        width: 1200,
        height: 630,
        alt: `${brand.name} botanical skincare`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: brand.description,
    images: ["https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      data-scroll-behavior="smooth"
      className={`${sans.variable} ${display.variable}`}
    >
      <body className="min-h-screen bg-background text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
