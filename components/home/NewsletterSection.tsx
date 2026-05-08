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
    <section aria-label="Đăng ký nhận bản tin OOH" className="pb-24 pt-6 sm:pb-28 sm:pt-10">
      <Container size="wide">
        <div className="rounded-[2rem] border border-line-100 bg-cream-100/70 p-6 sm:p-8 lg:p-12">
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
              <label htmlFor="newsletter-name" className="text-sm font-medium text-ink-700">
                Họ tên (tuỳ chọn)
              </label>
              <input
                id="newsletter-name"
                type="text"
                autoComplete="name"
                {...register("name")}
                aria-invalid={errors.name ? "true" : "false"}
                aria-describedby={errors.name ? "newsletter-name-error" : undefined}
                className="h-12 w-full rounded-full border border-line-200 bg-cream-50 px-5 text-sm text-ink-900 outline-none transition focus:border-moss-700 focus:ring-2 focus:ring-moss-700/25"
                placeholder="Họ tên của bạn"
              />
              {errors.name ? (
                <p id="newsletter-name-error" className="text-sm text-clay-600">
                  {errors.name.message}
                </p>
              ) : null}
            </div>

            <div className="space-y-2">
              <label htmlFor="newsletter-email" className="text-sm font-medium text-ink-700">
                Email
              </label>
              <div className="relative">
                <Mail
                  className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400"
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
                  className="h-12 w-full rounded-full border border-line-200 bg-cream-50 pl-11 pr-5 text-sm text-ink-900 outline-none transition focus:border-moss-700 focus:ring-2 focus:ring-moss-700/25"
                  placeholder="ban@congty.com"
                />
              </div>
              {errors.email ? (
                <p id="newsletter-email-error" className="text-sm text-clay-600">
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

          <p aria-live="polite" className="mx-auto mt-4 max-w-3xl text-sm text-moss-700">
            {submitMessage}
          </p>
        </div>
      </Container>
    </section>
  );
}
