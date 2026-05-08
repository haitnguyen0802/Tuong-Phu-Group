import type { CampaignSlide } from "@/types";

export const heroSlides: CampaignSlide[] = [
  {
    id: "led-saigon",
    eyebrow: "Bộ sưu tập vị trí 2026",
    title: "LED ngã tư trung tâm Sài Gòn — phủ sóng 24/7",
    description:
      "Mạng lưới bảng LED tại các giao lộ vàng Quận 1, Quận 3 và Phú Nhuận với lưu lượng trung bình hơn 120.000 lượt nhìn mỗi ngày. Phù hợp campaign launching và TVC ngắn.",
    ctaLabel: "Xem vị trí LED",
    ctaHref: "/products/led-q1-saigon",
    backgroundClass:
      "bg-[radial-gradient(120%_80%_at_30%_20%,#fff_0%,#f6e8e2_55%,#e7c4b3_100%)]",
    accentClass: "bg-clay-300/60",
    image: {
      src: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?auto=format&fit=crop&w=1400&q=80",
      alt: "Khu vực LED quảng cáo ngoài trời ban đêm",
    },
  },
  {
    id: "elevator-network",
    eyebrow: "Mạng lưới thang máy & TTTM",
    title: "Frame & decal thang máy — 2.500+ vị trí cao cấp",
    description:
      "Tiếp cận tệp khách hàng văn phòng, cư dân hạng A và shopper TTTM tại Vincom, AEON, Vạn Hạnh, Crescent Mall — định dạng frame, decal cửa thang và LCD trong cabin.",
    ctaLabel: "Xem mạng lưới thang máy",
    ctaHref: "/products/frame-vincom-dongkhoi",
    backgroundClass:
      "bg-[radial-gradient(120%_80%_at_70%_30%,#f6efe2_0%,#d6c0a0_55%,#7a5a3c_100%)]",
    accentClass: "bg-ochre-300/70",
    image: {
      src: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1400&q=80",
      alt: "Khu trung tâm thương mại với nhiều quảng cáo neon",
    },
  },
  {
    id: "market-network",
    eyebrow: "Quảng cáo chợ truyền thống",
    title: "Cổng chợ truyền thống — phủ 64 tỉnh thành",
    description:
      "Định dạng OOH chi phí tối ưu, tiếp cận 38 triệu người tiêu dùng mua sắm hàng ngày tại các chợ đầu mối, chợ huyện. Hiệu quả mạnh cho ngành FMCG, sữa, dược phẩm.",
    ctaLabel: "Xem mạng lưới chợ",
    ctaHref: "/products/market-gate-do-luong",
    backgroundClass:
      "bg-[radial-gradient(120%_80%_at_50%_30%,#eef2ec_0%,#a9bda1_60%,#3b5732_100%)]",
    accentClass: "bg-moss-200/70",
    image: {
      src: "https://images.unsplash.com/photo-1517816743773-6e0fd518b4a6?auto=format&fit=crop&w=1400&q=80",
      alt: "Bảng quảng cáo lớn tại khu phố sầm uất",
    },
  },
];
