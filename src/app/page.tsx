
import { Newsletter } from "@/components/newsletter";
import { ToolsSection } from "@/components/tools-section";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <main className="flex-1 pt-24">
        <ToolsSection />
        <Newsletter />
      </main>
    </div>
  );
}
