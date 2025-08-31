
import { ToolsSection } from "@/components/tools-section";
import { Footer } from "@/components/footer";

export default function ToolsPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-1 pt-24">
                <ToolsSection />
            </main>
            <Footer />
        </div>
    );
}
