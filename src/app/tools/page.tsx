
import { ToolsSection } from "@/components/tools-section";
import { Footer } from "@/components/footer";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export default function ToolsPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-1 pt-24">
                {/* Breadcrumb Navigation */}
                <div className="container mx-auto px-4 py-4">
                    <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Link href="/" className="flex items-center hover:text-foreground transition-colors">
                            <Home className="h-4 w-4 mr-1" />
                            Home
                        </Link>
                        <ChevronRight className="h-4 w-4" />
                        <span className="text-foreground font-medium">All Tools</span>
                    </nav>
                </div>
                <ToolsSection />
            </main>
            <Footer />
        </div>
    );
}
