"use client";

import { useEffect } from "react";
import { buttonStyles } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function GlobalError({ error, reset }: Props) {
  useEffect(() => {
    console.error("[global-error]", {
      message: error.message,
      digest: error.digest,
    });
  }, [error]);

  return (
    <html lang="vi">
      <body className="min-h-screen bg-background text-foreground antialiased">
        <section className="py-24 sm:py-28">
          <Container size="narrow" className="space-y-5 text-center">
            <p className="eyebrow text-clay-600">Đã xảy ra lỗi</p>
            <h1 className="font-display text-4xl text-ink-900 sm:text-5xl">
              Hệ thống đang gặp sự cố
            </h1>
            <p className="text-sm leading-relaxed text-ink-600 sm:text-base">
              Tường Phú Group đã ghi nhận lỗi này. Bạn vui lòng thử lại trong giây lát
              hoặc liên hệ hotline 1900 8688 nếu vẫn không truy cập được.
            </p>
            <button
              type="button"
              onClick={reset}
              className={buttonStyles({ variant: "primary", size: "md" })}
            >
              Thử lại
            </button>
          </Container>
        </section>
      </body>
    </html>
  );
}
