import type { Product } from "@/types";

/**
 * Mỗi "Product" ở đây là một gói vị trí quảng cáo OOH.
 * - price: giá tham khảo / tháng (VND)
 * - comparePrice: giá list trước ưu đãi
 * - stock: số slot/đầu vị trí còn trống trong tháng
 * - category: nhóm vị trí
 * - frontImage / backImage: ảnh thực tế / ảnh phối cảnh / ban đêm
 */
export const bestSellers: Product[] = [
  {
    id: "v-led-q1-saigon",
    slug: "led-q1-saigon",
    name: "LED ngã tư Q.1 — Sài Gòn",
    shortDescription: "Bảng LED P6 24m² tại giao lộ vàng, lưu lượng >120.000 lượt/ngày.",
    category: "Cao tốc & đường lớn",
    price: 185000000,
    comparePrice: 220000000,
    stock: 4,
    badges: ["bestseller", "limited"],
    frontImage: {
      src: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?auto=format&fit=crop&w=900&q=80",
      alt: "LED quảng cáo ngoài trời tại trung tâm thành phố",
    },
    backImage: {
      src: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=900&q=80",
      alt: "Khu vực giao lộ với nhiều bảng quảng cáo ban đêm",
    },
  },
  {
    id: "v-frame-vincom-dongkhoi",
    slug: "frame-vincom-dongkhoi",
    name: "Frame thang máy Vincom Đồng Khởi",
    shortDescription: "Frame A3 trong cabin thang máy, reach nhân viên văn phòng cao cấp Q.1.",
    category: "Cao ốc văn phòng",
    price: 28500000,
    stock: 18,
    badges: ["bestseller"],
    frontImage: {
      src: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=900&q=80",
      alt: "Bên trong toà nhà văn phòng hiện đại",
    },
    backImage: {
      src: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=80",
      alt: "Sảnh thang máy cao ốc văn phòng",
    },
  },
  {
    id: "v-elevator-wrap-vanhanh",
    slug: "elevator-wrap-van-hanh",
    name: "Decal cửa thang máy Vạn Hạnh Mall",
    shortDescription: "Wrap full cửa thang máy 2 cánh tại TTTM Q.10, ấn tượng mạnh khi đóng cửa.",
    category: "Trung tâm thương mại",
    price: 42000000,
    comparePrice: 48000000,
    stock: 6,
    badges: ["new", "low-stock"],
    frontImage: {
      src: "https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?auto=format&fit=crop&w=900&q=80",
      alt: "Trung tâm thương mại đông khách",
    },
    backImage: {
      src: "https://images.unsplash.com/photo-1481437156560-3205f6a55735?auto=format&fit=crop&w=900&q=80",
      alt: "Sảnh trung tâm thương mại buổi tối",
    },
  },
  {
    id: "v-escalator-crescent",
    slug: "escalator-crescent-mall",
    name: "Banner thang cuốn Crescent Mall",
    shortDescription: "Branding hai bên thang cuốn nối tầng, độ phủ liên tục từ tầng 1 lên tầng 4.",
    category: "Trung tâm thương mại",
    price: 36000000,
    stock: 12,
    badges: ["new"],
    frontImage: {
      src: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=900&q=80",
      alt: "Khu vực TTTM với nhiều bảng quảng cáo",
    },
    backImage: {
      src: "https://images.unsplash.com/photo-1551038247-3d9af20df552?auto=format&fit=crop&w=900&q=80",
      alt: "Phố quảng cáo về đêm",
    },
  },
  {
    id: "v-market-gate-do-luong",
    slug: "market-gate-do-luong",
    name: "Cổng chợ Đô Lương — Nghệ An",
    shortDescription: "Banner cổng chợ huyện, tiếp cận hơn 18.000 lượt khách mua sắm/ngày.",
    category: "Chợ truyền thống",
    price: 14500000,
    stock: 9,
    badges: ["bestseller", "low-stock"],
    frontImage: {
      src: "https://images.unsplash.com/photo-1531259683007-016a7b628fc3?auto=format&fit=crop&w=900&q=80",
      alt: "Bảng quảng cáo lớn ban ngày tại trung tâm phố",
    },
    backImage: {
      src: "https://images.unsplash.com/photo-1485081669829-bacb8c7bb1f3?auto=format&fit=crop&w=900&q=80",
      alt: "Khu phố sầm uất với nhiều bảng hiệu",
    },
  },
  {
    id: "v-mall-atrium-honda",
    slug: "atrium-van-hanh",
    name: "Atrium drop Vạn Hạnh Mall",
    shortDescription: "Drop banner 12m treo giếng trời atrium, dominant visual trong campaign Tết.",
    category: "Trung tâm thương mại",
    price: 95000000,
    comparePrice: 110000000,
    stock: 2,
    badges: ["limited", "low-stock"],
    frontImage: {
      src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=900&q=80",
      alt: "Banner quảng cáo lớn treo trong toà nhà",
    },
    backImage: {
      src: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80",
      alt: "Hệ thống truyền thông marketing flatlay",
    },
  },
];
