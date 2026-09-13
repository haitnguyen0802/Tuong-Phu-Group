/**
 * Chế độ bảo trì website.
 *
 * Khi BẬT: mọi trang (kể cả trang chủ `/`) hiển thị trang bảo trì (/index_2)
 * thay cho nội dung bình thường.
 *
 * Cách tắt để mở lại website (chọn 1 trong 2, sau đó build/deploy lại):
 * 1. Đổi DEFAULT_MAINTENANCE_MODE bên dưới thành `false`.
 * 2. Hoặc đặt biến môi trường NEXT_PUBLIC_MAINTENANCE_MODE=false
 *    (biến môi trường luôn được ưu tiên hơn giá trị mặc định trong code).
 */
const DEFAULT_MAINTENANCE_MODE = false;

export function isMaintenanceMode(): boolean {
  const env = process.env.NEXT_PUBLIC_MAINTENANCE_MODE;
  if (env === "true" || env === "1") return true;
  if (env === "false" || env === "0") return false;
  return DEFAULT_MAINTENANCE_MODE;
}
