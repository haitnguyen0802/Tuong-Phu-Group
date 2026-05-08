import type { MetadataRoute } from "next";
import { getProductListingData } from "@/lib/cms/get-products-data";
import { siteUrl } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();
  const productData = await getProductListingData();

  const productRoutes = productData.items.map((product) => ({
    url: `${siteUrl}/products/${product.slug}`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: siteUrl,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/products`,
      lastModified,
      changeFrequency: "daily",
      priority: 1,
    },
    ...productRoutes,
  ];
}
