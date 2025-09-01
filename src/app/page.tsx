import { HomepageHero } from "@/components/homepage-hero";
import { ModernSection } from "@/components/modern-section";
import { Newsletter } from "@/components/newsletter";
import { ToolsSection } from "@/components/tools-section";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background relative overflow-hidden">
      <main className="flex-1 relative z-10" id="main-content" role="main">
        <HomepageHero />
        <div className="space-y-12 md:space-y-16">
          <ModernSection id="tools-section">
              <ToolsSection />
          </ModernSection>
          <ModernSection id="newsletter-section" gradient>
              <Newsletter />
          </ModernSection>
        </div>
      </main>
    </div>
  );
}
