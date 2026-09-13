import Image from "next/image";
import { Mail, MapPin, Phone, Wrench } from "lucide-react";

const CONTACT = {
  hotline: "0398829946",
  email: "info@tuongphugroup.com",
  address: "62/6, ấp 29, Đường Xuân Thới 13, Xã Xuân Thới Sơn, TP Hồ Chí Minh",
};

/**
 * Trang bảo trì toàn màn hình (route /index_2).
 * Dùng position fixed + z-index cao để che toàn bộ header/nội dung phía sau,
 * nên có thể render ở bất kỳ đâu trong cây layout.
 */
export function MaintenancePage() {
  const year = new Date().getFullYear();

  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto bg-cream-50">
      {/* Nền trang trí */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_0%,#eef2ec_0%,#fbf8f2_55%,#f4ecdb_100%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 top-16 h-72 w-72 rounded-full bg-moss-200/50 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 bottom-10 h-80 w-80 rounded-full bg-clay-300/40 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/3 h-64 w-64 -translate-x-1/2 rounded-full bg-cream-200/60 blur-3xl"
      />

      <main className="relative z-10 flex min-h-full items-center justify-center px-4 py-12 sm:py-16">
        <div className="w-full max-w-2xl">
          <div className="rounded-[2rem] border border-line-100 bg-white/75 p-8 text-center shadow-[0_30px_80px_-45px_rgba(47,74,60,0.5)] backdrop-blur sm:p-12">
            {/* Logo */}
            <div className="relative mx-auto h-[96px] w-[96px]">
              <Image
                src="/images/01_Logo/logo_png.png"
                alt="Xưởng May Sài Gòn"
                fill
                sizes="96px"
                className="object-contain"
                priority
              />
            </div>

            {/* Trạng thái */}
            <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-moss-200 bg-moss-50 px-4 py-1.5 text-xs font-semibold tracking-[0.16em] uppercase text-moss-700">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-moss-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-moss-600" />
              </span>
              Đang nâng cấp hệ thống
            </p>

            <h1 className="font-display mt-5 text-balance text-3xl font-medium leading-[1.1] text-ink-900 sm:text-4xl lg:text-5xl">
              Website đang được bảo trì
            </h1>

            <p className="mx-auto mt-5 max-w-xl text-pretty text-base leading-relaxed text-ink-500 sm:text-lg">
              Xưởng May Sài Gòn đang nâng cấp website để mang đến trải nghiệm tốt hơn.
              Chúng tôi sẽ trở lại trong thời gian sớm nhất. Trong lúc chờ, mọi nhu cầu
              đặt may, báo giá vẫn được hỗ trợ qua các kênh bên dưới.
            </p>

            {/* Liên hệ */}
            <div className="mt-9 grid gap-3 text-left sm:grid-cols-2">
              <a
                href={`tel:${CONTACT.hotline}`}
                className="group flex items-start gap-3 rounded-2xl border border-line-100 bg-cream-50 p-4 transition-colors hover:border-moss-200 hover:bg-moss-50"
              >
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-moss-700 text-cream-50">
                  <Phone className="h-4 w-4" aria-hidden strokeWidth={1.8} />
                </span>
                <span>
                  <span className="block text-xs tracking-[0.14em] uppercase text-ink-500">
                    Hotline
                  </span>
                  <span className="mt-0.5 block text-base font-semibold text-ink-900 group-hover:text-moss-700">
                    {CONTACT.hotline}
                  </span>
                </span>
              </a>

              <a
                href={`mailto:${CONTACT.email}`}
                className="group flex items-start gap-3 rounded-2xl border border-line-100 bg-cream-50 p-4 transition-colors hover:border-moss-200 hover:bg-moss-50"
              >
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-moss-700 text-cream-50">
                  <Mail className="h-4 w-4" aria-hidden strokeWidth={1.8} />
                </span>
                <span>
                  <span className="block text-xs tracking-[0.14em] uppercase text-ink-500">
                    Email
                  </span>
                  <span className="mt-0.5 block break-all text-base font-semibold text-ink-900 group-hover:text-moss-700">
                    {CONTACT.email}
                  </span>
                </span>
              </a>

              <div className="flex items-start gap-3 rounded-2xl border border-line-100 bg-cream-50 p-4 sm:col-span-2">
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-moss-700 text-cream-50">
                  <MapPin className="h-4 w-4" aria-hidden strokeWidth={1.8} />
                </span>
                <span>
                  <span className="block text-xs tracking-[0.14em] uppercase text-ink-500">
                    Địa chỉ
                  </span>
                  <span className="mt-0.5 block text-sm leading-relaxed text-ink-700">
                    {CONTACT.address}
                  </span>
                </span>
              </div>
            </div>

            {/* Ghi chú */}
            <p className="mt-8 inline-flex items-center gap-2 text-sm text-ink-500">
              <Wrench className="h-4 w-4 text-moss-700" aria-hidden strokeWidth={1.8} />
              Cảm ơn bạn đã kiên nhẫn chờ đợi — hẹn gặp lại sớm!
            </p>
          </div>

          <p className="mt-6 text-center text-xs text-ink-500">
            © {year} Tường Phú Group. Mọi quyền được bảo lưu.
          </p>
        </div>
      </main>
    </div>
  );
}
