import { ModernHero } from "@/components/modern-hero";
import { ModernToolGrid } from "@/components/modern-tool-grid";
import { Newsletter } from "@/components/newsletter";
import { ModernSection } from "@/components/modern-section";
import { FloatingActionButton } from "@/components/floating-action-button";

export default function Home() {
  return (
    <>
      <ModernHero />
      <ModernSection>
        <ModernToolGrid />
      </ModernSection>
      <ModernSection gradient>
        <Newsletter />
      </ModernSection>
      <FloatingActionButton />
    </>
  );
}
