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
    <Link href={`/tools/${slug}`} className="block group">
        <Card
        className={cn(
            "cursor-pointer transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-2 relative overflow-hidden bg-card h-full border-2 border-transparent group-hover:border-accent/80"
        )}
        >
            <CardContent className="p-6">
                <div className="flex items-start gap-4">
                    <div className="rounded-lg bg-accent/10 p-3 transition-colors duration-300 group-hover:bg-accent/20">
                        <Icon className="h-6 w-6 text-accent transition-all duration-300 group-hover:scale-110 group-hover:-rotate-6" />
                    </div>
                    <div className="flex-1">
                        <p className="text-base font-semibold">{tool.name}</p>
                        <p className="text-sm text-muted-foreground mt-1">{tool.description}</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    </Link>
  );
}
