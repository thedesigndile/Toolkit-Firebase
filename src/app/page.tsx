import { HomepageHero } from "@/components/homepage-hero";
import { ToolsSection } from "@/components/tools-section";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <main className="flex-1">
        <HomepageHero />
        <ToolsSection />
      </main>
      <Footer />
    </div>
  );
}
