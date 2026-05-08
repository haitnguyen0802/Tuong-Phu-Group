import type { Article } from "@/types";

export const articles: Article[] = [
  {
    id: "a1",
    slug: "skincare-routine-mua-mua",
    title: "Routine 4 bước cho làn da mùa mưa miền Nam",
    excerpt:
      "Khi độ ẩm tăng cao và bụi mịn nhiều hơn, đây là cách chúng tôi giữ làn da khoẻ mà vẫn nhẹ tênh.",
    category: "Skincare guide",
    publishedAt: "2026-04-12",
    readMinutes: 6,
    thumbnail: {
      src: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1100&q=80",
      alt: "Bộ skincare đặt cạnh ly nước chanh trên bàn gỗ",
    },
  },
  {
    id: "a2",
    slug: "hanh-trinh-tu-sen-hau-giang",
    title: "Hành trình một bông sen từ Hậu Giang đến chai serum",
    excerpt:
      "Chúng tôi theo chân đội thu hái sen vào lúc 4 giờ sáng — và kể lại điều khiến nguyên liệu Việt khác biệt.",
    category: "Behind the brand",
    publishedAt: "2026-03-28",
    readMinutes: 9,
    thumbnail: {
      src: "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?auto=format&fit=crop&w=1100&q=80",
      alt: "Đầm sen lúc bình minh",
    },
  },
  {
    id: "a3",
    slug: "bao-bi-tai-che",
    title: "Vì sao chúng tôi chọn nhựa tái chế thay vì thuỷ tinh",
    excerpt:
      "Không phải lựa chọn nào ‘xanh’ cũng là lựa chọn đúng. Đây là cách Verdara cân nhắc giữa cảm giác cao cấp và thực tế tái chế.",
    category: "Sustainability",
    publishedAt: "2026-03-05",
    readMinutes: 7,
    thumbnail: {
      src: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=1100&q=80",
      alt: "Chai mỹ phẩm tái chế giữa lá xanh",
    },
  },
];
