import Link from "next/link";
import { buttonStyles } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <section className="py-24 sm:py-28">
      <Container size="narrow" className="space-y-5 text-center">
        <p className="eyebrow text-moss-700">404</p>
        <h1 className="font-display text-4xl text-ink-900 sm:text-5xl">
          Không tìm thấy trang bạn yêu cầu
        </h1>
        <p className="text-sm leading-relaxed text-ink-600 sm:text-base">
          Liên kết có thể đã thay đổi hoặc nội dung không còn tồn tại. Bạn có thể quay
          lại trang chủ hoặc khám phá danh mục vị trí OOH của Tường Phú Group.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className={buttonStyles({ variant: "primary", size: "md" })}
          >
            Về trang chủ
          </Link>
          <Link
            href="/products"
            className={buttonStyles({ variant: "outline", size: "md" })}
          >
            Xem vị trí OOH
          </Link>
        </div>
      </Container>
    </section>
  );
}
