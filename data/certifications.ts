import type { Certification } from "@/types";

/**
 * Logos are inline SVG strings — kept hand-drawn (not real organisations) to
 * avoid copying real trademarks. Replace `logo` with real assets when
 * partnerships are confirmed.
 */
export const certifications: Certification[] = [
  {
    id: "vegan-society",
    name: "Vegan Society",
    organization: "Hiệp hội thuần chay quốc tế",
    description:
      "Toàn bộ công thức Verdara không chứa thành phần động vật và không thử nghiệm trên động vật.",
    logo: "/images/certifications/vegan.svg",
  },
  {
    id: "cruelty-free",
    name: "Cruelty Free",
    organization: "Chương trình bảo vệ động vật toàn cầu",
    description:
      "Verdara cam kết không thử nghiệm trên động vật ở mọi giai đoạn nghiên cứu và sản xuất.",
    logo: "/images/certifications/cruelty-free.svg",
  },
  {
    id: "iso-22716",
    name: "ISO 22716",
    organization: "Tiêu chuẩn GMP mỹ phẩm",
    description:
      "Nhà máy đạt chuẩn ISO 22716 về thực hành sản xuất tốt cho mỹ phẩm.",
    logo: "/images/certifications/iso.svg",
  },
  {
    id: "eco-pack",
    name: "EcoPack",
    organization: "Liên minh bao bì bền vững",
    description:
      "Bao bì sử dụng tối thiểu 60% nhựa tái chế và mực in gốc đậu nành.",
    logo: "/images/certifications/eco.svg",
  },
];
