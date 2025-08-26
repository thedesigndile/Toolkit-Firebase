
"use client";

import { useState, useMemo } from "react";
import { tools } from "@/lib/tools";
import { Input } from "./ui/input";
import { ToolCard } from "./tool-card";

export function ToolsSection() {
  const [searchTerm, setSearchTerm] = useState("");

  const categorizedTools = useMemo(() => {
    const filteredTools = tools.filter(tool => 
      tool.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return filteredTools.reduce((acc, tool) => {
      if (!acc[tool.category]) {
        acc[tool.category] = {
          categoryIcon: tool.categoryIcon,
          tools: []
        };
      }
      acc[tool.category].tools.push(tool);
      return acc;
    }, {} as Record<string, { categoryIcon: any; tools: typeof tools }>);
  }, [searchTerm]);

  return (
    <div className="container mx-auto px-4 py-12 md:py-16 lg:py-20">
       <section id="all-tools">
        <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl font-headline">
                Every Tool You Need in One Place
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
                Discover a curated collection of powerful, offline-first tools to boost your productivity and streamline your workflow, all for free.
            </p>
        </div>
        <div className="my-8 mx-auto max-w-lg">
          <Input
            type="search"
            placeholder="Search for a tool..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
            aria-label="Search for a tool"
          />
        </div>

        <div className="space-y-16">
            {Object.entries(categorizedTools)
                .filter(([, { tools }]) => tools.length > 0)
                .map(([category, { categoryIcon: CategoryIcon, tools: categoryTools }]) => (
                    <div key={category} className="space-y-8">
                        <h2 className="text-3xl font-bold flex items-center gap-3">
                            <CategoryIcon className="h-8 w-8 text-primary" />
                            {category}
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                            {categoryTools.map(tool => (
                                <ToolCard key={tool.name} tool={tool} />
                            ))}
                        </div>
                    </div>
            ))}
        </div>
       </section>
    </div>
  );
}
