import Image from "next/image";
import Link from "next/link";
import { Clock3, Mail, MapPin, Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { SocialIcon } from "@/components/ui/SocialIcon";
import type { FooterData } from "@/types";

type FooterProps = {
  footer: FooterData;
};

/** Email thứ 2 hiển thị ở footer; CMS chưa quản lý trường này. */
const DEFAULT_EMAIL_2 = "xuongmaysaigon@tuongphugroup.com";

/** Hotline thứ 2 hiển thị ở footer; CMS chưa quản lý trường này. */
const DEFAULT_HOTLINE_1 = "0393 476 778";

/** Hotline thứ 2 hiển thị ở footer; CMS chưa quản lý trường này. */
const DEFAULT_HOTLINE_2 = "0398 829 946";

export function Footer({ footer }: FooterProps) {
  const email2 = footer.contact.email2 || DEFAULT_EMAIL_2;
  const hotline1 = footer.contact.hotline1 || DEFAULT_HOTLINE_1;
  const hotline2 = footer.contact.hotline2 || DEFAULT_HOTLINE_2;
  const [companyName, ...companyDetails] = footer.description.split("\n");

  return (
    <footer
      className="text-cream-50 relative overflow-hidden bg-[#ED4349] bg-cover bg-center bg-no-repeat before:absolute before:inset-0 before:bg-black/15"
      style={{
        backgroundImage:
          'url("/images/08_BackGround/ChatGPT%20Image%20Sep%2013,%202026,%2012_28_17%20PM.png")',
      }}
    >
      <Container size="wide" className="relative z-10 py-5 sm:py-7">
        <div className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
          <section className="rounded-[1.35rem] border border-white/25 bg-black/10 px-6 py-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_14px_35px_rgba(77,0,5,0.18)] backdrop-blur-[2px] sm:px-8">
            <div>
              {footer.logo ? (
                <Link
                  href="/"
                  aria-label={`${footer.name} — về trang chủ`}
                  className="inline-flex items-center"
                >
                  <span className="relative h-[82px] w-[112px] drop-shadow-[0_3px_8px_rgba(0,0,0,0.35)]">
                    <Image
                      src={footer.logo.src}
                      alt={footer.logo.alt}
                      fill
                      sizes="112px"
                      className="object-contain object-left"
                    />
                  </span>
                  <span className="sr-only">{footer.name}</span>
                </Link>
              ) : (
                <Logo tone="light" brandName={footer.name} />
              )}
            </div>

            <div className="mt-2 text-sm leading-relaxed text-white/95">
              <p className="font-semibold uppercase">{companyName}</p>
              {companyDetails.length > 0 && (
                <p className="mt-1 whitespace-pre-line">{companyDetails.join("\n")}</p>
              )}
            </div>

            <div className="mt-5 h-px w-full bg-white/30" />

            <div className="mt-4 flex items-center gap-3">
              {footer.socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="grid h-11 w-11 place-items-center rounded-full border border-white/35 bg-[#9E1119]/65 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_5px_14px_rgba(75,0,5,0.28)] transition-all duration-200 hover:-translate-y-0.5 hover:border-white/70 hover:bg-[#B31720]"
                >
                  <SocialIcon name={social.icon} className="h-[18px] w-[18px]" />
                </a>
              ))}
            </div>
          </section>

          <section className="rounded-[1.35rem] border border-white/25 bg-black/10 px-5 py-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_14px_35px_rgba(77,0,5,0.18)] backdrop-blur-[2px] sm:px-7">
            <dl className="flex h-full flex-col justify-center divide-y divide-white/10">
              <div className="grid grid-cols-[2.75rem_1px_minmax(0,1fr)] items-center gap-3 py-2.5">
                <span className="grid h-10 w-10 place-items-center rounded-full border border-white/30 bg-[#9E1119]/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_4px_12px_rgba(75,0,5,0.28)]">
                  <Phone aria-hidden className="h-5 w-5" strokeWidth={2} />
                </span>
                <span className="h-8 bg-white/35" aria-hidden />
                <div className="min-w-0">
                  <dt className="text-xs text-white/80">Hotline:</dt>
                  <dd className="mt-0.5 flex flex-wrap items-center gap-x-1.5 font-semibold">
                    <a href={`tel:${hotline1.replace(/\s/g, "")}`}>{hotline1}</a>
                    <span aria-hidden>-</span>
                    <a href={`tel:${hotline2.replace(/\s/g, "")}`}>{hotline2}</a>
                  </dd>
                </div>
              </div>

              <div className="grid grid-cols-[2.75rem_1px_minmax(0,1fr)] items-center gap-3 py-2.5">
                <span className="grid h-10 w-10 place-items-center rounded-full border border-white/30 bg-[#9E1119]/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_4px_12px_rgba(75,0,5,0.28)]">
                  <Mail aria-hidden className="h-5 w-5" strokeWidth={2} />
                </span>
                <span className="h-8 bg-white/35" aria-hidden />
                <div className="min-w-0">
                  <dt className="text-xs text-white/80">Email:</dt>
                  <dd className="mt-0.5 break-words text-sm font-medium">
                    <a href={`mailto:${email2}`}>{email2}</a>
                    <span className="mx-1.5" aria-hidden>-</span>
                    <a href={`mailto:${footer.contact.email}`}>{footer.contact.email}</a>
                  </dd>
                </div>
              </div>

              <div className="grid grid-cols-[2.75rem_1px_minmax(0,1fr)] items-center gap-3 py-2.5">
                <span className="grid h-10 w-10 place-items-center rounded-full border border-white/30 bg-[#9E1119]/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_4px_12px_rgba(75,0,5,0.28)]">
                  <MapPin aria-hidden className="h-5 w-5" strokeWidth={2} />
                </span>
                <span className="h-8 bg-white/35" aria-hidden />
                <div className="min-w-0">
                  <dt className="text-xs text-white/80">Địa chỉ:</dt>
                  <dd className="mt-0.5 text-sm font-medium leading-relaxed">
                    {footer.contact.address}
                  </dd>
                </div>
              </div>

              <div className="grid grid-cols-[2.75rem_1px_minmax(0,1fr)] items-center gap-3 py-2.5">
                <span className="grid h-10 w-10 place-items-center rounded-full border border-white/30 bg-[#9E1119]/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_4px_12px_rgba(75,0,5,0.28)]">
                  <Clock3 aria-hidden className="h-5 w-5" strokeWidth={2} />
                </span>
                <span className="h-8 bg-white/35" aria-hidden />
                <div className="min-w-0">
                  <dt className="text-xs text-white/80">Thời gian làm việc:</dt>
                  <dd className="mt-0.5 text-sm font-semibold">
                    Thứ Hai - Thứ Bảy từ 08:00 đến 17:00
                  </dd>
                </div>
              </div>
            </dl>
          </section>
        </div>
      </Container>
    </footer>
  );
}
