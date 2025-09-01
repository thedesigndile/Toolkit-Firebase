import { HomepageHero } from "@/components/homepage-hero";
import { ToolsSection } from "@/components/tools-section";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background relative overflow-hidden">
      <main className="flex-1 relative z-10" id="main-content" role="main">
        <HomepageHero />
        <ToolsSection />
      </main>
    </div>
  );
}
