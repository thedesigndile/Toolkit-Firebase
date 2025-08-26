
"use client";

import { useState, useMemo, useTransition } from "react";
import Link from 'next/link';
import { tools } from "@/lib/tools";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { getRecommendedTools } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Lightbulb } from "lucide-react";
import { ToolCard } from "./tool-card";

export function ToolsSection() {
  const [searchTerm, setSearchTerm] = useState("");
  const [usedTools, setUsedTools] = useState<string[]>([]);
  const [recommendedTools, setRecommendedTools] = useState<string[]>([]);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleToolClick = (toolName: string) => {
    setUsedTools(prev => 
      prev.includes(toolName) 
        ? prev.filter(t => t !== toolName)
        : [...prev, toolName]
    );
  };

  const filteredTools = useMemo(() => {
    return tools.filter(tool => 
      tool.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const handleGetRecommendations = () => {
    if (usedTools.length === 0) {
      toast({
        title: "Select some tools first!",
        description: "Click on the tools you've used to get personalized AI recommendations.",
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
    <div className="container mx-auto px-4 py-12 md:py-16 lg:py-20">
      <div className="my-8 mx-auto max-w-lg">
          <Input
            type="search"
            placeholder="Search for a tool..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>

        <div className="mt-8 flex justify-center">
            <Button onClick={handleGetRecommendations} disabled={isPending} size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Lightbulb className="mr-2 h-4 w-4" />}
                Get AI Recommendations
            </Button>
        </div>

      <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
        {filteredTools.map(tool => (
          <ToolCard 
            key={tool.name}
            tool={tool}
            onClick={() => handleToolClick(tool.name)}
            isSelected={usedTools.includes(tool.name)}
            isRecommended={recommendedTools.includes(tool.name)}
          />
        ))}
      </div>
    </div>
  );
}
