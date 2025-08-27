
"use client";

import { useState, useMemo, useEffect } from "react";
import { tools, type Tool } from "@/lib/tools";
import { Input } from "./ui/input";
import { ToolCard } from "./tool-card";
import { Calculator, FileText, Image, Search, Video, Star } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const PDF_CATEGORIES = [
    "Favorites",
    "All",
    "Organize PDF",
    "Optimize PDF",
    "Convert PDF",
    "Edit PDF",
    "PDF Security",
];

const OTHER_CATEGORIES = [
    "Image Tools",
    "Video Tools",
    "Utility Tools",
]

const ALL_CATEGORIES = [...PDF_CATEGORIES.slice(2), ...OTHER_CATEGORIES];


const FloatingIcon = ({ icon: Icon, className }: { icon: React.ElementType, className?: string }) => (
    <motion.div
      className={cn("absolute rounded-full p-3 shadow-lg bg-card border", className)}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "backOut" }}
    >
      <Icon className="h-6 w-6" />
    </motion.div>
);

export function ToolsSection() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("All");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    try {
        const storedFavorites = localStorage.getItem("favoriteTools");
        if (storedFavorites) {
            setFavorites(JSON.parse(storedFavorites));
        }
    } catch (error) {
        console.error("Could not load favorites from localStorage", error);
    }
  }, []);

  const toggleFavorite = (toolName: string) => {
    setFavorites(prevFavorites => {
        const newFavorites = prevFavorites.includes(toolName)
            ? prevFavorites.filter(name => name !== toolName)
            : [...prevFavorites, toolName];
        try {
            localStorage.setItem("favoriteTools", JSON.stringify(newFavorites));
        } catch (error) {
            console.error("Could not save favorites to localStorage", error);
        }
        return newFavorites;
    });
  }

  const filteredTools = useMemo(() => {
    if (!isMounted && activeTab === 'Favorites') return [];
    
    return tools.filter(tool => {
        const matchesCategory = activeTab === 'All' || 
                              (activeTab === 'Favorites' ? favorites.includes(tool.name) : tool.category === activeTab);
        
        const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              tool.description.toLowerCase().includes(searchTerm.toLowerCase());
                              
        if (activeTab === 'Favorites') {
            return favorites.includes(tool.name) && matchesSearch;
        }

        return matchesCategory && matchesSearch;
    });
  }, [searchTerm, activeTab, favorites, isMounted]);

  const categorizedTools = useMemo(() => {
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

    return ALL_CATEGORIES
      .map(category => {
        if (grouped[category]) {
          return [category, grouped[category]];
        }
        return null;
      })
      .filter(Boolean) as [string, { categoryIcon: any; tools: Tool[] }][];

  }, [filteredTools]);
  
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
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
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
                <TabsList className="h-auto w-full max-w-5xl overflow-x-auto hide-scrollbar bg-muted/80 rounded-full p-1">
                    {PDF_CATEGORIES.map(category => (
                        <TabsTrigger key={category} value={category} className="px-4 whitespace-nowrap rounded-full">
                           {category === 'Favorites' && <Star className="h-4 w-4 mr-2" />}
                           {category}
                        </TabsTrigger>
                    ))}
                </TabsList>
            </div>
             <div className="flex justify-center">
                <TabsList className="h-auto w-full max-w-5xl overflow-x-auto hide-scrollbar bg-muted/80 rounded-full p-1">
                    {OTHER_CATEGORIES.map(category => (
                        <TabsTrigger key={category} value={category} className="px-4 whitespace-nowrap rounded-full">{category}</TabsTrigger>
                    ))}
                </TabsList>
            </div>

            <TabsContent value={activeTab} className="mt-8">
                 <div className="space-y-12">
                    {categorizedTools.map(([category, { categoryIcon: CategoryIcon, tools: categoryTools }]) => (
                        <div key={category} className="space-y-6">
                             {activeTab === 'All' && (
                                <h2 className="text-2xl font-semibold flex items-center justify-center gap-3 text-center">
                                    <CategoryIcon className="h-7 w-7 text-brand-blue" />
                                    {category}
                                </h2>
                            )}
                            <motion.div
                                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
                            >
                                {categoryTools.map((tool, i) => (
                                    <ToolCard 
                                      key={tool.name} 
                                      tool={tool} 
                                      index={i} 
                                      isFavorite={favorites.includes(tool.name)}
                                      onToggleFavorite={toggleFavorite}
                                      isHighlighted={searchTerm.length > 1 && (tool.name.toLowerCase().includes(searchTerm.toLowerCase()) || tool.description.toLowerCase().includes(searchTerm.toLowerCase()))}
                                    />
                                ))}
                            </motion.div>
                        </div>
                    ))}
                    {isMounted && filteredTools.length === 0 && (
                      <div className="text-center py-16">
                        <p className="text-lg text-muted-foreground">
                            {activeTab === 'Favorites' 
                                ? "You haven't favorited any tools yet. Click the star on a tool to add it here!"
                                : `No tools found for "${searchTerm}" in this category.`
                            }
                        </p>
                      </div>
                    )}
                </div>
            </TabsContent>
        </Tabs>
       </section>
    </div>
  );
}

    