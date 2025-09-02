import { HomepageHero } from "@/components/homepage-hero";
import { ToolsSection } from "@/components/tools-section";
import { Newsletter } from "@/components/newsletter";

export default function Home() {
  return (
    <>
      <HomepageHero />
      <ToolsSection />
      <Newsletter />
    </>
  );
}
