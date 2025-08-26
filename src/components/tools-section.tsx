
"use client";

import { useState, useMemo } from "react";
import Link from 'next/link';
import { tools } from "@/lib/tools";
import { Input } from "./ui/input";

export function ToolsSection() {
  const [searchTerm, setSearchTerm] = useState("");

  const categorizedTools = useMemo(() => {
    return tools.reduce((acc, tool) => {
      if (!acc[tool.category]) {
        acc[tool.category] = {
          categoryIcon: tool.categoryIcon,
          tools: []
        };
      }
      if (tool.name.toLowerCase().includes(searchTerm.toLowerCase())) {
        acc[tool.category].tools.push(tool);
      }
      return acc;
    }, {} as Record<string, { categoryIcon: any; tools: typeof tools }>);
  }, [searchTerm]);

  return (
    <div className="container mx-auto px-4 py-12 md:py-16 lg:py-20">
       <section id="all-tools">
        <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl font-headline">
                Every Tool You Need to Work with PDFs in One Place
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
          />
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
            {Object.entries(categorizedTools)
                .filter(([, { tools }]) => tools.length > 0)
                .map(([category, { categoryIcon: CategoryIcon, tools: categoryTools }]) => (
                    <div key={category} className="space-y-4">
                        <h2 className="text-2xl font-semibold flex items-center gap-3">
                            <CategoryIcon className="h-6 w-6 text-primary" />
                            {category}
                        </h2>
                        <ul className="space-y-2">
                            {categoryTools.map(tool => {
                                const slug = tool.name.toLowerCase().replace(/ /g, '-').replace(/&/g, 'and');
                                return (
                                    <li key={tool.name}>
                                        <Link href={`/tools/${slug}`} className="flex items-center gap-3 p-2 rounded-md hover:bg-muted transition-colors">
                                            <tool.icon className="h-5 w-5 text-muted-foreground" />
                                            <span>{tool.name}</span>
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
            ))}
        </div>
       </section>
    </div>
  );
}
