import type { Metadata } from "next";
import { HomePageContent } from "@/components/home/HomePageContent";
import { getHomepageData } from "@/lib/cms/get-homepage-data";
import { isMaintenanceMode } from "@/lib/maintenance";

export const metadata: Metadata = {
  title: "Trang chủ",
  description:
    "Tường Phú — Giải pháp quảng cáo OOH toàn diện: bảng LED, billboard cao tốc, frame và decal thang máy, banner thang cuộn, atrium TTTM, cửa chớp và in bảng lớn trên toàn quốc.",
};

export default async function HomePage() {
  // Chế độ bảo trì: root layout đã hiển thị trang bảo trì, bỏ qua fetch dữ liệu.
  if (isMaintenanceMode()) {
    return null;
  }

  const homepageData = await getHomepageData();

  return <HomePageContent initialData={homepageData} />;
}
