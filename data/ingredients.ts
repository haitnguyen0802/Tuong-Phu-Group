import type { Ingredient } from "@/types";

export const ingredients: Ingredient[] = [
  {
    id: "lotus",
    name: "Sen Hậu Giang",
    region: "Đồng bằng sông Cửu Long",
    description:
      "Sen được hái vào sáng sớm, chiết xuất trong vòng 6 giờ để giữ trọn polyphenol — hoạt chất giúp làm dịu và phục hồi da.",
    image: {
      src: "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?auto=format&fit=crop&w=1200&q=80",
      alt: "Đầm sen Hậu Giang vào sáng sớm",
    },
    toneClass: "from-clay-300/40 via-cream-100 to-cream-50",
  },
  {
    id: "winter-melon",
    name: "Bí đao Long An",
    region: "Long An",
    description:
      "Bí đao trồng theo chuẩn hữu cơ, ép lấy nước trong vòng 24 giờ — kiểm soát dầu nhờn và làm dịu da nhạy cảm.",
    image: {
      src: "https://images.unsplash.com/photo-1599751449128-eb7249c3d6b1?auto=format&fit=crop&w=1200&q=80",
      alt: "Trái bí đao tươi vừa hái",
    },
    toneClass: "from-moss-200/50 via-cream-50 to-moss-100",
  },
  {
    id: "coffee",
    name: "Cà phê Đắk Lắk",
    region: "Tây Nguyên",
    description:
      "Bã cà phê Robusta hợp tác với nông trại canh tác bền vững, tẩy da chết dịu nhẹ và thúc đẩy tuần hoàn vi mạch.",
    image: {
      src: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=80",
      alt: "Hạt cà phê rang nâu sẫm",
    },
    toneClass: "from-ochre-300/50 via-cream-100 to-clay-300/30",
  },
  {
    id: "turmeric",
    name: "Nghệ Hưng Yên",
    region: "Đồng bằng sông Hồng",
    description:
      "Curcumin tự nhiên được chiết xuất ở nhiệt độ thấp, giúp mờ thâm sau mụn và đều màu da theo cách an toàn.",
    image: {
      src: "https://images.unsplash.com/photo-1593326969770-c4d4ff84c95e?auto=format&fit=crop&w=1200&q=80",
      alt: "Bột nghệ vàng và củ nghệ tươi",
    },
    toneClass: "from-ochre-500/40 via-cream-100 to-cream-50",
  },
  {
    id: "pomelo",
    name: "Vỏ bưởi Diễn",
    region: "Hà Nội",
    description:
      "Tinh dầu vỏ bưởi ép lạnh, kích thích nang tóc và làm dịu da đầu — một di sản dưỡng tóc của bà ngoại.",
    image: {
      src: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=1200&q=80",
      alt: "Quả bưởi Diễn cắt đôi",
    },
    toneClass: "from-moss-100 via-cream-50 to-ochre-300/30",
  },
];
