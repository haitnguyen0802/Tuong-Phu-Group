import { Award, ShieldCheck } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { certifications } from "@/data/certifications";
import type { Certification } from "@/types";

type CertificationSectionProps = {
  items?: Certification[];
};

export function CertificationSection({ items = certifications }: CertificationSectionProps) {
  return (
    <section aria-label="Chung nhan chat luong va cam ket" className="py-20 sm:py-24 lg:py-28">
      <Container size="wide">
        <div className="space-y-10 rounded-[2rem] border border-line-100 bg-cream-50/85 p-6 sm:p-8 lg:p-12">
          <SectionTitle
            align="center"
            eyebrow="Certification"
            title="Chung nhan xay dung niem tin truoc moi quy trinh cham da."
            lead="Moi lo san xuat cua Verdara duoc doi chieu voi bo tieu chi an toan, thu thach dao duc va tieu chuan van hanh ben vung."
          />

          <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {items.map((certification) => (
              <li key={certification.id} className="h-full">
                <article className="group relative flex h-full flex-col rounded-3xl border border-line-100 bg-cream-100/65 p-5 transition-all duration-300 motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-[0_20px_40px_-30px_rgba(31,36,34,0.35)] motion-reduce:transform-none">
                  <div className="flex items-start justify-between gap-3">
                    <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-moss-700/20 bg-moss-50 text-moss-700">
                      <Award className="h-5 w-5" aria-hidden strokeWidth={1.8} />
                    </div>
                    <span className="rounded-full border border-line-200 bg-cream-50 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-ink-500">
                      Verified
                    </span>
                  </div>

                  <h3 className="mt-4 text-lg font-semibold text-ink-900">{certification.name}</h3>
                  <p className="mt-1 text-sm text-moss-700">{certification.organization}</p>
                  <p className="mt-3 text-sm leading-relaxed text-ink-600">{certification.description}</p>

                  <div className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-ink-700">
                    <ShieldCheck className="h-4 w-4 text-moss-700" aria-hidden strokeWidth={1.8} />
                    Kiem dinh doc lap
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
