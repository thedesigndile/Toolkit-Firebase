
"use client";

import { useState, useMemo, useEffect, memo, Suspense } from "react";
import { tools, type Tool } from "@/lib/tools";
import { Input } from "./ui/input";
import { ToolCard } from "./tool-card";
import { ToolCardSkeleton, Skeleton } from "./ui/skeleton";
import { Calculator, FileText, Image, Search, Video, Package, TerminalSquare, AudioWaveform, Pencil, Settings2, Shield, Layers, ArrowRightLeft, SigmaSquare, Rocket, ChevronDown, ChevronRight, GitCompareArrows } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ScrollReveal, StaggerContainer, StaggerItem } from "./scroll-reveal";


const CATEGORIES = [
    { name: "Edit PDF", icon: Pencil },
    { name: "Convert PDF", icon: ArrowRightLeft },
    { name: "Protect & Secure", icon: Shield },
    { name: "View & Organize", icon: Layers },
    { name: "Image Tools", icon: Image },
    { name: "Video Tools", icon: Video },
    { name: "Audio Tools", icon: AudioWaveform },
    { name: "Utility Tools", icon: TerminalSquare },
    { name: "Converters", icon: GitCompareArrows },
    { name: "Archive Tools", icon: Package },
    { name: "Advanced Features", icon: Rocket },
];


export function ToolsSection() {
   const [searchTerm, setSearchTerm] = useState("");
   const [isLoading, setIsLoading] = useState(true);
   const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
      "Edit PDF": true,
      "Convert PDF": true,
      "Protect & Secure": true,
      "View & Organize": true,
      "Image Tools": true,
      "Video Tools": true,
      "Audio Tools": true,
      "Utility Tools": true,
      "Converters": true,
      "Archive Tools": true,
      "Advanced Features": true,
   });

   const toggleCategory = (category: string) => {
      setExpandedCategories(prev => ({
         ...prev,
         [category]: !prev[category]
      }));
   };

  const filteredTools = useMemo(() => {
    return tools.filter(tool =>
        tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  // Simulate initial loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  const categorizedTools = useMemo(() => {
    return CATEGORIES.map(categoryInfo => {
      const categoryTools = filteredTools.filter(tool => tool.category === categoryInfo.name);
      if (categoryTools.length > 0) {
        return {
          ...categoryInfo,
          tools: categoryTools
        };
      }
      return null;
    }).filter(Boolean) as ({ name: string; icon: any; tools: Tool[] })[];
  }, [filteredTools]);

  const isSearching = searchTerm.length > 0;

  return (
    <div className="container mx-auto px-4">
       {/* SVG Gradient Definition */}
       <svg width="0" height="0" className="absolute">
         <defs>
           <linearGradient id="blue-purple-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
             <stop offset="0%" stopColor="hsl(var(--brand-blue-raw))" />
             <stop offset="100%" stopColor="hsl(var(--brand-purple-raw))" />
           </linearGradient>
         </defs>
       </svg>

       <section id="all-tools">
        <div className="text-center py-12 md:py-16">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            <span className="block">Every Tool</span>
            <span className="block text-gradient-primary">You Need</span>
          </h1>
          <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover a powerful suite of free tools to boost your productivity, streamline your workflow, and handle tasks like PDF editing, image conversion, and more— all right in your browser.
          </p>
          <div className="mt-8 mx-auto max-w-lg relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search for any tool..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 h-14 text-lg rounded-full shadow-md"
            />
          </div>
        </div>
            
        <div className="mt-8">
             {isSearching ? (
                 <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                 >
                   {isLoading ? (
                      Array.from({ length: 8 }).map((_, i) => (
                        <ToolCardSkeleton key={`skeleton-search-${i}`} />
                      ))
                    ) : (
                      filteredTools.map((tool, i) => (
                        <Suspense key={tool.name} fallback={<ToolCardSkeleton />}>
                          <ToolCard
                              tool={tool}
                              index={i}
                          />
                        </Suspense>
                      ))
                    )}
                </motion.div>
             ) : (
                 <div className="space-y-16">
                    {isLoading ? (
                      Array.from({ length: 3 }).map((_, categoryIndex) => (
                        <div key={`skeleton-category-${categoryIndex}`} className="space-y-8">
                            <div className="flex items-center justify-center gap-3">
                              <Skeleton className="h-7 w-7 rounded-full" />
                              <Skeleton className="h-8 w-48 bg-muted rounded" />
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                              {Array.from({ length: 4 }).map((_, i) => (
                                <ToolCardSkeleton key={`skeleton-${categoryIndex}-${i}`} />
                              ))}
                            </div>
                        </div>
                      ))
                    ) : (
                      categorizedTools.map(({ name: categoryName, icon: CategoryIcon, tools: categoryTools }) => (
                        <ScrollReveal key={categoryName} animation="slideUp" className="space-y-8">
                            <ScrollReveal animation="fade" delay={200}>
                                <div className="flex items-center justify-center gap-3 text-center relative z-10">
                                    <div className="p-2 rounded-full bg-primary/10">
                                        <CategoryIcon className="h-6 w-6 text-primary" />
                                    </div>
                                    <h2 className="text-3xl font-bold">{categoryName}</h2>
                                    <button
                                        onClick={() => toggleCategory(categoryName)}
                                        className="ml-2 p-1 rounded-full hover:bg-muted transition-colors"
                                        aria-label={expandedCategories[categoryName] ? `Collapse ${categoryName}` : `Expand ${categoryName}`}
                                    >
                                        <div className="p-1 rounded-full bg-primary/10">
                                            {expandedCategories[categoryName] ? (
                                                <ChevronDown className="h-5 w-5 text-primary" />
                                            ) : (
                                                <ChevronRight className="h-5 w-5 text-primary" />
                                            )}
                                        </div>
                                    </button>
                                </div>
                            </ScrollReveal>
                            {expandedCategories[categoryName] && (
                                <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 relative z-10" staggerDelay={0.05}>
                                    {categoryTools.map((tool, i) => (
                                        <StaggerItem key={tool.name}>
                                          <Suspense fallback={<ToolCardSkeleton />}>
                                            <ToolCard
                                              tool={tool}
                                              index={i}
                                            />
                                          </Suspense>
                                        </StaggerItem>
                                    ))}
                                </StaggerContainer>
                            )}
                        </ScrollReveal>
                      ))
                    )}
                </div>
             )}

            {filteredTools.length === 0 && !isLoading && (
              <div className="text-center py-16">
                <p className="text-lg text-muted-foreground">
                    {searchTerm ? `No tools found for "${searchTerm}".` : `No tools in this category.`}
                </p>
              </div>
            )}
        </div>
       </section>
    </div>
  );
}
