
import { Header } from "@/components/header";
import { ToolsSection } from "@/components/tools-section";
import { Newsletter } from "@/components/newsletter";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 pt-20 md:pt-24 pb-16 md:pb-0">
        <ToolsSection />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}
