import { cn } from "@/lib/cn";
import { Logo } from "@/components/ui/Logo";
import { Container } from "@/components/ui/Container";
import { HeaderActions } from "@/components/layout/HeaderActions";
import type { NavItem } from "@/types";

type HeaderProps = {
  brandName: string;
  navItems: NavItem[];
};

/**
 * Server-rendered header shell.
 * Interactive bits (search overlay, mobile drawer, mega menu hover) live in
 * dedicated client islands consumed via composition. The shell stays static so
 * we keep JS small for the most-visible part of the page.
 */
export function Header({ brandName, navItems }: HeaderProps) {
  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 w-full border-b border-line-100/80 bg-cream-50/95 backdrop-blur",
        "shadow-[0_10px_30px_-24px_rgba(31,36,34,0.45)]",
        "supports-[backdrop-filter]:bg-cream-50/75",
      )}
    >
      <Container
        size="wide"
        className="flex h-[90px] items-center justify-between lg:grid lg:grid-cols-[1fr_auto_1fr] lg:gap-6"
      >
        <div className="flex items-center lg:justify-self-start">
          <Logo className="h-[90px] w-[90px]" brandName={brandName} />
        </div>
        <nav aria-label="Điều hướng chính" className="hidden lg:block lg:justify-self-center">
          <ul className="flex items-center gap-7 text-sm font-medium text-ink-900">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={cn(
                    "relative inline-flex h-10 items-center transition-colors duration-200 hover:text-moss-700",
                    "after:pointer-events-none after:absolute after:inset-x-0 after:bottom-1 after:h-px after:scale-x-0 after:bg-moss-700 after:transition-transform after:duration-300 hover:after:scale-x-100",
                  )}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center lg:justify-self-end">
          <HeaderActions />
        </div>
      </Container>
    </header>
  );
}
