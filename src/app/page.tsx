
import { Header } from "@/components/header";
import { ToolsSection } from "@/components/tools-section";
import { Newsletter } from "@/components/newsletter";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 pt-20">
        <ToolsSection />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}
