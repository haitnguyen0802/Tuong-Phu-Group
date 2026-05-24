import Link from "next/link";
import { buttonStyles } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <section className="py-24 sm:py-28">
      <Container size="narrow" className="space-y-5 text-center">
        <p className="eyebrow text-moss-700">404</p>
        <h1 className="font-display text-ink-900 text-4xl sm:text-5xl">
          Không tìm thấy trang bạn yêu cầu
        </h1>
        <p className="text-ink-600 text-sm leading-relaxed sm:text-base">
          Liên kết có thể đã thay đổi hoặc nội dung không còn tồn tại. Bạn có thể quay lại trang chủ
          để xem nội dung hiện có.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link href="/" className={buttonStyles({ variant: "primary", size: "md" })}>
            Về trang chủ
          </Link>
        </div>
      </Container>
    </section>
  );
}
