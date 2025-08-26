import { Header } from "@/components/header";
import { ToolsSection } from "@/components/tools-section";
import { Newsletter } from "@/components/newsletter";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="container mx-auto px-4 py-12 md:py-16 lg:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl font-headline">
              Every Tool You Need to Work with PDFs in One Place
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              Discover a curated collection of powerful, offline-first tools to boost your productivity and streamline your workflow, all for free.
            </p>
          </div>
        </section>
        
        <ToolsSection />

        <Newsletter />
      </main>
      <footer className="py-8 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Dile Tool. All Rights Reserved.
      </footer>
    </div>
  );
}
