import Image from "next/image";
import Link from "next/link";
import { Heart, MessageCircle } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { FadeIn } from "@/components/animation/FadeIn";
import { buttonStyles } from "@/components/ui/Button";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { socialHandle, socialPosts, socialProfileHref } from "@/data/social";
import type { SocialPost } from "@/types";

const numberFormatter = new Intl.NumberFormat("vi-VN");

type SocialProofSectionProps = {
  posts?: SocialPost[];
  handle?: string;
  profileHref?: string;
};

export function SocialProofSection({
  posts = socialPosts,
  handle = socialHandle,
  profileHref = socialProfileHref,
}: SocialProofSectionProps) {
  return (
    <section aria-label="Cong dong Verdara tren Instagram" className="pb-24 pt-6 sm:pb-28 sm:pt-10">
      <Container size="wide" className="space-y-10">
        <FadeIn y={20}>
          <SectionTitle
            align="center"
            eyebrow="Verdara community"
            title={
              <>
                Theo doi {handle}
                <span className="block text-moss-700">de cap nhat thoi quen cham da hang ngay.</span>
              </>
            }
            lead="Khoanh khac that tu nguoi dung, vung trong nguyen lieu va hau truong cong thuc — ket noi voi chung toi tren mang xa hoi."
          />
        </FadeIn>

        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {posts.map((post, index) => (
            <FadeIn
              key={post.id}
              delay={index * 0.05}
              y={14}
              className="contents"
            >
              <li>
                <Link
                  href={post.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative block aspect-square overflow-hidden rounded-2xl border border-line-100 bg-cream-100/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-moss-700/40 focus-visible:ring-offset-2 focus-visible:ring-offset-cream-50"
                  aria-label={`Mo bai dang Instagram: ${post.caption}`}
                >
                  <Image
                    src={post.image.src}
                    alt={post.image.alt}
                    fill
                    sizes="(min-width: 1024px) 16vw, (min-width: 640px) 33vw, 50vw"
                    className="object-cover transition-transform duration-500 motion-safe:group-hover:scale-[1.04]"
                  />

                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-2 bg-ink-900/45 p-3 text-center text-cream-50 opacity-0 transition-opacity duration-300 motion-safe:group-hover:opacity-100 motion-safe:group-focus-visible:opacity-100"
                  >
                    <p className="line-clamp-2 text-xs leading-snug">{post.caption}</p>
                    <div className="flex items-center gap-3 text-xs font-medium">
                      <span className="inline-flex items-center gap-1">
                        <Heart className="h-3.5 w-3.5" strokeWidth={1.8} />
                        {numberFormatter.format(post.likes)}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <MessageCircle className="h-3.5 w-3.5" strokeWidth={1.8} />
                        {numberFormatter.format(post.comments)}
                      </span>
                    </div>
                  </div>
                </Link>
              </li>
            </FadeIn>
          ))}
        </ul>

        <div className="flex justify-center">
          <Link
            href={profileHref}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonStyles({ variant: "outline", size: "lg" })}
            aria-label={`Theo doi Verdara tren Instagram (${handle})`}
          >
            <SocialIcon name="instagram" className="h-4 w-4" />
            Theo doi tren Instagram
          </Link>
        </div>
      </Container>
    </section>
  );
}
