import type { CampaignSlide } from "@/types";

export const heroSlides: CampaignSlide[] = [
  {
    id: "lotus-mist",
    eyebrow: "Bộ sưu tập mới · 2026",
    title: "Tinh chất xịt sen Hậu Giang",
    description:
      "Chiết xuất từ sen tươi sáu giờ sau khi hái, cấp ẩm dịu nhẹ và phục hồi hàng rào da theo cách thuần khiết nhất.",
    ctaLabel: "Khám phá ngay",
    ctaHref: "/products/lotus-mist",
    backgroundClass:
      "bg-[radial-gradient(120%_80%_at_30%_20%,#fff_0%,#f6e8e2_55%,#e7c4b3_100%)]",
    accentClass: "bg-clay-300/60",
    image: {
      src: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1400&q=80",
      alt: "Chai serum hồng nhạt giữa nền hoa sen",
    },
  },
  {
    id: "coffee-scrub",
    eyebrow: "Cà phê Đắk Lắk · Limited",
    title: "Tẩy da chết cà phê Buôn Mê",
    description:
      "Bã cà phê Robusta canh tác bền vững, kết hợp dầu dừa Bến Tre cho làn da mịn mượt mà vẫn giữ lớp ẩm tự nhiên.",
    ctaLabel: "Xem chi tiết",
    ctaHref: "/products/coffee-scrub",
    backgroundClass:
      "bg-[radial-gradient(120%_80%_at_70%_30%,#f6efe2_0%,#d6c0a0_55%,#7a5a3c_100%)]",
    accentClass: "bg-ochre-300/70",
    image: {
      src: "https://images.unsplash.com/photo-1583248369069-9d91f1640fe6?auto=format&fit=crop&w=1400&q=80",
      alt: "Lọ tẩy da chết cà phê đặt cạnh hạt cà phê rang",
    },
  },
  {
    id: "refill-program",
    eyebrow: "Refill Program",
    title: "Đổi vỏ cũ — nhận ưu đãi tới 30%",
    description:
      "Mỗi vỏ chai bạn gửi về Verdara sẽ được tái chế thành sản phẩm mới. Cùng nhau giảm rác thải nhựa từ phòng tắm.",
    ctaLabel: "Tham gia chương trình",
    ctaHref: "/sustainability/refill",
    backgroundClass:
      "bg-[radial-gradient(120%_80%_at_50%_30%,#eef2ec_0%,#a9bda1_60%,#3b5732_100%)]",
    accentClass: "bg-moss-200/70",
    image: {
      src: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=1400&q=80",
      alt: "Hai chai mỹ phẩm xanh giữa lá tươi",
    },
  },
];
