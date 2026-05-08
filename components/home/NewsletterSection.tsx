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
  email: z.email("Vui long nhap email hop le."),
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
        ? `Cam on ${values.name}. Ban da dang ky nhan ban tin thanh cong.`
        : "Cam on ban da dang ky nhan ban tin thanh cong.",
    );
  }

  return (
    <section aria-label="Dang ky nhan ban tin" className="pb-24 pt-6 sm:pb-28 sm:pt-10">
      <Container size="wide">
        <div className="rounded-[2rem] border border-line-100 bg-cream-100/70 p-6 sm:p-8 lg:p-12">
          <SectionTitle
            align="center"
            eyebrow="Newsletter"
            title="Nhan cap nhat moi ve cong thuc va routine cham da."
            lead="Moi thang, Verdara gui mot ban tin gon nhe ve kien thuc cham da va cac chuong trinh uu dai moi nhat."
            className="mx-auto"
          />

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mx-auto mt-8 grid max-w-3xl gap-4 sm:grid-cols-2"
            noValidate
          >
            <div className="space-y-2">
              <label htmlFor="newsletter-name" className="text-sm font-medium text-ink-700">
                Ho ten (tuy chon)
              </label>
              <input
                id="newsletter-name"
                type="text"
                autoComplete="name"
                {...register("name")}
                aria-invalid={errors.name ? "true" : "false"}
                aria-describedby={errors.name ? "newsletter-name-error" : undefined}
                className="h-12 w-full rounded-full border border-line-200 bg-cream-50 px-5 text-sm text-ink-900 outline-none transition focus:border-moss-700 focus:ring-2 focus:ring-moss-700/25"
                placeholder="Nhap ten cua ban"
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
                  placeholder="you@example.com"
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
                aria-label="Dang ky nhan ban tin Verdara"
              >
                {isSubmitting ? "Dang xu ly..." : "Dang ky nhan ban tin"}
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
