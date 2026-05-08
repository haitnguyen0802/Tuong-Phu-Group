import type { Ingredient } from "@/types";

/**
 * "Ingredient" trong dự án này được tái sử dụng làm "Loại hình quảng cáo OOH".
 * Giữ nguyên kiểu dữ liệu để không phá kiến trúc đã build.
 */
export const ingredients: Ingredient[] = [
  {
    id: "led",
    name: "Bảng LED ngoài trời",
    region: "Phủ sóng giao lộ TP.HCM, Hà Nội, Đà Nẵng",
    description:
      "LED P5/P6/P10 độ sáng cao, đặt tại các giao lộ vàng và toà nhà ốp mặt tiền. Cho phép TVC ngắn 6–15s, hiệu quả mạnh cho campaign launching và branding.",
    image: {
      src: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1200&q=80",
      alt: "Bảng LED ngoài trời ban đêm tại khu trung tâm",
    },
    toneClass: "from-clay-300/40 via-cream-100 to-cream-50",
  },
  {
    id: "elevator-frame",
    name: "Frame thang máy",
    region: "Cao ốc văn phòng & chung cư hạng A",
    description:
      "Frame A3/A4 đặt trong cabin thang máy. Tiếp cận lặp lại nhân viên văn phòng và cư dân hạng A — phù hợp ngân hàng, F&B cao cấp, dược phẩm.",
    image: {
      src: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
      alt: "Khu vực sảnh thang máy cao ốc văn phòng",
    },
    toneClass: "from-moss-200/50 via-cream-50 to-moss-100",
  },
  {
    id: "elevator-wrap",
    name: "Decal cửa thang máy",
    region: "Trung tâm thương mại trọng điểm",
    description:
      "Wrap toàn bộ cửa thang máy bằng decal in UV. Tạo hiệu ứng visual mạnh khi cửa đóng — đặc biệt hiệu quả cho launching sản phẩm điện máy, ô tô, mỹ phẩm.",
    image: {
      src: "https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?auto=format&fit=crop&w=1200&q=80",
      alt: "Khu vực sảnh thang máy trung tâm thương mại",
    },
    toneClass: "from-ochre-300/50 via-cream-100 to-clay-300/30",
  },
  {
    id: "escalator",
    name: "Banner thang cuốn",
    region: "Crescent, Vạn Hạnh, Vincom, AEON",
    description:
      "Branding dán dọc hai bên thang cuốn — kéo dài độ phủ thị giác trong toàn bộ thời gian shopper di chuyển giữa các tầng. Phù hợp campaign khuyến mãi & seasonal.",
    image: {
      src: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1200&q=80",
      alt: "Khu vực thang cuốn trung tâm thương mại",
    },
    toneClass: "from-ochre-500/40 via-cream-100 to-cream-50",
  },
  {
    id: "market-gate",
    name: "Cổng chợ truyền thống",
    region: "64 tỉnh thành — chợ đầu mối, chợ huyện",
    description:
      "Banner cổng chợ kích thước lớn, chi phí tối ưu, tiếp cận trực tiếp người tiêu dùng quyết định mua sắm hàng ngày. Hiệu quả cho FMCG, sữa, gia vị, nông sản.",
    image: {
      src: "https://images.unsplash.com/photo-1531259683007-016a7b628fc3?auto=format&fit=crop&w=1200&q=80",
      alt: "Khu phố mua sắm sầm uất với bảng quảng cáo",
    },
    toneClass: "from-moss-100 via-cream-50 to-ochre-300/30",
  },
];
