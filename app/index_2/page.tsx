import type { Metadata } from "next";
import { MaintenancePage } from "@/components/maintenance/MaintenancePage";

export const metadata: Metadata = {
  title: "Website đang bảo trì",
  description:
    "Xưởng May Sài Gòn đang nâng cấp hệ thống. Vui lòng liên hệ hotline hoặc email trong thời gian bảo trì.",
  robots: {
    index: false,
    follow: false,
  },
};

/**
 * Trang bảo trì (index_2). Luôn truy cập được tại /index_2 để xem trước.
 * Khi bật chế độ bảo trì trong lib/maintenance.ts, toàn bộ website sẽ
 * hiển thị trang này làm trang mặc định.
 */
export default function Index2Page() {
  return <MaintenancePage />;
}
