
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ModernLogo } from "./icons";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { tools, Tool } from "@/lib/tools";
import React from "react";

const pdfConvertTools = tools.filter(t => t.category.startsWith('Convert'));
const imageTools = tools.filter(t => t.category === 'Image Tools');
const organizePdfTools = tools.filter(t => t.category === 'Organize PDF');
const allTools = tools;

const getToolUrl = (toolName: string) => `/tools/${toolName.toLowerCase().replace(/ /g, '-').replace(/&g/, 'and')}`;

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <header
        className={cn(
          "hidden md:flex items-center justify-between w-full max-w-6xl mx-auto p-2 rounded-full header-bg shadow-lg"
        )}
      >
        <div className="flex items-center gap-4">
          <Link href="/" aria-label="Go to homepage">
            <ModernLogo />
          </Link>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="font-semibold text-sm bg-transparent text-white/80 hover:text-white">Product</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                    {organizePdfTools.map((tool) => (
                      <ListItem
                        key={tool.name}
                        tool={tool}
                        href={getToolUrl(tool.name)}
                      />
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="font-semibold text-sm bg-transparent text-white/80 hover:text-white">Resources</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                    {pdfConvertTools.map((tool) => (
                      <ListItem
                        key={tool.name}
                        tool={tool}
                        href={getToolUrl(tool.name)}
                      />
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="font-semibold text-sm bg-transparent text-white/80 hover:text-white">Community</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                    {imageTools.map((tool) => (
                      <ListItem
                        key={tool.name}
                        tool={tool}
                        href={getToolUrl(tool.name)}
                      />
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                 <Link href="/pricing" legacyBehavior passHref>
                    <NavigationMenuLink className="font-semibold text-sm bg-transparent text-white/80 hover:text-white px-4 py-2">
                        Pricing
                    </NavigationMenuLink>
                 </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" className="text-white/80 hover:text-white hover:bg-white/10 rounded-full">
            Log In
          </Button>
          <Button className="bg-blue-500 hover:bg-blue-600 text-white rounded-full">
            Get Started
          </Button>
        </div>
      </header>

      {/* Mobile Header */}
      <div className="md:hidden flex justify-between items-center w-full px-4 py-2 bg-background/80 backdrop-blur-lg border-b">
         <Link href="/" aria-label="Go to homepage">
            <ModernLogo />
          </Link>
         <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(true)}>
            <Menu className="h-6 w-6" />
        </Button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden fixed inset-0 bg-background z-50"
          >
            <div className="flex justify-between items-center p-4 border-b">
              <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
                <ModernLogo />
              </Link>
              <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
                <X className="h-6 w-6" />
              </Button>
            </div>
            <nav className="flex flex-col items-center justify-center h-full gap-8">
              <Link href="/tools" className="text-2xl font-semibold text-foreground hover:text-gradient-primary transition-all" onClick={() => setIsMobileMenuOpen(false)}>
                Product
              </Link>
              <Link href="/tools" className="text-2xl font-semibold text-foreground hover:text-gradient-primary transition-all" onClick={() => setIsMobileMenuOpen(false)}>
                Resources
              </Link>
              <Link href="/tools" className="text-2xl font-semibold text-foreground hover:text-gradient-primary transition-all" onClick={() => setIsMobileMenuOpen(false)}>
                Community
              </Link>
              <Link href="/pricing" className="text-2xl font-semibold text-foreground hover:text-gradient-primary transition-all" onClick={() => setIsMobileMenuOpen(false)}>
                Pricing
              </Link>
              <div className="mt-8 flex flex-col gap-4 w-full px-8">
                <Button variant="outline" size="lg">Log In</Button>
                <Button size="lg" className="bg-blue-500 hover:bg-blue-600">Get Started</Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}


interface ListItemProps extends React.ComponentPropsWithoutRef<"a"> {
  tool?: Tool;
  title?: string;
  isStatic?: boolean;
}

const ListItem = React.forwardRef<React.ElementRef<"a">, ListItemProps>(
  ({ className, tool, title, children, isStatic, ...props }, ref) => {
    const Icon = tool?.icon;

    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              "group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors",
              "bg-transparent hover:bg-accent/10 focus:bg-accent/10",
              className
            )}
            {...props}
          >
            <div className="flex items-start gap-3">
              {!isStatic && Icon && (
                <div className="p-1 rounded-md bg-transparent">
                  <Icon className="h-10 w-10 transition-all duration-300 ease-in-out group-hover:scale-110" />
                </div>
              )}
              <div className="flex-1">
                <div className="text-sm font-semibold leading-none group-hover:font-semibold">{title ?? tool?.name}</div>
                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground mt-1">
                  {children ?? tool?.description}
                </p>
              </div>
            </div>
          </a>
        </NavigationMenuLink>
      </li>
    );
  }
);
ListItem.displayName = "ListItem";
