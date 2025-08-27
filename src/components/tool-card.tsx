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
            "cursor-pointer transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1 relative overflow-hidden bg-card h-full border",
        )}
        >
            <CardContent className="p-6">
                <div className="flex items-start gap-4">
                    <div className="transition-all duration-300 group-hover:scale-105">
                        <Icon className="h-10 w-10" />
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
