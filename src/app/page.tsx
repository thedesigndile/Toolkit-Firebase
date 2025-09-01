
import { Footer } from "@/components/footer";
import { Newsletter } from "@/components/newsletter";
import { ToolsSection } from "@/components/tools-section";
import { ParticleBackground } from "@/components/particle-background";
import { FeaturedToolsSection } from "@/components/featured-tools-section";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background relative overflow-hidden">
      <ParticleBackground />
      <main className="flex-1 pt-24 relative z-10" id="main-content" role="main">
        <div className="space-y-12 md:space-y-16">
          <section aria-labelledby="tools-section-heading">
            <h2 id="tools-section-heading" className="sr-only">All Tools</h2>
            <ToolsSection />
          </section>
          <section aria-labelledby="featured-tools-heading">
            <h2 id="featured-tools-heading" className="sr-only">Featured Tools</h2>
            <FeaturedToolsSection />
          </section>
          <section aria-labelledby="newsletter-heading">
            <h2 id="newsletter-heading" className="sr-only">Newsletter</h2>
            <Newsletter />
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
