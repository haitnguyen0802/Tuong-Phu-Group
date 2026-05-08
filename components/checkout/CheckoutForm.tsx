"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { buttonStyles } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { useCartStore } from "@/lib/store/useCartStore";
import { calculateOrderPricing } from "@/lib/utils/price";
import type { CheckoutFormValues, MockOrderPayload } from "@/types";

const checkoutSchema = z.object({
  contact: z.object({
    email: z.email("Email khong hop le"),
  }),
  shipping: z.object({
    fullName: z.string().min(2, "Vui long nhap ho ten"),
    phone: z.string().min(9, "So dien thoai khong hop le"),
    addressLine1: z.string().min(4, "Vui long nhap dia chi"),
    ward: z.string().min(2, "Vui long nhap phuong/xa"),
    district: z.string().min(2, "Vui long nhap quan/huyen"),
    city: z.string().min(2, "Vui long nhap tinh/thanh pho"),
  }),
  note: z.string().max(300, "Ghi chu toi da 300 ky tu").optional(),
});

type Props = {
  defaultValues?: Partial<CheckoutFormValues>;
};

const fieldClassName =
  "mt-1 w-full rounded-2xl border border-line-200 bg-cream-50 px-4 py-3 text-sm text-ink-900 outline-none transition focus:border-moss-700";

function generateMockOrderCode() {
  return `VD${crypto.randomUUID().replace(/-/g, "").slice(0, 8).toUpperCase()}`;
}

export function CheckoutForm({ defaultValues }: Props) {
  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);
  const pricing = calculateOrderPricing(items);
  const router = useRouter();
  const [orderCode, setOrderCode] = useState<string | null>(null);

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    mode: "onBlur",
    defaultValues: {
      contact: { email: "", ...defaultValues?.contact },
      shipping: {
        fullName: "",
        phone: "",
        addressLine1: "",
        ward: "",
        district: "",
        city: "",
        ...defaultValues?.shipping,
      },
      note: defaultValues?.note ?? "",
    },
  });

  const submit = form.handleSubmit(async (values) => {
    if (!items.length) {
      router.replace("/cart");
      return;
    }

    const payload: MockOrderPayload = {
      orderCode: generateMockOrderCode(),
      items,
      pricing,
      customer: values,
      createdAt: new Date().toISOString(),
    };

    await new Promise((resolve) => setTimeout(resolve, 500));
    setOrderCode(payload.orderCode);
    clearCart();
  });

  if (orderCode) {
    return (
      <div className="rounded-3xl border border-line-100 bg-cream-50 p-8 text-center">
        <p className="eyebrow text-moss-700">Order success</p>
        <h2 className="mt-2 font-display text-3xl text-ink-900">Cam on ban da dat hang</h2>
        <p className="mt-3 text-sm text-ink-600">
          Ma don hang mock: <span className="font-semibold text-ink-900">{orderCode}</span>
        </p>
        <Link href="/products" className={cn(buttonStyles({ variant: "primary", size: "md" }), "mt-6 inline-flex")}>
          Tiep tuc mua sam
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-6">
      <fieldset className="space-y-4 rounded-3xl border border-line-100 bg-cream-50 p-5 sm:p-6">
        <legend className="px-1 font-display text-2xl text-ink-900">Thong tin lien he</legend>
        <div>
          <label htmlFor="contact.email" className="text-sm text-ink-700">
            Email
          </label>
          <input id="contact.email" className={fieldClassName} {...form.register("contact.email")} />
          {form.formState.errors.contact?.email ? (
            <p className="mt-1 text-xs text-clay-600">{form.formState.errors.contact.email.message}</p>
          ) : null}
        </div>
      </fieldset>

      <fieldset className="space-y-4 rounded-3xl border border-line-100 bg-cream-50 p-5 sm:p-6">
        <legend className="px-1 font-display text-2xl text-ink-900">Dia chi giao hang</legend>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Ho va ten" error={form.formState.errors.shipping?.fullName?.message}>
            <input className={fieldClassName} {...form.register("shipping.fullName")} />
          </Field>
          <Field label="So dien thoai" error={form.formState.errors.shipping?.phone?.message}>
            <input className={fieldClassName} {...form.register("shipping.phone")} />
          </Field>
        </div>
        <Field label="Dia chi cu the" error={form.formState.errors.shipping?.addressLine1?.message}>
          <input className={fieldClassName} {...form.register("shipping.addressLine1")} />
        </Field>
        <div className="grid gap-4 sm:grid-cols-3">
          <Field label="Phuong/Xa" error={form.formState.errors.shipping?.ward?.message}>
            <input className={fieldClassName} {...form.register("shipping.ward")} />
          </Field>
          <Field label="Quan/Huyen" error={form.formState.errors.shipping?.district?.message}>
            <input className={fieldClassName} {...form.register("shipping.district")} />
          </Field>
          <Field label="Tinh/Thanh pho" error={form.formState.errors.shipping?.city?.message}>
            <input className={fieldClassName} {...form.register("shipping.city")} />
          </Field>
        </div>

        <Field label="Ghi chu" error={form.formState.errors.note?.message}>
          <textarea className={fieldClassName} rows={4} {...form.register("note")} />
        </Field>
      </fieldset>

      <button
        type="submit"
        disabled={form.formState.isSubmitting || !items.length}
        className={cn(buttonStyles({ variant: "primary", size: "lg" }), "w-full sm:w-auto")}
      >
        {form.formState.isSubmitting ? "Dang xu ly..." : "Xac nhan don hang (mock)"}
      </button>
    </form>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="text-sm text-ink-700">{label}</label>
      {children}
      {error ? <p className="mt-1 text-xs text-clay-600">{error}</p> : null}
    </div>
  );
}
