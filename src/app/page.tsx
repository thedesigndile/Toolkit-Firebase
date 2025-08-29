
import { Footer } from "@/components/footer";
import { Newsletter } from "@/components/newsletter";
import { ToolsSection } from "@/components/tools-section";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <main className="flex-1 pt-24">
        <div className="space-y-12 md:space-y-16">
          <ToolsSection />
          <Newsletter />
        </div>
      </main>
      <Footer />
    </div>
  );
}
