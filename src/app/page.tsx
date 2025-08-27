
import { ToolsSection } from "@/components/tools-section";
import { Newsletter } from "@/components/newsletter";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <main className="flex-1">
        <ToolsSection />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}
