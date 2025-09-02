import { HomepageHero } from "@/components/homepage-hero";
import { ToolsSection } from "@/components/tools-section";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <HomepageHero />
      <ToolsSection />
    </div>
  );
}
