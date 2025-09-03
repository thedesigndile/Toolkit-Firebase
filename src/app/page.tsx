import { ModernHero } from "@/components/modern-hero";
import { Newsletter } from "@/components/newsletter";
import { ModernSection } from "@/components/modern-section";
import { FloatingActionButton } from "@/components/floating-action-button";
import { ToolsSection } from "@/components/tools-section";

export default function Home() {
  return (
    <>
      <ModernHero />
      <ModernSection>
        <ToolsSection />
      </ModernSection>
      <ModernSection gradient>
        <Newsletter />
      </ModernSection>
      <FloatingActionButton />
    </>
  );
}
