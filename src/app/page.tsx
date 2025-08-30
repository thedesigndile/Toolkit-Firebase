
import { Footer } from "@/components/footer";
import { Newsletter } from "@/components/newsletter";
import { ToolsSection } from "@/components/tools-section";
import { ParticleBackground, FloatingElements, GradientOrbs } from "@/components/particle-background";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-background via-background to-accent/5 relative overflow-hidden">
      {/* Advanced Background Effects */}
      <ParticleBackground />
      <FloatingElements />
      <GradientOrbs />

      {/* Subtle mesh gradient overlay */}
      <div className="absolute inset-0 bg-gradient-mesh opacity-20 pointer-events-none" aria-hidden="true" />

      <main className="flex-1 pt-24 relative z-10" id="main-content" role="main">
        <div className="space-y-12 md:space-y-16">
          <section aria-labelledby="tools-section-heading">
            <ToolsSection />
          </section>
          <section aria-labelledby="newsletter-heading">
            <Newsletter />
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
