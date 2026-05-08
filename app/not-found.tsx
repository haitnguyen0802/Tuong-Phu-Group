import Link from "next/link";
import { buttonStyles } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <section className="py-24 sm:py-28">
      <Container size="narrow" className="space-y-5 text-center">
        <p className="eyebrow text-moss-700">404</p>
        <h1 className="font-display text-4xl text-ink-900 sm:text-5xl">Khong tim thay trang ban yeu cau</h1>
        <p className="text-sm leading-relaxed text-ink-600 sm:text-base">
          Link co the da thay doi hoac noi dung khong con ton tai. Ban co the quay lai trang chu hoac tiep tuc
          kham pha san pham.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link href="/" className={buttonStyles({ variant: "primary", size: "md" })}>
            Ve trang chu
          </Link>
          <Link href="/products" className={buttonStyles({ variant: "outline", size: "md" })}>
            Xem san pham
          </Link>
        </div>
      </Container>
    </section>
  );
}
