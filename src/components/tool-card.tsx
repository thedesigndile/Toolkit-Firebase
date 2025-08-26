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

  return (
    <Card
      onClick={onClick}
      className={cn(
        "cursor-pointer transition-all hover:shadow-lg hover:-translate-y-1 relative group overflow-hidden border-2 border-transparent",
        isSelected && "border-primary",
        isRecommended && "border-accent highlight-ai"
      )}
    >
        {isSelected && (
            <div className="absolute top-2 right-2 z-10 rounded-full bg-primary text-primary-foreground p-0.5">
                <CheckCircle2 className="h-4 w-4" />
            </div>
        )}
        <CardHeader className="flex flex-col items-center justify-center p-6 pb-4">
            <div className="mb-4 rounded-full bg-secondary p-4">
                <Icon className="h-10 w-10 text-primary transition-transform group-hover:scale-110" />
            </div>
            <CardTitle className="text-lg font-semibold text-center">{tool.name}</CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0 text-center">
            <CardDescription>{tool.description}</CardDescription>
        </CardContent>
    </Card>
  );
}
