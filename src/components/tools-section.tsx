"use client";

import { useState, useMemo, useTransition, useEffect } from "react";
import { tools } from "@/lib/tools";
import { ToolCard } from "./tool-card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { getRecommendedTools } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Lightbulb } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

export function ToolsSection() {
  const [searchTerm, setSearchTerm] = useState("");
  const [usedTools, setUsedTools] = useState<string[]>([]);
  const [recommendedTools, setRecommendedTools] = useState<string[]>([]);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const categories = useMemo(() => {
    const categoryOrder = [
        'Organize PDF',
        'Optimize PDF',
        'Convert to PDF',
        'Convert from PDF',
        'Edit PDF',
        'PDF Security',
        'Image Tools',
        'Utility Tools',
    ];
    const categorySet = new Set(tools.map((tool) => tool.category));
    const allCategories = ['All', ...categoryOrder.filter(cat => categorySet.has(cat))];
    return allCategories;
  }, []);

  const [activeTab, setActiveTab] = useState(categories[0]);

  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash) {
      const categoryFromHash = categories.find(cat => cat.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-') === hash);
      if (categoryFromHash) {
        setActiveTab(categoryFromHash);
      }
    }
  }, [categories]);

  const filteredTools = useMemo(() => {
    return tools.filter((tool) => {
      const matchesCategory = activeTab === "All" || tool.category === activeTab;
      const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [searchTerm, activeTab]);

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
    <div className="container mx-auto px-4 py-12 md:py-16 lg:py-20">
       <section id="all-tools">
        <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl font-headline">
              Every Tool You Need in One Place
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-3xl mx-auto">
              Discover a curated collection of powerful, offline-first tools to boost your productivity and streamline your workflow. Select the tools you use and click the button below to get personalized AI recommendations.
            </p>
        </div>
        <div className="mt-8 flex justify-center">
            <Button onClick={handleGetRecommendations} disabled={isPending} size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Lightbulb className="mr-2 h-4 w-4" />}
                Get AI Recommendations
            </Button>
        </div>


        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mt-12">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-9 h-auto">
              {categories.map((category) => (
                  <TabsTrigger key={category} value={category} className="text-xs sm:text-sm"
                    onClick={() => window.history.pushState({}, '', `#${category.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`)}
                  >
                      {category}
                  </TabsTrigger>
              ))}
          </TabsList>

          <div className="my-8 mx-auto max-w-lg">
            <Input
              type="search"
              placeholder="Search for a tool..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
          
          {categories.map(category => (
             <TabsContent key={category} value={category}>
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
                            <p className="text-muted-foreground mt-2">Try adjusting your search or category.</p>
                        </CardContent>
                    </Card>
                )}
             </TabsContent>
          ))}
        </Tabs>
      </section>
    </div>
  );
}
