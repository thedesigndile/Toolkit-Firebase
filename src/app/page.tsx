
import { Newsletter } from "@/components/newsletter";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <main className="flex-1 pt-20">
        <section className="container mx-auto px-4 py-24 text-center">
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-6 text-gradient-primary">
                Your Ultimate Digital Toolkit
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                Discover a powerful suite of tools to boost your productivity and streamline your workflow, all for free and right in your browser.
            </p>
        </section>
        <Newsletter />
      </main>
    </div>
  );
}
