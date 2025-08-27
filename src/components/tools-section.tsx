
"use client";

import { useState, useMemo } from "react";
import { tools, type Tool } from "@/lib/tools";
import { Input } from "./ui/input";
import { ToolCard } from "./tool-card";
import { Search } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

const CATEGORIES = [
    "All",
    "Organize PDF",
    "Optimize PDF",
    "Convert PDF",
    "Edit PDF",
    "PDF Security",
    "Image Tools",
    "Utility Tools",
];

export function ToolsSection() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("All");

  const filteredTools = useMemo(() => {
    return tools.filter(tool => {
        const matchesCategory = activeTab === 'All' || tool.category === activeTab;
        const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              tool.description.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });
  }, [searchTerm, activeTab]);

  const categorizedTools = useMemo(() => {
    const grouped = filteredTools.reduce((acc, tool) => {
      if (!acc[tool.category]) {
        acc[tool.category] = {
          categoryIcon: tool.categoryIcon,
          tools: []
        };
      }
      acc[tool.category].tools.push(tool);
      return acc;
    }, {} as Record<string, { categoryIcon: any; tools: Tool[] }>);
    
    return Object.entries(grouped);

  }, [filteredTools]);

  return (
    <div className="container mx-auto px-4 py-12 md:py-16 lg:py-20">
       <section id="all-tools">
        <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl font-headline text-shadow">
                Every Tool You Need
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
                Discover a powerful suite of tools to boost your productivity and streamline your workflow, all for free and right in your browser.
            </p>
        </div>
        <div className="my-12 mx-auto max-w-lg relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search for any tool..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 h-12 text-base"
            aria-label="Search for a tool"
          />
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="flex justify-center">
                <TabsList className="h-auto w-full max-w-5xl overflow-x-auto hide-scrollbar">
                    {CATEGORIES.map(category => (
                        <TabsTrigger key={category} value={category} className="px-4 whitespace-nowrap">{category}</TabsTrigger>
                    ))}
                </TabsList>
            </div>

            <TabsContent value={activeTab} className="mt-12">
                 <div className="space-y-16">
                    {categorizedTools.map(([category, { categoryIcon: CategoryIcon, tools: categoryTools }]) => (
                        <div key={category} className="space-y-8">
                             {activeTab === 'All' && (
                                <h2 className="text-2xl font-bold font-headline flex items-center justify-center gap-3 text-center">
                                    <CategoryIcon className="h-7 w-7 text-brand-blue" />
                                    {category}
                                </h2>
                            )}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {categoryTools.map(tool => (
                                    <ToolCard key={tool.name} tool={tool} />
                                ))}
                            </div>
                        </div>
                    ))}
                    {categorizedTools.length === 0 && (
                      <div className="text-center py-16">
                        <p className="text-lg text-muted-foreground">No tools found for "{searchTerm}" in this category.</p>
                      </div>
                    )}
                </div>
            </TabsContent>
        </Tabs>
       </section>
    </div>
  );
}
