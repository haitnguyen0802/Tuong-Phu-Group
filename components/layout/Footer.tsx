import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { brand } from "@/data/brand";
import { primaryNav } from "@/data/nav";

const supportLinks = [
  { label: "Câu hỏi thường gặp", href: "/help" },
  { label: "Quy trình triển khai", href: "/help/process" },
  { label: "Hợp đồng & thanh toán", href: "/help/contract" },
  { label: "Liên hệ Tường Phú Group", href: "/contact" },
];

const aboutLinks = [
  { label: "Câu chuyện thương hiệu", href: "/story" },
  { label: "Mạng lưới vị trí OOH", href: "/network" },
  { label: "Case study tiêu biểu", href: "/journal" },
  { label: "Tuyển dụng", href: "/careers" },
];

export function Footer() {
  return (
    <footer className="mt-24 bg-moss-900 text-cream-100">
      <Container size="wide" className="py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div className="flex flex-col gap-6">
            <Logo tone="light" />
            <p className="max-w-sm text-sm leading-relaxed text-cream-100/75">
              {brand.description}
            </p>
            <div className="flex items-center gap-3">
              {brand.socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="grid h-10 w-10 place-items-center rounded-full border border-cream-100/20 transition-colors duration-200 hover:border-cream-100 hover:bg-cream-100/10"
                >
                  <SocialIcon name={social.icon} className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <FooterColumn
            title="Khám phá"
            links={primaryNav.map(({ label, href }) => ({ label, href }))}
          />
          <FooterColumn title="Về Tường Phú" links={aboutLinks} />
          <FooterColumn title="Hỗ trợ" links={supportLinks}>
            <dl className="mt-6 space-y-2 text-sm text-cream-100/75">
              <div className="flex flex-col">
                <dt className="text-cream-100/60">Hotline</dt>
                <dd className="font-medium text-cream-50">{brand.contact.hotline}</dd>
              </div>
              <div className="flex flex-col">
                <dt className="text-cream-100/60">Email</dt>
                <dd>
                  <a className="hover:text-cream-50" href={`mailto:${brand.contact.email}`}>
                    {brand.contact.email}
                  </a>
                </dd>
              </div>
              <div className="flex flex-col">
                <dt className="text-cream-100/60">Văn phòng</dt>
                <dd className="text-cream-100/85">{brand.contact.address}</dd>
              </div>
            </dl>
          </FooterColumn>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-cream-100/15 pt-6 text-xs text-cream-100/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {brand.name}. Mọi quyền được bảo lưu.
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <Link className="hover:text-cream-50" href="/legal/terms">
              Điều khoản dịch vụ
            </Link>
            <Link className="hover:text-cream-50" href="/legal/privacy">
              Chính sách bảo mật
            </Link>
            <Link className="hover:text-cream-50" href="/legal/cookies">
              Cookies
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
  children,
}: {
  title: string;
  links: { label: string; href: string }[];
  children?: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-cream-50">
        {title}
      </h3>
      <ul className="mt-5 space-y-3 text-sm text-cream-100/80">
        {links.map((link) => (
          <li key={link.href}>
            <Link className="transition-colors duration-200 hover:text-cream-50" href={link.href}>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
      {children}
    </div>
  );
}
