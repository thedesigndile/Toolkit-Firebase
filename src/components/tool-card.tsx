import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
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
          "cursor-pointer transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-2 relative overflow-hidden bg-card h-full border"
        )}
      >
        <CardContent className="p-5 flex flex-col items-center text-center aspect-square justify-center">
          <div className="transition-all duration-300 group-hover:scale-110 mb-3">
            <Icon className="h-12 w-12" />
          </div>
          <p className="text-base font-semibold leading-tight">{tool.name}</p>
          <p className="text-sm text-muted-foreground mt-2">{tool.description}</p>
        </CardContent>
      </Card>
    </Link>
  );
}
