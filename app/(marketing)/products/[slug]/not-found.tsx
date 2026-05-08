import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { buttonStyles } from "@/components/ui/Button";

export default function ProductNotFound() {
  return (
    <section className="py-20">
      <Container size="narrow" className="space-y-4 text-center">
        <p className="eyebrow text-moss-700">404</p>
        <h1 className="font-display text-4xl text-ink-900">Không tìm thấy vị trí OOH</h1>
        <p className="text-ink-600">
          Vị trí bạn tìm có thể đã được book hết hoặc URL không hợp lệ. Vui lòng quay lại danh
          mục để chọn vị trí khác hoặc liên hệ hotline để được tư vấn nhanh.
        </p>
        <div>
          <Link
            href="/products"
            className={buttonStyles({ variant: "primary", size: "lg" })}
          >
            Quay lại danh mục vị trí
          </Link>
        </div>
      </Container>
    </section>
  );
}
