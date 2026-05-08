import type { SocialPost } from "@/types";

/**
 * Mock Instagram-style social proof.
 * Images sourced from Unsplash. Captions/intent are crafted for Verdara — they
 * do not mirror any external brand's posts.
 */
export const socialPosts: SocialPost[] = [
  {
    id: "sp-1",
    href: "https://instagram.com/verdara",
    image: {
      src: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=900&q=80",
      alt: "Bộ skincare đặt cạnh ly nước chanh trên bàn gỗ",
    },
    caption: "Routine sáng nhẹ tênh cho ngày làm việc dài.",
    likes: 1284,
    comments: 38,
  },
  {
    id: "sp-2",
    href: "https://instagram.com/verdara",
    image: {
      src: "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?auto=format&fit=crop&w=900&q=80",
      alt: "Đầm sen Hậu Giang vào sáng sớm",
    },
    caption: "Đi cùng đội thu hái sen vào lúc 4 giờ sáng.",
    likes: 2410,
    comments: 92,
  },
  {
    id: "sp-3",
    href: "https://instagram.com/verdara",
    image: {
      src: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80",
      alt: "Hạt cà phê rang nâu sẫm",
    },
    caption: "Bã cà phê Đắk Lắk được tái chế thành tẩy da chết.",
    likes: 986,
    comments: 24,
  },
  {
    id: "sp-4",
    href: "https://instagram.com/verdara",
    image: {
      src: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=900&q=80",
      alt: "Chai mỹ phẩm tái chế giữa lá xanh",
    },
    caption: "Bao bì 60% nhựa tái chế, mực in từ đậu nành.",
    likes: 1572,
    comments: 47,
  },
  {
    id: "sp-5",
    href: "https://instagram.com/verdara",
    image: {
      src: "https://images.unsplash.com/photo-1593326969770-c4d4ff84c95e?auto=format&fit=crop&w=900&q=80",
      alt: "Bột nghệ vàng và củ nghệ tươi",
    },
    caption: "Curcumin chiết lạnh — dịu nhẹ cho da nhạy cảm.",
    likes: 1108,
    comments: 31,
  },
  {
    id: "sp-6",
    href: "https://instagram.com/verdara",
    image: {
      src: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=900&q=80",
      alt: "Quả bưởi cắt đôi cạnh chai dầu gội",
    },
    caption: "Vỏ bưởi Diễn — di sản dưỡng tóc của bà ngoại.",
    likes: 1843,
    comments: 64,
  },
];

export const socialHandle = "@verdara.vn";
export const socialProfileHref = "https://instagram.com/verdara";
