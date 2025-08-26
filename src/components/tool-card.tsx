import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type Tool } from "@/lib/tools";
import { cn } from "@/lib/utils";

interface ToolCardProps {
  tool: Tool;
}

export function ToolCard({ tool }: ToolCardProps) {
  const Icon = tool.icon;
  const slug = tool.name.toLowerCase().replace(/ /g, '-').replace(/&/g, 'and');

  return (
    <Card
      className={cn(
        "cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 relative overflow-hidden group border-2 border-transparent hover:border-accent/50 bg-card h-full"
      )}
    >
      <Link href={`/tools/${slug}`} className="block h-full p-6">
        <div className="flex items-start gap-4">
            <div className="rounded-lg bg-accent/10 p-3 transition-colors duration-300 group-hover:bg-accent/20">
                <Icon className="h-6 w-6 text-accent transition-all duration-300 group-hover:scale-110" />
            </div>
            <div className="flex-1">
                <CardTitle className="text-base font-semibold">{tool.name}</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">{tool.description}</p>
            </div>
        </div>
      </Link>
    </Card>
  );
}
