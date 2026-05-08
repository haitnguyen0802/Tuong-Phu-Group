import type { Certification } from "@/types";

/**
 * Trong rebrand này, "Certification" được hiểu là Đối tác chiến lược / chứng nhận
 * năng lực của Tường Phú Group trong lĩnh vực OOH.
 */
export const certifications: Certification[] = [
  {
    id: "vma",
    name: "Vietnam Marketing Association",
    organization: "Hội thành viên VMA",
    description:
      "Thành viên chính thức của Hiệp hội Marketing Việt Nam, tham gia hội đồng tiêu chuẩn đo lường OOH 2025.",
    logo: "/images/certifications/vma.svg",
  },
  {
    id: "vincom-partner",
    name: "Vincom Retail Partner",
    organization: "Đối tác chiến lược OOH",
    description:
      "Đối tác triển khai chính thức quảng cáo trong hệ thống Vincom Center, Vincom Plaza và Vincom Mega Mall trên toàn quốc.",
    logo: "/images/certifications/vincom.svg",
  },
  {
    id: "aeon-partner",
    name: "AEON Mall Vietnam",
    organization: "Đối tác media OOH",
    description:
      "Đối tác cung cấp giải pháp atrium drop, decal thang máy và banner thang cuốn tại 6 AEON Mall trên toàn quốc.",
    logo: "/images/certifications/aeon.svg",
  },
  {
    id: "iso-9001",
    name: "ISO 9001:2015",
    organization: "Tiêu chuẩn quản lý chất lượng",
    description:
      "Hệ thống quản lý dự án và quy trình thi công OOH đạt chuẩn ISO 9001:2015 — đảm bảo timeline, chất lượng và an toàn lao động.",
    logo: "/images/certifications/iso.svg",
  },
];
