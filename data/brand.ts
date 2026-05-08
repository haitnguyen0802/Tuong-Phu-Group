import type { Brand } from "@/types";

export const brand: Brand = {
  name: "Verdara",
  tagline: "Botanical beauty, rooted in Vietnam",
  description:
    "Verdara là thương hiệu mỹ phẩm thuần chay, lấy cảm hứng từ những vùng nguyên liệu đặc hữu của Việt Nam: sen Hậu Giang, cà phê Đắk Lắk, vỏ bưởi Diễn, nghệ Hưng Yên.",
  socials: [
    { label: "Instagram", href: "https://instagram.com", icon: "instagram" },
    { label: "Facebook", href: "https://facebook.com", icon: "facebook" },
    { label: "TikTok", href: "https://tiktok.com", icon: "tiktok" },
    { label: "YouTube", href: "https://youtube.com", icon: "youtube" },
  ],
  contact: {
    hotline: "1900 6868",
    email: "hello@verdara.example",
    address: "Tầng 12, Toà nhà Sunwah, Quận 1, TP. Hồ Chí Minh",
  },
};

export const announcements = [
  "Miễn phí vận chuyển toàn quốc cho đơn hàng từ 299.000 đ",
  "Tặng full-size dưỡng môi sen khi mua combo từ 599.000 đ",
  "Đăng ký thành viên — nhận ngay voucher 10% cho đơn đầu tiên",
];
