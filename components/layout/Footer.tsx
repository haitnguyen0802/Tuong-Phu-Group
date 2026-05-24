import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { brand } from "@/data/brand";

export function Footer() {
  return (
    <footer className="bg-moss-900 text-cream-100">
      <Container size="wide" className="py-12 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
          <div className="flex flex-col gap-6">
            <Logo tone="light" />
            <p className="text-cream-100/75 max-w-sm text-sm leading-relaxed">
              {brand.description}
            </p>
            <div className="flex items-center gap-3">
              {brand.socials.map((social) => (
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

          <dl className="text-cream-100/75 grid gap-5 text-sm sm:grid-cols-3 lg:grid-cols-1">
            <div className="flex flex-col">
              <dt className="text-cream-100/60">Hotline</dt>
              <dd className="text-cream-50 font-medium">{brand.contact.hotline}</dd>
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
              <dt className="text-cream-100/60">Van phong</dt>
              <dd className="text-cream-100/85">{brand.contact.address}</dd>
            </div>
          </dl>
        </div>

        <div className="border-cream-100/15 text-cream-100/60 mt-12 border-t pt-6 text-xs">
          <p>
            &copy; {new Date().getFullYear()} {brand.name}. Moi quyen duoc bao luu.
          </p>
        </div>
      </Container>
    </footer>
  );
}
