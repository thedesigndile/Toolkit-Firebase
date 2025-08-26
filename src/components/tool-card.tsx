import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
        "cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-2 relative overflow-hidden border-2 h-full group border-card"
      )}
    >
      <Link href={`/tools/${slug}`} className="block h-full">
        <CardHeader className="flex flex-col items-center justify-center p-6 pb-4">
            <div className="mb-4 rounded-full bg-primary/10 dark:bg-primary/20 p-4 transition-colors duration-300 group-hover:bg-primary/20 dark:group-hover:bg-primary/30">
                <Icon className="h-10 w-10 text-primary transition-all duration-300 group-hover:scale-110 group-hover:rotate-6" />
            </div>
            <CardTitle className="text-lg font-semibold text-center">{tool.name}</CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0 text-center">
            <CardDescription>{tool.description}</CardDescription>
        </CardContent>
      </Link>
    </Card>
  );
}
