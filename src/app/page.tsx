import { ModernHero } from "@/components/modern-hero";
import { FeaturedToolsGrid } from "@/components/featured-tools-grid";
import { Newsletter } from "@/components/newsletter";
import { ModernSection } from "@/components/modern-section";
import { FloatingActionButton } from "@/components/floating-action-button";

export default function Home() {
  return (
    <>
      <ModernHero />
      <ModernSection>
        <FeaturedToolsGrid />
      </ModernSection>
      <ModernSection gradient>
        <Newsletter />
      </ModernSection>
      <FloatingActionButton />
    </>
  );
}
