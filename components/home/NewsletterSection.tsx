"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Button } from "@/components/ui/Button";

const newsletterSchema = z.object({
  name: z.string().trim().max(60).optional().or(z.literal("")),
  email: z.email("Vui lòng nhập email hợp lệ."),
});

type NewsletterValues = z.infer<typeof newsletterSchema>;

export function NewsletterSection() {
  const [submitMessage, setSubmitMessage] = React.useState<string>("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<NewsletterValues>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  async function onSubmit(values: NewsletterValues) {
    await new Promise((resolve) => window.setTimeout(resolve, 450));
    reset();
    setSubmitMessage(
      values.name
        ? `Cảm ơn ${values.name}. Chúng tôi sẽ gửi bản tin OOH định kỳ tới email của bạn.`
        : "Cảm ơn bạn đã đăng ký. Chúng tôi sẽ gửi bản tin OOH định kỳ tới email của bạn.",
    );
  }

  return (
    <section
      id="newsletter"
      aria-label="Đăng ký nhận bản tin OOH"
      className="pt-6 pb-24 sm:pt-10 sm:pb-28"
    >
      <Container size="wide">
        <div className="border-line-100 bg-cream-100/70 rounded-[2rem] border p-6 sm:p-8 lg:p-12">
          <SectionTitle
            align="center"
            eyebrow="Bản tin OOH"
            title="Nhận báo giá nhanh & insight thị trường quảng cáo ngoài trời."
            lead="Mỗi tháng, Tường Phú Group gửi bản tin gọn nhẹ về vị trí mới mở bán, ưu đãi combo và phân tích xu hướng OOH tại Việt Nam."
            className="mx-auto"
          />

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mx-auto mt-8 grid max-w-3xl gap-4 sm:grid-cols-2"
            noValidate
          >
            <div className="space-y-2">
              <label htmlFor="newsletter-name" className="text-ink-700 text-sm font-medium">
                Họ tên (tuỳ chọn)
              </label>
              <input
                id="newsletter-name"
                type="text"
                autoComplete="name"
                {...register("name")}
                aria-invalid={errors.name ? "true" : "false"}
                aria-describedby={errors.name ? "newsletter-name-error" : undefined}
                className="border-line-200 bg-cream-50 text-ink-900 focus:border-moss-700 focus:ring-moss-700/25 h-12 w-full rounded-full border px-5 text-sm transition outline-none focus:ring-2"
                placeholder="Họ tên của bạn"
              />
              {errors.name ? (
                <p id="newsletter-name-error" className="text-clay-600 text-sm">
                  {errors.name.message}
                </p>
              ) : null}
            </div>

            <div className="space-y-2">
              <label htmlFor="newsletter-email" className="text-ink-700 text-sm font-medium">
                Email
              </label>
              <div className="relative">
                <Mail
                  className="text-ink-400 pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2"
                  aria-hidden
                  strokeWidth={1.8}
                />
                <input
                  id="newsletter-email"
                  type="email"
                  autoComplete="email"
                  {...register("email")}
                  aria-invalid={errors.email ? "true" : "false"}
                  aria-describedby={errors.email ? "newsletter-email-error" : undefined}
                  className="border-line-200 bg-cream-50 text-ink-900 focus:border-moss-700 focus:ring-moss-700/25 h-12 w-full rounded-full border pr-5 pl-11 text-sm transition outline-none focus:ring-2"
                  placeholder="ban@congty.com"
                />
              </div>
              {errors.email ? (
                <p id="newsletter-email-error" className="text-clay-600 text-sm">
                  {errors.email.message}
                </p>
              ) : null}
            </div>

            <div className="sm:col-span-2">
              <Button
                type="submit"
                size="lg"
                className="w-full sm:w-auto"
                disabled={isSubmitting}
                aria-label="Đăng ký nhận bản tin OOH Tường Phú Group"
              >
                {isSubmitting ? "Đang gửi..." : "Đăng ký nhận bản tin"}
              </Button>
            </div>
          </form>

          <p aria-live="polite" className="text-moss-700 mx-auto mt-4 max-w-3xl text-sm">
            {submitMessage}
          </p>
        </div>
      </Container>
    </section>
  );
}
