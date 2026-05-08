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
            <p className="eyebrow text-clay-600">Unexpected error</p>
            <h1 className="font-display text-4xl text-ink-900 sm:text-5xl">Da co loi xay ra</h1>
            <p className="text-sm leading-relaxed text-ink-600 sm:text-base">
              Chung toi da ghi nhan su co. Ban thu tai lai de tiep tuc trai nghiem.
            </p>
            <button type="button" onClick={reset} className={buttonStyles({ variant: "primary", size: "md" })}>
              Thu lai
            </button>
          </Container>
        </section>
      </body>
    </html>
  );
}
