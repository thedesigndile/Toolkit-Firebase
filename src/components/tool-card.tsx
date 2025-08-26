import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { type Tool } from "@/lib/tools";
import { cn } from "@/lib/utils";
import { CheckCircle2 } from "lucide-react";

interface ToolCardProps {
  tool: Tool;
  onClick: () => void;
  isSelected: boolean;
  isRecommended: boolean;
}

export function ToolCard({ tool, onClick, isSelected, isRecommended }: ToolCardProps) {
  const Icon = tool.icon;
  const slug = tool.name.toLowerCase().replace(/ /g, '-').replace(/&/g, 'and');

  return (
    <Card
      onClick={(e) => {
        onClick();
      }}
      className={cn(
        "cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-2 relative overflow-hidden border-2 h-full group",
        isSelected ? "border-purple-500" : "border-card",
        isRecommended && "border-accent highlight-ai"
      )}
    >
      <Link href={`/tools/${slug}`} className="block">
        {isSelected && (
            <div className="absolute top-2 right-2 z-10 rounded-full bg-purple-500 text-white p-0.5">
                <CheckCircle2 className="h-4 w-4" />
            </div>
        )}
        <CardHeader className="flex flex-col items-center justify-center p-6 pb-4">
            <div className="mb-4 rounded-full bg-purple-100 dark:bg-purple-900/20 p-4 transition-colors duration-300 group-hover:bg-purple-200 dark:group-hover:bg-purple-900/40">
                <Icon className="h-10 w-10 text-purple-600 dark:text-purple-400 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6" />
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
