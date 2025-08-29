
"use client";

import { useState, useMemo, useEffect, memo, Suspense } from "react";
import { tools, type Tool } from "@/lib/tools";
import { Input } from "./ui/input";
import { ToolCard } from "./tool-card";
import { ToolCardSkeleton } from "./ui/skeleton";
import { Calculator, FileText, Image, Search, Video, Package, TerminalSquare, AudioWaveform, Pencil, Settings2, Shield, Layers, ArrowRightLeft, SigmaSquare } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ScrollReveal, StaggerContainer, StaggerItem } from "./scroll-reveal";
import { AnimatedHeroBackground } from "./animated-hero-background";


const CATEGORIES = [
    { name: "All", icon: null },
    { name: "Organize PDF", icon: Layers },
    { name: "Edit PDF", icon: Pencil },
    { name: "Optimize PDF", icon: Settings2 },
    { name: "Convert PDF", icon: ArrowRightLeft },
    { name: "PDF Security", icon: Shield },
    { name: "Image Tools", icon: Image },
    { name: "Video Tools", icon: Video },
    { name: "Audio Tools", icon: AudioWaveform },
    { name: "Converters", icon: ArrowRightLeft },
    { name: "Utility Tools", icon: TerminalSquare },
    { name: "Archive Tools", icon: Package },
];


export function ToolsSection() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("All");
  const [isLoading, setIsLoading] = useState(true);

  const filteredTools = useMemo(() => {
    // If there's a search term, filter all tools regardless of the active tab.
    if (searchTerm) {
        return tools.filter(tool => 
            tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            tool.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }
    // If no search term, filter by the active category.
    return tools.filter(tool => activeTab === 'All' || tool.category === activeTab);
  }, [searchTerm, activeTab]);

  // Simulate initial loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  const categorizedTools = useMemo(() => {
    if (activeTab !== 'All' || searchTerm) {
        return [];
    }

    const grouped = filteredTools.reduce((acc, tool) => {
      const category = tool.category;
      if (!acc[category]) {
        acc[category] = {
          categoryIcon: tool.categoryIcon,
          tools: []
        };
      }
      acc[category].tools.push(tool);
      return acc;
    }, {} as Record<string, { categoryIcon: any; tools: Tool[] }>);

    return CATEGORIES
      .map(cat => cat.name)
      .slice(1) // Skip "All"
      .map(category => {
        if (grouped[category]) {
          return [category, grouped[category]];
        }
        return null;
      })
      .filter(Boolean) as [string, { categoryIcon: any; tools: Tool[] }][];

  }, [filteredTools, activeTab, searchTerm]);

  const handleTabChange = (value: string) => {
      setActiveTab(value);
      setSearchTerm(""); // Clear search when changing tabs
  }

  const isShowingCategorizedView = activeTab === 'All' && !searchTerm;

  return (
    <div className="container mx-auto px-4">
       <section id="all-tools">
        <div className="relative text-center max-w-5xl mx-auto mb-8 overflow-hidden rounded-3xl">
           <AnimatedHeroBackground />
           <div className="relative z-10 py-16 md:py-20">
              <ScrollReveal animation="slideUp" delay={0}>
                <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-shadow text-white mb-6">
                  <span className="block">Every Tool</span>
                  <span className="block text-gradient-blue">You Need</span>
                </h1>
              </ScrollReveal>

              <ScrollReveal animation="slideUp" delay={200}>
                <p className="mt-6 text-lg md:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed px-4">
                  Discover a powerful suite of free tools to boost your productivity, streamline your workflow, and handle tasks like PDF editing, image conversion, and more— all right in your browser.
                </p>
              </ScrollReveal>

              <ScrollReveal animation="scale" delay={400}>
                <div className="my-10 mx-auto max-w-lg relative px-4">
                  <Search className="absolute left-8 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" aria-hidden="true" />
                  <Input
                    type="search"
                    placeholder="Search for any tool..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 h-14 md:h-16 text-base md:text-lg rounded-full shadow-xl border-2 border-transparent focus:border-brand-blue/30 transition-all duration-300 bg-white/90"
                    aria-label="Search for a tool"
                    role="searchbox"
                  />
                </div>
              </ScrollReveal>

              <ScrollReveal animation="fade" delay={600}>
                <div className="flex flex-wrap justify-center gap-4 mt-8">
                  <div className="flex items-center gap-2 text-sm text-white/80">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span>Free & Unlimited</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-white/80">
                    <div className="w-2 h-2 bg-sky-400 rounded-full animate-pulse"></div>
                    <span>No Registration</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-white/80">
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                    <span>Browser-Based</span>
                  </div>
                </div>
              </ScrollReveal>
           </div>
        </div>

        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
            {!searchTerm && (
              <div className="flex justify-center mb-2 px-4">
                  <TabsList
                    className="h-auto w-full max-w-5xl overflow-x-auto hide-scrollbar bg-transparent p-1 flex-wrap justify-center gap-2"
                    role="tablist"
                    aria-label="Tool categories"
                  >
                      {CATEGORIES.map(({name, icon: Icon}) => (
                          <TabsTrigger
                            key={name}
                            value={name}
                            className="px-3 py-2 whitespace-nowrap min-h-[44px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            aria-label={`${name} tools`}
                          >
                            {Icon && <Icon className="h-4 w-4 mr-2" aria-hidden="true" />}
                            <span className="text-sm md:text-base">{name}</span>
                          </TabsTrigger>
                      ))}
                  </TabsList>
              </div>
            )}
            
            <div className="mt-8">
                 {isShowingCategorizedView ? (
                     <div className="space-y-12">
                        {isLoading ? (
                          // Show skeleton categories while loading
                          Array.from({ length: 3 }, (_, categoryIndex) => (
                            <div key={`skeleton-category-${categoryIndex}`} className="space-y-6">
                                <div className="flex items-center justify-center gap-3">
                                  <div className="h-7 w-7 bg-muted rounded animate-pulse" />
                                  <div className="h-8 w-32 bg-muted rounded animate-pulse" />
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                  {Array.from({ length: 4 }, (_, i) => (
                                    <ToolCardSkeleton key={`skeleton-${categoryIndex}-${i}`} />
                                  ))}
                                </div>
                            </div>
                          ))
                        ) : (
                          categorizedTools.map(([category, { categoryIcon: CategoryIcon, tools: categoryTools }]) => (
                            <ScrollReveal key={category} animation="slideUp" className="space-y-6">
                                <ScrollReveal animation="fade" delay={200}>
                                  <h2 className="text-2xl font-semibold flex items-center justify-center gap-3 text-center">
                                      <CategoryIcon className="h-7 w-7 text-brand-blue" strokeWidth={1.5} />
                                      {category}
                                  </h2>
                                </ScrollReveal>
                                <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" staggerDelay={0.1}>
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
                            </ScrollReveal>
                          ))
                        )}
                    </div>
                 ) : (
                    <motion.div
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                    >
                       {isLoading ? (
                          // Show skeleton cards while loading
                          Array.from({ length: 8 }, (_, i) => (
                            <ToolCardSkeleton key={`skeleton-${i}`} />
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
                 )}

                {filteredTools.length === 0 && !isLoading && (
                  <div className="text-center py-16">
                    <p className="text-lg text-muted-foreground">
                        {searchTerm ? `No tools found for "${searchTerm}".` : `No tools in this category.`}
                    </p>
                  </div>
                )}
            </div>
        </Tabs>
       </section>
    </div>
  );
}

    