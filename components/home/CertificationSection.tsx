import Image from "next/image";
import { Leaf } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import type { Certification, SectionHeading } from "@/types";

type CertificationSectionProps = {
  items: Certification[];
  heading?: SectionHeading;
};

export function CertificationSection({ items, heading }: CertificationSectionProps) {
  return (
    <section
      id="partners"
      aria-label="Đối tác và năng lực Tường Phú Group"
      className="py-20 sm:py-24 lg:py-28"
    >
      <Container size="wide">
        <div className="space-y-10 rounded-[2rem] border border-line-100 bg-cream-50/85 p-6 sm:p-8 lg:p-12">
          <SectionTitle heading={heading} />

          <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {items.map((certification) => (
              <li key={certification.id} className="h-full">
                <article className="group relative flex h-full flex-col rounded-3xl border border-line-100 bg-cream-100/65 p-6 transition-all duration-300 motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-[0_20px_40px_-30px_rgba(31,36,34,0.35)] motion-reduce:transform-none">
                  <div className="border-line-200 bg-cream-50 relative flex h-24 w-full items-center justify-center overflow-hidden rounded-2xl border">
                    <Image
                      src={certification.logo}
                      alt={certification.name}
                      fill
                      sizes="(min-width: 1280px) 8rem, (min-width: 768px) 6rem, 100vw"
                      className="object-contain p-3"
                    />
                  </div>

                  <h3 className="mt-5 text-xl font-semibold text-ink-900">{certification.name}</h3>
                  <div className="mt-2 flex items-start gap-2 text-sm text-moss-700">
                    <Leaf className="mt-0.5 h-4 w-4 shrink-0" aria-hidden strokeWidth={1.7} />
                    <span className="leading-snug text-pretty">
                      {certification.organization}
                    </span>
                  </div>

                  <div className="mt-4 h-px w-full bg-line-200" />

                  <p className="mt-4 text-sm leading-relaxed text-ink-600">
                    {certification.description}
                  </p>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
