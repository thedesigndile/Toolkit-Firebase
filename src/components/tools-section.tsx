
"use client";

import { useState, useMemo, useEffect, memo, Suspense } from "react";
import { tools, type Tool } from "@/lib/tools";
import { Input } from "./ui/input";
import { ToolCard } from "./tool-card";
import { Skeleton } from "./ui/skeleton";
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
    { name: "Other Tools", icon: Settings2 },
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
      "Other Tools": true,
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
      return {
        ...categoryInfo,
        tools: categoryTools,
        hasTools: categoryTools.length > 0
      };
    });
  }, [filteredTools]);

  const isSearching = searchTerm.length > 0;

  return (
    <div className="container mx-auto px-4">
       {/* SVG Gradient Definition */}
       <svg width="0" height="0" className="absolute">
         <defs>
           <linearGradient id="blue-purple-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
             <stop offset="0%" stopColor="hsl(var(--primary))" />
             <stop offset="100%" stopColor="hsl(var(--accent))" />
           </linearGradient>
         </defs>
       </svg>

       <section id="all-tools">
        <div className="text-center py-16 md:py-20">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
            <span className="block text-foreground">Every Tool</span>
            <span className="block text-gradient-primary">You Need</span>
          </h1>
          <p className="mt-6 text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Discover a powerful suite of free tools to boost your productivity, streamline your workflow, and handle tasks like PDF editing, image conversion, and more— all right in your browser.
          </p>
          <div className="mt-12 mx-auto max-w-2xl relative">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-6 w-6 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search for any tool..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-16 pr-6 h-16 text-lg rounded-2xl shadow-soft border-border focus:border-primary focus:ring-primary/20"
            />
          </div>
        </div>
            
        <div className="mt-8">
             {isSearching ? (
                 <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                 >
                   {isLoading ? (
                      Array.from({ length: 8 }).map((_, i) => (
                        <Skeleton key={`skeleton-search-${i}`} className="h-48" />
                      ))
                    ) : (
                      filteredTools.map((tool, i) => (
                        <Suspense key={tool.name} fallback={<Skeleton className="h-48" />}>
                          <ToolCard
                              tool={tool}
                              index={i}
                          />
                        </Suspense>
                      ))
                    )}
                </motion.div>
             ) : (
                 <div className="space-y-20">
                    {isLoading ? (
                      Array.from({ length: 3 }).map((_, categoryIndex) => (
                        <div key={`skeleton-category-${categoryIndex}`} className="space-y-8">
                            <div className="flex items-center justify-center gap-3">
                              <Skeleton className="h-7 w-7 rounded-full" />
                              <Skeleton className="h-8 w-48 bg-muted rounded" />
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                              {Array.from({ length: 4 }).map((_, i) => (
                                <Skeleton key={`skeleton-${categoryIndex}-${i}`} className="h-48" />
                              ))}
                            </div>
                        </div>
                      ))
                    ) : (
                      categorizedTools.map(({ name: categoryName, icon: CategoryIcon, tools: categoryTools, hasTools }) => (
                        <ScrollReveal key={categoryName} animation="slideUp" className="category-section rounded-3xl p-8 space-y-8">
                            <ScrollReveal animation="fade" delay={200}>
                                <div className="flex items-center justify-center gap-4 text-center">
                                    <CategoryIcon className="h-10 w-10 text-primary" />
                                    <h2 className="text-4xl font-bold text-foreground category-heading" data-category={categoryName}>{categoryName}</h2>
                                    <button
                                        onClick={() => toggleCategory(categoryName)}
                                        className="ml-3 p-2 hover:scale-110 transition-all duration-300"
                                        aria-label={expandedCategories[categoryName] ? `Collapse ${categoryName}` : `Expand ${categoryName}`}
                                    >
                                        {expandedCategories[categoryName] ? (
                                            <ChevronDown className="h-8 w-8 text-primary" />
                                        ) : (
                                            <ChevronRight className="h-8 w-8 text-primary" />
                                        )}
                                    </button>
                                </div>
                            </ScrollReveal>
                            {expandedCategories[categoryName] && (
                                <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" staggerDelay={0.05}>
                                    {hasTools ? (
                                        categoryTools.map((tool, i) => (
                                            <StaggerItem key={tool.name}>
                                              <Suspense fallback={<Skeleton className="h-48" />}>
                                                <ToolCard
                                                  tool={tool}
                                                  index={i}
                                                />
                                              </Suspense>
                                            </StaggerItem>
                                        ))
                                    ) : (
                                        <div className="col-span-full text-center py-8">
                                            <p className="text-muted-foreground">Tools coming soon for this category</p>
                                        </div>
                                    )}
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
