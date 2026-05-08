import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock3 } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { buttonStyles } from "@/components/ui/Button";
import { FadeIn } from "@/components/animation/FadeIn";
import { articles } from "@/data/articles";
import type { Article } from "@/types";

type JournalPreviewSectionProps = {
  items?: Article[];
};

const dateFormatter = new Intl.DateTimeFormat("vi-VN", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
});

export function JournalPreviewSection({ items = articles }: JournalPreviewSectionProps) {
  const previewArticles = items.slice(0, 3);

  return (
    <section aria-label="Cẩm nang OOH & case study" className="pb-24 pt-4 sm:pb-28 sm:pt-8">
      <Container size="wide" className="space-y-10">
        <FadeIn y={20}>
          <SectionTitle
            align="center"
            eyebrow="Cẩm nang OOH"
            title="Case study & insight thị trường quảng cáo ngoài trời."
            lead="Cập nhật quy trình triển khai chiến dịch, dữ liệu đo lường và những bài học rút ra từ các campaign Tường Phú Group đồng hành cùng đối tác."
          />
        </FadeIn>

        <div className="grid gap-5 lg:grid-cols-3">
          {previewArticles.map((article, index) => (
            <FadeIn
              key={article.id}
              delay={index * 0.07}
              y={18}
              className="group flex h-full flex-col overflow-hidden rounded-[1.6rem] border border-line-100 bg-cream-50"
            >
              <Link
                href={`/journal/${article.slug}`}
                className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-moss-700/40 focus-visible:ring-offset-2 focus-visible:ring-offset-cream-50"
                aria-label={`Đọc bài viết ${article.title}`}
              >
                <div className="relative aspect-[16/10] overflow-hidden border-b border-line-100">
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
                <p className="text-xs uppercase tracking-[0.14em] text-moss-700">
                  {article.category}
                </p>
                <h3 className="text-xl font-semibold leading-snug text-ink-900">
                  <Link
                    href={`/journal/${article.slug}`}
                    className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-moss-700/40 focus-visible:ring-offset-2 focus-visible:ring-offset-cream-50"
                  >
                    {article.title}
                  </Link>
                </h3>
                <p className="text-sm leading-relaxed text-ink-600">{article.excerpt}</p>

                <div className="mt-auto flex items-center justify-between gap-3 text-sm text-ink-500">
                  <span>{dateFormatter.format(new Date(article.publishedAt))}</span>
                  <span className="inline-flex items-center gap-1">
                    <Clock3 className="h-4 w-4" aria-hidden strokeWidth={1.7} />
                    {article.readMinutes} phút đọc
                  </span>
                </div>

                <Link
                  href={`/journal/${article.slug}`}
                  className="inline-flex items-center gap-1 text-sm font-medium text-moss-700 transition-colors hover:text-moss-800"
                  aria-label={`Đọc tiếp bài viết ${article.title}`}
                >
                  Đọc tiếp
                  <ArrowRight className="h-4 w-4" aria-hidden strokeWidth={1.8} />
                </Link>
              </div>
            </FadeIn>
          ))}
        </div>

        <div className="flex justify-center">
          <Link
            href="/journal"
            className={buttonStyles({ variant: "outline", size: "lg" })}
            aria-label="Xem tất cả bài viết Cẩm nang OOH"
          >
            Xem tất cả bài viết
          </Link>
        </div>
      </Container>
    </section>
  );
}
