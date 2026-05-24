import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock3 } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { buttonStyles } from "@/components/ui/Button";
import { getArticleDetailData, getArticlesData } from "@/lib/cms/get-articles-data";

type ArticleDetailPageProps = {
  params: Promise<{ slug: string }>;
};

const dateFormatter = new Intl.DateTimeFormat("vi-VN", {
  day: "2-digit",
  month: "long",
  year: "numeric",
});

export const revalidate = 300;

export async function generateStaticParams() {
  const articles = await getArticlesData();
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: ArticleDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleDetailData(slug);

  if (!article) {
    return { title: "Tin tức không tồn tại" };
  }

  return {
    title: article.title,
    description: article.excerpt,
    alternates: {
      canonical: `/journal/${article.slug}`,
    },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: [{ url: article.thumbnail.src, alt: article.thumbnail.alt }],
    },
  };
}

export default async function ArticleDetailPage({ params }: ArticleDetailPageProps) {
  const { slug } = await params;
  const article = await getArticleDetailData(slug);
  if (!article) notFound();

  return (
    <article className="py-12 sm:py-16 lg:py-20">
      <Container size="narrow" className="space-y-8">
        <Link
          href="/"
          className={buttonStyles({ variant: "outline", size: "md" })}
          aria-label="Quay về trang chủ"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden strokeWidth={1.8} />
          Trang chủ
        </Link>

        <header className="space-y-5">
          <p className="eyebrow text-moss-700">{article.category}</p>
          <h1 className="font-display text-ink-900 text-4xl leading-[1.05] text-balance sm:text-5xl lg:text-6xl">
            {article.title}
          </h1>
          <p className="text-ink-600 text-lg leading-relaxed text-pretty">{article.excerpt}</p>
          <div className="text-ink-500 flex flex-wrap items-center gap-4 text-sm">
            <time dateTime={article.publishedAt}>
              {dateFormatter.format(new Date(article.publishedAt))}
            </time>
            <span className="inline-flex items-center gap-1">
              <Clock3 className="h-4 w-4" aria-hidden strokeWidth={1.7} />
              {article.readMinutes} phút đọc
            </span>
          </div>
        </header>

        <div className="border-line-100 bg-cream-100 relative aspect-[16/10] overflow-hidden rounded-[1.6rem] border">
          <Image
            src={article.thumbnail.src}
            alt={article.thumbnail.alt}
            fill
            sizes="(min-width: 1024px) 64rem, 100vw"
            className="object-cover"
            priority
          />
        </div>

        <div className="text-ink-700 space-y-6 text-base leading-8 sm:text-lg">
          <p>
            Tường Phú Group tổng hợp bài viết này như một bản ghi ngắn về bối cảnh triển khai, mục
            tiêu truyền thông và các điểm cần theo dõi khi vận hành chiến dịch OOH.
          </p>
          <p>
            Trọng tâm của chiến dịch nằm ở việc chọn đúng định dạng, đúng điểm chạm và đúng thời
            điểm xuất hiện. Khi các vị trí được kiểm tra theo lưu lượng, góc nhìn và môi trường xung
            quanh, ngân sách quảng cáo có cơ sở rõ hơn để phân bổ.
          </p>
          <p>
            Sau giai đoạn triển khai, dữ liệu đo lường được dùng để đánh giá mức độ nhận diện, tần
            suất tiếp cận và hiệu quả chi phí. Đây là nền tảng để tối ưu các đợt booking tiếp theo.
          </p>
        </div>
      </Container>
    </article>
  );
}
