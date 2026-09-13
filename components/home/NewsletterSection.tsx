"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { buildPublicApiUrl } from "@/lib/api";
import type { SectionHeading } from "@/types";

const newsletterSchema = z.object({
  name: z.string().trim().max(60).optional().or(z.literal("")),
  email: z.email("Vui lòng nhập email hợp lệ."),
});

type NewsletterValues = z.infer<typeof newsletterSchema>;

type NewsletterSectionProps = {
  heading?: SectionHeading;
};

export function NewsletterSection({ heading }: NewsletterSectionProps) {
  const [submitMessage, setSubmitMessage] = React.useState<string>("");
  const [submitError, setSubmitError] = React.useState<string>("");

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
    setSubmitError("");

    const response = await fetch(buildPublicApiUrl("/newsletter"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: values.name || undefined,
        email: values.email,
        website: "",
      }),
    });

    const payload = (await response.json().catch(() => null)) as
      | { message?: string }
      | { error?: string }
      | null;

    if (!response.ok) {
      const message =
        (payload && "message" in payload && payload.message) ||
        (payload && "error" in payload && payload.error) ||
        "Không thể gửi đăng ký, vui lòng thử lại.";
      setSubmitError(message);
      return;
    }

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
          <SectionTitle heading={heading} className="mx-auto" />

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mx-auto mt-8 flex w-full max-w-4xl flex-col gap-4 md:grid md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto] md:grid-rows-[auto_auto_auto] md:gap-x-4 md:gap-y-2"
            noValidate
          >
            <input type="text" tabIndex={-1} autoComplete="off" name="website" className="hidden" aria-hidden />

            <div className="flex flex-col gap-2 md:contents">
              <label
                htmlFor="newsletter-name"
                className="text-ink-700 block text-sm font-medium leading-none md:col-start-1 md:row-start-1"
              >
                Họ tên (tuỳ chọn)
              </label>
              <input
                id="newsletter-name"
                type="text"
                autoComplete="name"
                {...register("name")}
                aria-invalid={errors.name ? "true" : "false"}
                aria-describedby={errors.name ? "newsletter-name-error" : undefined}
                className={cn(
                  "border-line-200 bg-cream-50 text-ink-900 focus:border-moss-700 focus:ring-moss-700/25 h-12 w-full rounded-full border px-5 text-sm transition outline-none focus:ring-2 md:col-start-1 md:row-start-2",
                  errors.name &&
                    "border-clay-500 bg-clay-300/10 focus:border-clay-500 focus:ring-clay-500/20",
                )}
                placeholder="Họ tên của bạn"
              />
              <p
                id="newsletter-name-error"
                className="text-clay-600 min-h-5 text-sm md:col-start-1 md:row-start-3"
                aria-live="polite"
              >
                {errors.name?.message ?? "\u00a0"}
              </p>
            </div>

            <div className="flex flex-col gap-2 md:contents">
              <label
                htmlFor="newsletter-email"
                className="text-ink-700 block text-sm font-medium leading-none md:col-start-2 md:row-start-1"
              >
                Email
              </label>
              <div className="relative md:col-start-2 md:row-start-2">
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
                  className={cn(
                    "border-line-200 bg-cream-50 text-ink-900 focus:border-moss-700 focus:ring-moss-700/25 h-12 w-full rounded-full border pr-5 pl-11 text-sm transition outline-none focus:ring-2",
                    errors.email &&
                      "border-clay-500 bg-clay-300/10 focus:border-clay-500 focus:ring-clay-500/20",
                  )}
                  placeholder="ban@congty.com"
                />
              </div>
              <p
                id="newsletter-email-error"
                className="text-clay-600 min-h-5 text-sm md:col-start-2 md:row-start-3"
                aria-live="polite"
              >
                {errors.email?.message ?? "\u00a0"}
              </p>
            </div>

            <div className="flex flex-col gap-2 md:contents">
              <span
                className="hidden md:col-start-3 md:row-start-1 md:block md:h-5"
                aria-hidden="true"
              />
              <Button
                type="submit"
                size="md"
                className="h-12 w-full shrink-0 px-6 md:col-start-3 md:row-start-2 md:w-auto"
                disabled={isSubmitting}
                aria-label="Đăng ký nhận bản tin OOH Tường Phú Group"
              >
                {isSubmitting ? "Đang gửi..." : "Đăng ký nhận bản tin"}
              </Button>
            </div>
          </form>

          <p aria-live="polite" className="mx-auto mt-4 min-h-5 max-w-3xl text-sm">
            {submitError ? (
              <span className="text-clay-600">{submitError}</span>
            ) : (
              <span className="text-moss-700">{submitMessage || "\u00a0"}</span>
            )}
          </p>
        </div>
      </Container>
    </section>
  );
}
