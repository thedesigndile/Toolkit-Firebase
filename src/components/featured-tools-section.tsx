
"use client";

import { useState, useEffect } from "react";
import { tools, type Tool } from "@/lib/tools";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Sparkles, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import { ScrollReveal, StaggerContainer, StaggerItem } from "./scroll-reveal";

// Define featured tools - initially based on new/popular tools, can be made dynamic later
const FEATURED_TOOLS = [
  'PDF to Word',
  'Website to PDF',
  'Background Remover',
  'Voice Recorder',
  'Password Generator',
  'Notepad'
];

export function FeaturedToolsSection() {
  const [featuredTools, setFeaturedTools] = useState<Tool[]>([]);

  useEffect(() => {
    // Get featured tools from the tools list
    const featured = tools.filter(tool =>
      FEATURED_TOOLS.includes(tool.name)
    );
    setFeaturedTools(featured);
  }, []);

  if (featuredTools.length === 0) return null;

  return (
    <section className="py-16 md:py-20">
      <div className="container mx-auto px-4">
        <ScrollReveal animation="slideUp" className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-accent/10 px-4 py-2 rounded-full mb-4">
            <Sparkles className="h-4 w-4 text-accent" />
            <span className="text-sm font-medium text-accent">Featured</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Most Popular Tools
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our most loved tools that thousands of users rely on daily for their productivity needs.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <StaggerContainer className="contents" staggerDelay={0.1}>
            {featuredTools.map((tool) => (
              <StaggerItem key={tool.name}>
                <motion.div
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card className="group relative overflow-hidden border-2 hover:border-primary/20 transition-all duration-300 h-full">
                    {/* Popular badge */}
                    <div className="absolute top-3 right-3 z-10">
                      <Badge variant="secondary" className="bg-gradient-to-r from-primary to-accent text-white border-0">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        Popular
                      </Badge>
                    </div>

                    {/* Background gradient effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <CardContent className="p-6 relative z-10">
                      <div className="flex flex-col items-center text-center space-y-4">
                        {/* Larger icon */}
                        <div className="p-4 bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                           <tool.icon className="h-12 w-12 text-primary icon-gradient" />
                         </div>

                        {/* Tool name and description */}
                        <div className="space-y-2">
                          <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                            {tool.name}
                          </h3>
                          <p className="text-muted-foreground leading-relaxed">
                            {tool.description}
                          </p>
                        </div>

                        {/* Category badge */}
                        <Badge variant="outline" className="text-xs">
                          {tool.category}
                        </Badge>
                      </div>

                      {/* Hover effect overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
                    </CardContent>
                  </Card>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>

        {/* Call to action */}
        <ScrollReveal animation="fade" delay={600} className="text-center mt-12">
          <p className="text-muted-foreground mb-6">
            Ready to boost your productivity? Try these essential tools today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/tools"
              className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Explore All Tools
            </a>
            <a
              href="/pricing"
              className="inline-flex items-center justify-center px-6 py-3 border border-border text-primary font-medium rounded-lg hover:bg-primary/10 transition-all duration-200"
            >
              View Pricing
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
