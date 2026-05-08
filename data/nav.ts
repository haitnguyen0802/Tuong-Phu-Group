import type { NavItem } from "@/types";

export const primaryNav: NavItem[] = [
  {
    label: "Sản phẩm",
    href: "/products",
    groups: [
      {
        title: "Theo loại da & nhu cầu",
        items: [
          { label: "Chăm sóc da mặt", href: "/products/skincare" },
          { label: "Tắm & dưỡng thể", href: "/products/body" },
          { label: "Chăm sóc tóc", href: "/products/hair" },
          { label: "Dưỡng môi", href: "/products/lip" },
          { label: "Combo & bộ quà", href: "/products/sets" },
        ],
      },
      {
        title: "Theo nguyên liệu",
        items: [
          { label: "Sen Hậu Giang", href: "/ingredients/lotus" },
          { label: "Cà phê Đắk Lắk", href: "/ingredients/coffee" },
          { label: "Bí đao Long An", href: "/ingredients/winter-melon" },
          { label: "Nghệ Hưng Yên", href: "/ingredients/turmeric" },
          { label: "Vỏ bưởi Diễn", href: "/ingredients/pomelo" },
        ],
      },
      {
        title: "Bán chạy",
        items: [
          {
            label: "Tinh chất xịt sen Hậu Giang",
            href: "/products/lotus-mist",
            description: "Cấp ẩm tức thì, làm dịu da",
          },
          {
            label: "Sữa rửa mặt bí đao",
            href: "/products/winter-melon-cleanser",
            description: "Sạch sâu, không khô căng",
          },
          {
            label: "Gel tắm đường thốt nốt",
            href: "/products/palm-sugar-shower",
            description: "Hương ngọt ấm, dưỡng mềm",
          },
        ],
      },
    ],
  },
  { label: "Khuyến mãi", href: "/sale", highlight: true },
  { label: "Câu chuyện Verdara", href: "/story" },
  { label: "Bài viết", href: "/journal" },
  { label: "Chứng nhận", href: "/certifications" },
];

export const searchSuggestions = [
  "Sữa rửa mặt",
  "Nước tẩy trang",
  "Gel tắm",
  "Tinh chất sen",
  "Dưỡng môi",
  "Combo skincare",
];
