import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { SocialIcon } from "@/components/ui/SocialIcon";
import type { FooterData } from "@/types";

type FooterProps = {
  footer: FooterData;
};

const footerTextClass = "text-cream-50 text-sm leading-relaxed";

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
  return (
    <footer className="text-cream-50 relative overflow-hidden bg-gradient-to-b from-[#056B39] to-[#046a38]">
      <Container size="wide" className="py-12 lg:py-16">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:gap-x-10">
          <div className="flex items-start gap-4 md:items-center lg:contents">
            <div className="shrink-0 lg:col-start-1 lg:row-start-1">
              {footer.logo ? (
                <Link
                  href="/"
                  aria-label={`${footer.name} — về trang chủ`}
                  className="inline-flex items-center"
                >
                  <span className="relative h-[90px] w-[90px] drop-shadow-[0_2px_6px_rgba(0,0,0,0.35)]">
                    <Image
                      src={footer.logo.src}
                      alt={footer.logo.alt}
                      fill
                      sizes="90px"
                      className="object-contain"
                    />
                  </span>
                  <span className="sr-only">{footer.name}</span>
                </Link>
              ) : (
                <Logo tone="light" brandName={footer.name} />
              )}
            </div>

            <p
              className={`${footerTextClass} min-w-0 flex-1 whitespace-pre-line lg:col-start-1 lg:row-start-2 lg:max-w-[38rem]`}
            >
              {footer.description}
            </p>
          </div>

          <dl
            className={`${footerTextClass} flex flex-col gap-3 lg:col-start-2 lg:row-start-2 lg:self-start`}
          >
            <div className="flex flex-wrap items-baseline gap-x-2">
              <dt className="text-cream-50 shrink-0">Hotline:</dt>
              <dd className="m-0">
                <a
                  className="text-cream-50 font-medium"
                  href={`tel:${footer.contact.hotline.replace(/\s*\(.*\)\s*/g, "").trim()}`}
                >
                  {footer.contact.hotline1 || DEFAULT_HOTLINE_1}
                </a>{" "}
                -{" "}
                <a
                  className="text-cream-50 font-medium"
                  href={`tel:${footer.contact.hotline.replace(/\s*\(.*\)\s*/g, "").trim()}`}
                >
                  {footer.contact.hotline2 || DEFAULT_HOTLINE_2}
                </a>
              </dd>
            </div>
            <div className="flex flex-wrap items-baseline gap-x-2">
              <dt className="text-cream-50 shrink-0">Email:</dt>
              <dd className="m-0">
                <a className="text-cream-50 font-medium" href={`mailto:${email2}`}>
                  {email2}
                </a>{" "}
                -{" "}
                <a className="text-cream-50 font-medium" href={`mailto:${footer.contact.email}`}>
                  {footer.contact.email}
                </a>
              </dd>
            </div>
            <div className="flex flex-wrap items-baseline gap-x-2">
              <dt className="text-cream-50 shrink-0">Địa chỉ:</dt>
              <dd className="text-cream-50 m-0">{footer.contact.address}</dd>
            </div>
            <div className="flex flex-wrap items-baseline gap-x-2">
              <dt className="text-cream-50 shrink-0">Thời gian làm việc:</dt>
              <dd className="text-cream-50 m-0">Thứ Hai - Thứ Bảy từ 08:00 đến 17:00</dd>
            </div>
          </dl>

          <div className="flex items-center gap-3 lg:col-start-1 lg:row-start-3">
            {footer.socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="border-cream-100/20 hover:border-cream-100 hover:bg-cream-100/10 grid h-10 w-10 place-items-center rounded-full border transition-colors duration-200"
              >
                <SocialIcon name={social.icon} className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
