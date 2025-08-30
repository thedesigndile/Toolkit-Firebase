
import { Footer } from "@/components/footer";
import { Newsletter } from "@/components/newsletter";
import { ToolsSection } from "@/components/tools-section";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background relative overflow-hidden">
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

    