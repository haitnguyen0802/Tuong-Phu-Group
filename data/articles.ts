import type { Article } from "@/types";

export const articles: Article[] = [
  {
    id: "a-honda-tet",
    slug: "case-study-honda-tet-2026",
    title: "Case study: Chiến dịch Honda Tết 2026 — atrium drop tại 12 mall",
    excerpt:
      "Tường Phú Group triển khai 12 atrium drop banner đồng bộ trong 36 tiếng, đạt chỉ số visibility +47% so với mùa trước.",
    category: "Case study",
    publishedAt: "2026-04-12",
    readMinutes: 7,
    thumbnail: {
      src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1100&q=80",
      alt: "Banner quảng cáo lớn treo trong toà nhà",
    },
  },
  {
    id: "a-cho-truyen-thong",
    slug: "vi-sao-cho-truyen-thong-van-hieu-qua",
    title: "Vì sao quảng cáo chợ truyền thống vẫn là kênh OOH ‘đáng đồng tiền’",
    excerpt:
      "Phân tích vùng phủ, chi phí trên 1.000 lượt xem (CPM) và hành vi mua sắm — lý do FMCG vẫn rót ngân sách lớn cho cổng chợ.",
    category: "OOH insight",
    publishedAt: "2026-03-28",
    readMinutes: 9,
    thumbnail: {
      src: "https://images.unsplash.com/photo-1531259683007-016a7b628fc3?auto=format&fit=crop&w=1100&q=80",
      alt: "Khu phố mua sắm với bảng quảng cáo lớn",
    },
  },
  {
    id: "a-thi-cong-bat-lon",
    slug: "behind-the-scenes-thi-cong-bat-200m2",
    title: "Behind the scenes: Thi công bạt khổ lớn 200m² trong 36 tiếng",
    excerpt:
      "Quy trình từ chốt thiết kế, in UV chống phai, tới ghép module và cẩu lắp ban đêm — đảm bảo timeline launching không trễ một phút.",
    category: "Behind the scenes",
    publishedAt: "2026-03-05",
    readMinutes: 6,
    thumbnail: {
      src: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1100&q=80",
      alt: "Khu vực thi công lắp đặt bạt quảng cáo",
    },
  },
];
