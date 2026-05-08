import Link from "next/link";
import { cn } from "@/lib/cn";
import { Logo } from "@/components/ui/Logo";
import { Container } from "@/components/ui/Container";
import { primaryNav } from "@/data/nav";
import { HeaderActions } from "./HeaderActions";
import { MegaMenu } from "./MegaMenu";

/**
 * Server-rendered header shell.
 * Interactive bits (search overlay, mobile drawer, mega menu hover) live in
 * dedicated client islands consumed via composition. The shell stays static so
 * we keep JS small for the most-visible part of the page.
 */
export function Header() {
  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full border-b border-line-100/80 bg-cream-50/90 backdrop-blur",
        "supports-[backdrop-filter]:bg-cream-50/70",
      )}
    >
      <Container size="wide" className="flex h-16 items-center justify-between gap-6 lg:h-20">
        <div className="flex items-center gap-10">
          <Logo />
          <nav aria-label="Điều hướng chính" className="hidden lg:block">
            <ul className="flex items-center gap-7 text-sm font-medium text-ink-900">
              {primaryNav.map((item) =>
                item.groups && item.groups.length > 0 ? (
                  <li key={item.href}>
                    <MegaMenu item={item} />
                  </li>
                ) : (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "relative inline-flex h-10 items-center transition-colors duration-200 hover:text-moss-700",
                        "after:pointer-events-none after:absolute after:inset-x-0 after:bottom-1 after:h-px after:scale-x-0 after:bg-moss-700 after:transition-transform after:duration-300 hover:after:scale-x-100",
                        item.highlight && "text-clay-500 hover:text-clay-600",
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </nav>
        </div>
        <HeaderActions />
      </Container>
    </header>
  );
}
