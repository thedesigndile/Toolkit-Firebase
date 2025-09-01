import { CreativeHero } from "@/components/creative-hero";
import { CreativeToolGrid } from "@/components/creative-tool-grid";
import { FuturisticFooter } from "@/components/futuristic-footer";
import { FuturisticHeader } from "@/components/futuristic-header";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background relative overflow-hidden">
      <FuturisticHeader />
      <main className="flex-1 relative z-10" id="main-content" role="main">
        <CreativeHero />
        <CreativeToolGrid />
      </main>
      <FuturisticFooter />
    </div>
  );
}
