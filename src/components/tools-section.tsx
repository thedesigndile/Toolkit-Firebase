
"use client";

import { useState, useMemo } from "react";
import { tools, type Tool } from "@/lib/tools";
import { Input } from "./ui/input";
import { ToolCard } from "./tool-card";
import { Calculator, FileText, Image, Search, Video, Package, TerminalSquare, AudioWaveform, Pencil, Settings2, Shield, Layers, ArrowRightLeft, SigmaSquare } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

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


const FloatingIcon = ({ icon: Icon, className }: { icon: React.ElementType, className?: string }) => (
    <motion.div
      className={cn("absolute rounded-full p-3 shadow-lg bg-card border", className)}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "backOut" }}
    >
      <Icon className="h-6 w-6" strokeWidth={1.5} />
    </motion.div>
);

export function ToolsSection() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("All");

  const filteredTools = useMemo(() => {
    return tools.filter(tool => {
        const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              tool.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = activeTab === 'All' || tool.category === activeTab;
        return matchesCategory && matchesSearch;
    });
  }, [searchTerm, activeTab]);

  const categorizedTools = useMemo(() => {
    if (activeTab !== 'All') {
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

  }, [filteredTools, activeTab]);

  const handleTabChange = (value: string) => {
      setActiveTab(value);
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
       <section id="all-tools" className="pb-8 md:pb-12">
        <div className="relative text-center max-w-4xl mx-auto mb-12 overflow-hidden py-10">
           <div className="absolute inset-0 -z-10 hero-gradient rounded-3xl" />
            <FloatingIcon icon={FileText} className="top-0 left-10 text-red-500 animate-float-1" />
            <FloatingIcon icon={Image} className="top-1/2 -left-4 text-blue-500 animate-float" />
            <FloatingIcon icon={Video} className="bottom-0 left-20 text-green-500 animate-float-2" />
            <FloatingIcon icon={Calculator} className="top-0 right-10 text-purple-500 animate-float-2" />
            <FloatingIcon icon={Search} className="top-1/2 -right-4 text-orange-500 animate-float" />

            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl text-shadow text-foreground">
                Every Tool You Need
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
                 Discover a powerful suite of free tools to boost your productivity, streamline your workflow, and handle tasks like PDF editing, image conversion, and more— all right in your browser.
            </p>
            <div className="my-8 mx-auto max-w-lg relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" strokeWidth={1.5} />
              <Input
                type="search"
                placeholder="Search for any tool..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 h-14 text-base rounded-full shadow-lg"
                aria-label="Search for a tool"
              />
            </div>
        </div>

        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
            <div className="flex justify-center mb-2">
                <TabsList className="h-auto w-full max-w-5xl overflow-x-auto hide-scrollbar bg-transparent p-1 flex-wrap justify-center gap-2">
                    {CATEGORIES.map(({name, icon: Icon}) => (
                        <TabsTrigger key={name} value={name} className="px-4 whitespace-nowrap">
                           {Icon && <Icon className="h-4 w-4 mr-2" strokeWidth={1.5} />}
                           {name}
                        </TabsTrigger>
                    ))}
                </TabsList>
            </div>
            
            <div className="mt-8">
                 {activeTab === 'All' ? (
                     <div className="space-y-12">
                        {categorizedTools.map(([category, { categoryIcon: CategoryIcon, tools: categoryTools }]) => (
                            <div key={category} className="space-y-6">
                                <h2 className="text-2xl font-semibold flex items-center justify-center gap-3 text-center">
                                    <CategoryIcon className="h-7 w-7 text-brand-blue" strokeWidth={1.5} />
                                    {category}
                                </h2>
                                <motion.div
                                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                                >
                                    {categoryTools.map((tool, i) => (
                                        <ToolCard
                                          key={tool.name}
                                          tool={tool}
                                          index={i}
                                        />
                                    ))}
                                </motion.div>
                            </div>
                        ))}
                    </div>
                 ) : (
                    <motion.div
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                    >
                       {filteredTools.map((tool, i) => (
                            <ToolCard
                                key={tool.name}
                                tool={tool}
                                index={i}
                            />
                        ))}
                    </motion.div>
                 )}

                {filteredTools.length === 0 && (
                  <div className="text-center py-16">
                    <p className="text-lg text-muted-foreground">
                        {`No tools found for "${searchTerm}" in this category.`}
                    </p>
                  </div>
                )}
            </div>
        </Tabs>
       </section>
    </div>
  );
}
