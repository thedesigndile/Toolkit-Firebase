"use client";

import { useState, useMemo, useTransition } from "react";
import { tools, featuredTools } from "@/lib/tools";
import { ToolCard } from "./tool-card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { getRecommendedTools } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Lightbulb } from "lucide-react";
import { Card, CardContent } from "./ui/card";

export function ToolsSection() {
  const [searchTerm, setSearchTerm] = useState("");
  const [usedTools, setUsedTools] = useState<string[]>([]);
  const [recommendedTools, setRecommendedTools] = useState<string[]>([]);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const filteredTools = useMemo(() => {
    return tools.filter((tool) =>
      tool.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const handleToolClick = (toolName: string) => {
    setUsedTools((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(toolName)) {
        newSet.delete(toolName);
      } else {
        newSet.add(toolName);
      }
      return Array.from(newSet);
    });
  };

  const handleGetRecommendations = () => {
    if (usedTools.length === 0) {
      toast({
        title: "Select some tools first!",
        description: "Click on the tools you've used to get personalized recommendations.",
        variant: "destructive",
      });
      return;
    }
    startTransition(async () => {
      const result = await getRecommendedTools({ pastTools: usedTools });
      if (result.error) {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
        });
      } else if (result.recommendations) {
        setRecommendedTools(result.recommendations);
        toast({
          title: "Recommendations Ready!",
          description: "We've highlighted some new tools for you below.",
        });
      }
    });
  };

  return (
    <div className="container mx-auto px-4">
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-2 text-center font-headline">Featured Tools</h2>
        <p className="text-center text-muted-foreground mb-8">
            Hand-picked tools to get you started. Click to mark as 'used' for recommendations.
        </p>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-5">
          {featuredTools.map((tool) => (
            <ToolCard
              key={tool.name}
              tool={tool}
              onClick={() => handleToolClick(tool.name)}
              isSelected={usedTools.includes(tool.name)}
              isRecommended={recommendedTools.includes(tool.name)}
            />
          ))}
        </div>
        <div className="mt-8 flex justify-center">
            <Button onClick={handleGetRecommendations} disabled={isPending} size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Lightbulb className="mr-2 h-4 w-4" />}
                Get AI Recommendations
            </Button>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-2 text-center font-headline">All Tools</h2>
        <p className="text-center text-muted-foreground mb-8">
            Explore our full library of offline-first applications.
        </p>
        <div className="mb-8 mx-auto max-w-lg">
          <Input
            type="search"
            placeholder="Search for a tool..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
        
        {filteredTools.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredTools.map((tool) => (
                <ToolCard
                    key={tool.name}
                    tool={tool}
                    onClick={() => handleToolClick(tool.name)}
                    isSelected={usedTools.includes(tool.name)}
                    isRecommended={recommendedTools.includes(tool.name)}
                />
            ))}
            </div>
        ) : (
            <Card className="text-center py-12">
                <CardContent>
                    <h3 className="text-xl font-semibold">No tools found</h3>
                    <p className="text-muted-foreground mt-2">Try adjusting your search term.</p>
                </CardContent>
            </Card>
        )}
      </section>
    </div>
  );
}
