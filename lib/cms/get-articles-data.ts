import { articles as fallbackArticles } from "@/data/articles";
import type { Article } from "@/types";
import { mapArticle } from "./mappers";
import { queryArticles } from "./queries";

function withFallback(input: Article[] | undefined | null) {
  return input && input.length > 0 ? input : fallbackArticles;
}

export async function getArticlesData() {
  const cmsArticles = await queryArticles();

  return withFallback(
    cmsArticles.map((item, index) =>
      mapArticle(item, fallbackArticles[index] ?? fallbackArticles[0]),
    ),
  );
}

export async function getArticleDetailData(slug: string) {
  const articles = await getArticlesData();
  return articles.find((article) => article.slug === slug) ?? null;
}
