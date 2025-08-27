
import { ToolsSection } from "@/components/tools-section";
import { SubHeader } from "@/components/sub-header";

export default function ToolsPage() {
    return (
        <>
            <SubHeader />
            <main className="flex-1">
                <ToolsSection />
            </main>
        </>
    );
}
