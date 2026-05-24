import type { Metadata } from "next";
import { HeroCarousel } from "@/components/home/HeroCarousel";
import { CertificationSection } from "@/components/home/CertificationSection";
import { BestSellerProductGrid } from "@/components/home/BestSellerProductGrid";
import { IngredientStorySection } from "@/components/home/IngredientStorySection";
import { SocialProofSection } from "@/components/home/SocialProofSection";
import { NewsLinksSection } from "@/components/home/NewsLinksSection";
import { NewsletterSection } from "@/components/home/NewsletterSection";
import { getHomepageData } from "@/lib/cms/get-homepage-data";

export const metadata: Metadata = {
  title: "Trang chu",
  description:
    "Tuong Phu Group — Giai phap quang cao OOH toan dien: bang LED, billboard cao toc, frame va decal thang may, banner thang cuon, atrium TTTM, cong cho va in bat kho lon tren toan quoc.",
};

export const revalidate = 300;

export default async function HomePage() {
  const homepageData = await getHomepageData();

  return (
    <>
      <HeroCarousel slides={homepageData.slides} />
      <CertificationSection items={homepageData.certifications} />
      <BestSellerProductGrid products={homepageData.products} />
      <IngredientStorySection items={homepageData.ingredients} />
      <SocialProofSection
        posts={homepageData.socialPosts}
        handle={homepageData.socialHandle}
        profileHref={homepageData.socialProfileHref}
      />
      <NewsLinksSection items={homepageData.articles} />
      <NewsletterSection />
    </>
  );
}
