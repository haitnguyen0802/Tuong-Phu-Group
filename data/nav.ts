import type { NavItem } from "@/types";

export const primaryNav: NavItem[] = [
  {
    label: "Dịch vụ",
    href: "/products",
    groups: [
      {
        title: "Theo loại hình",
        items: [
          { label: "Bảng LED ngoài trời", href: "/ingredients/led" },
          { label: "Billboard cao tốc", href: "/ingredients/billboard" },
          { label: "Frame thang máy", href: "/ingredients/elevator-frame" },
          { label: "Decal cửa thang máy", href: "/ingredients/elevator-wrap" },
          { label: "Banner thang cuốn", href: "/ingredients/escalator" },
          { label: "Atrium / Drop banner TTTM", href: "/ingredients/mall-atrium" },
          { label: "Cổng chợ truyền thống", href: "/ingredients/market-gate" },
          { label: "In bạt khổ lớn", href: "/ingredients/large-format" },
        ],
      },
      {
        title: "Theo vị trí",
        items: [
          { label: "Trung tâm thương mại", href: "/products?category=Trung+tâm+thương+mại" },
          { label: "Cao ốc văn phòng", href: "/products?category=Cao+ốc+văn+phòng" },
          { label: "Chợ truyền thống", href: "/products?category=Chợ+truyền+thống" },
          { label: "Cao tốc & đường lớn", href: "/products?category=Cao+tốc" },
          { label: "Sân bay & nhà ga", href: "/products?category=Sân+bay" },
        ],
      },
      {
        title: "Vị trí nổi bật",
        items: [
          {
            label: "LED ngã tư Q.1 — TP.HCM",
            href: "/products/led-q1-saigon",
            description: "Lưu lượng >120.000 lượt/ngày",
          },
          {
            label: "Frame thang máy Vincom Đồng Khởi",
            href: "/products/frame-vincom-dongkhoi",
            description: "Reach văn phòng cao cấp Q.1",
          },
          {
            label: "Atrium Vạn Hạnh Mall",
            href: "/products/atrium-van-hanh",
            description: "Drop banner 12m cho campaign Tết",
          },
        ],
      },
    ],
  },
  { label: "Ưu đãi", href: "/sale", highlight: true },
  { label: "Về Tường Phú", href: "/story" },
  { label: "Cẩm nang OOH", href: "/journal" },
  { label: "Đối tác", href: "/certifications" },
];

export const searchSuggestions = [
  "LED Sài Gòn",
  "Frame thang máy",
  "Decal thang máy",
  "Atrium TTTM",
  "Cổng chợ",
  "Billboard cao tốc",
  "In bạt khổ lớn",
];
