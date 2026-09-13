import type { Product, ProductBadge } from "@/types";
import { mapArticle, mapProduct } from "./mappers";
import { queryArticleBySlug, queryArticles } from "./queries";

export async function getArticlesData() {
  const cmsArticles = await queryArticles();
  return cmsArticles.map(mapArticle);
}

export async function getArticleDetailData(slug: string) {
  const cmsArticle = await queryArticleBySlug(slug);
  return cmsArticle ? mapArticle(cmsArticle) : null;
}
