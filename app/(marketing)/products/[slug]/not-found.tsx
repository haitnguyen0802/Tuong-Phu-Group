import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { buttonStyles } from "@/components/ui/Button";

export default function ProductNotFound() {
  return (
    <section className="py-20">
      <Container size="narrow" className="space-y-4 text-center">
        <p className="eyebrow text-moss-700">404</p>
        <h1 className="font-display text-4xl text-ink-900">Khong tim thay san pham</h1>
        <p className="text-ink-600">
          San pham ban tim co the da ngung kinh doanh hoac URL khong hop le.
        </p>
        <div>
          <Link href="/products" className={buttonStyles({ variant: "primary", size: "lg" })}>
            Quay lai trang san pham
          </Link>
        </div>
      </Container>
    </section>
  );
}
