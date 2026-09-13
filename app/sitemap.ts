import type { MetadataRoute } from "next";
import { getArticlesData } from "@/lib/cms/get-articles-data";
import { siteUrl } from "@/lib/site";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();
  const articles = await getArticlesData();

  const articleRoutes = articles.map((article) => ({
    url: `${siteUrl}/journal/${article.slug}`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [
    {
      url: siteUrl,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...articleRoutes,
  ];
}
