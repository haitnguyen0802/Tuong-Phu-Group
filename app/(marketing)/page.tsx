import type { Metadata } from "next";
import { HeroCarousel } from "@/components/home/HeroCarousel";
import { ProductStoryScene } from "@/components/home/ProductStoryScene";
import { BrandPhilosophy } from "@/components/home/BrandPhilosophy";
import { CertificationSection } from "@/components/home/CertificationSection";
import { BestSellerProductGrid } from "@/components/home/BestSellerProductGrid";
import { IngredientStorySection } from "@/components/home/IngredientStorySection";
import { JournalPreviewSection } from "@/components/home/JournalPreviewSection";
import { SocialProofSection } from "@/components/home/SocialProofSection";
import { NewsletterSection } from "@/components/home/NewsletterSection";
import { getHomepageData } from "@/lib/cms/get-homepage-data";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Kham pha hanh trinh cham da thuan chay Verdara: cong thuc toi gian, nguyen lieu Viet Nam va routine phuc hoi diu nhe.",
};

export const revalidate = 300;

export default async function HomePage() {
  const homepageData = await getHomepageData();

  return (
    <>
      <HeroCarousel slides={homepageData.slides} />
      <ProductStoryScene
        ingredientItems={homepageData.ingredients}
        productItems={homepageData.products}
      />
      <BrandPhilosophy ingredientItems={homepageData.ingredients} />
      <CertificationSection items={homepageData.certifications} />
      <BestSellerProductGrid products={homepageData.products} />
      <IngredientStorySection items={homepageData.ingredients} />
      <JournalPreviewSection items={homepageData.articles} />
      <SocialProofSection
        posts={homepageData.socialPosts}
        handle={homepageData.socialHandle}
        profileHref={homepageData.socialProfileHref}
      />
      <NewsletterSection />
    </>
  );
}
