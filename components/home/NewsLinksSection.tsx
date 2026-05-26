import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock3 } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { FadeIn } from "@/components/animation/FadeIn";
import { articles } from "@/data/articles";
import type { Article } from "@/types";

type NewsLinksSectionProps = {
  items?: Article[];
};

const dateFormatter = new Intl.DateTimeFormat("vi-VN", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
});

export function NewsLinksSection({ items = articles }: NewsLinksSectionProps) {
  const previewArticles = items.slice(0, 3);

  return (
    <section
      id="news"
      aria-label="Tin tức mới nhất"
      className="pt-6 pb-24 sm:pt-10 sm:pb-28"
    >
      <Container size="wide" className="space-y-10">
        <FadeIn y={20}>
          <SectionTitle
            align="center"
            eyebrow="Tin tức"
            title="Cập nhật hoạt động và góc nhìn thị trường OOH."
            lead="Các bài viết ngắn giúp khách hàng nắm nhanh bối cảnh triển khai, dữ liệu đo lường và kinh nghiệm vận hành chiến dịch ngoài trời."
          />
        </FadeIn>

        <div className="grid gap-5 lg:grid-cols-3">
          {previewArticles.map((article, index) => (
            <FadeIn
              key={article.id}
              delay={index * 0.07}
              y={18}
              className="group border-line-100 bg-cream-50 flex h-full flex-col overflow-hidden rounded-[1.6rem] border"
            >
              <Link
                href={`/journal/${article.slug}`}
                className="focus-visible:ring-moss-700/40 focus-visible:ring-offset-cream-50 block focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
                aria-label={`Đọc tin ${article.title}`}
              >
                <div className="border-line-100 relative aspect-[16/10] overflow-hidden border-b">
                  <Image
                    src={article.thumbnail.src}
                    alt={article.thumbnail.alt}
                    fill
                    sizes="(min-width: 1024px) 30vw, 100vw"
                    className="object-cover transition-transform duration-500 motion-safe:group-hover:scale-[1.03]"
                  />
                </div>
              </Link>

              <div className="flex flex-1 flex-col space-y-4 p-5">
                <p className="text-moss-700 text-xs tracking-[0.14em] uppercase">
                  {article.category}
                </p>
                <h3 className="text-ink-900 text-xl leading-snug font-semibold">
                  <Link
                    href={`/journal/${article.slug}`}
                    className="focus-visible:ring-moss-700/40 focus-visible:ring-offset-cream-50 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
                  >
                    {article.title}
                  </Link>
                </h3>
                <p className="text-ink-600 text-sm leading-relaxed">{article.excerpt}</p>

                <div className="text-ink-500 mt-auto flex items-center justify-between gap-3 text-sm">
                  <span>{dateFormatter.format(new Date(article.publishedAt))}</span>
                  <span className="inline-flex items-center gap-1">
                    <Clock3 className="h-4 w-4" aria-hidden strokeWidth={1.7} />
                    {article.readMinutes} phút đọc
                  </span>
                </div>

                <Link
                  href={`/journal/${article.slug}`}
                  className="text-moss-700 hover:text-moss-800 inline-flex items-center gap-1 text-sm font-medium transition-colors"
                  aria-label={`Đọc tiếp tin ${article.title}`}
                >
                  Đọc tiếp
                  <ArrowRight className="h-4 w-4" aria-hidden strokeWidth={1.8} />
                </Link>
              </div>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}
