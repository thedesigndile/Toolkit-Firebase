
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { DileToolLogo } from "./icons";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "./ui/button";
import { User, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./theme-toggle";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { tools, Tool } from "@/lib/tools";
import React from "react";

const pdfConvertTools = tools.filter(t => t.category.startsWith('Convert'));
const imageTools = tools.filter(t => t.category === 'Image Tools');
const organizePdfTools = tools.filter(t => t.category === 'Organize PDF');
const editAndSignTools = tools.filter(t => t.category === 'Edit PDF' || t.category === 'PDF Security');
const allTools = tools;

const getToolUrl = (toolName: string) => `/tools/${toolName.toLowerCase().replace(/ /g, '-').replace(/&/g, 'and')}`;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "h-16 bg-background/80 backdrop-blur-lg border-b"
          : "h-20 bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 h-full">
        <div className="flex items-center justify-between h-full">
          <Link href="/" aria-label="Go to homepage">
            <div className="flex items-center gap-2">
                <DileToolLogo />
                <span className="text-xl font-bold text-foreground">Toolkit</span>
            </div>
          </Link>
          <NavigationMenu className="hidden md:flex ml-8">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="font-semibold text-sm bg-transparent">ORGANIZE PDF</NavigationMenuTrigger>
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
                <NavigationMenuTrigger className="font-semibold text-sm bg-transparent">CONVERT PDF</NavigationMenuTrigger>
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
                <NavigationMenuTrigger className="font-semibold text-sm bg-transparent">EDIT & SIGN</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                    {editAndSignTools.map((tool) => (
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
                <NavigationMenuTrigger className="font-semibold text-sm bg-transparent">IMAGE TOOLS</NavigationMenuTrigger>
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
                <NavigationMenuTrigger className="font-semibold text-sm bg-transparent">ALL TOOLS</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                    {allTools.slice(0,10).map((tool) => (
                      <ListItem
                        key={tool.name}
                        tool={tool}
                        href={getToolUrl(tool.name)}
                      />
                    ))}
                     <ListItem
                        isStatic
                        title="View All Tools"
                        href="/tools"
                        className="col-span-2 text-center bg-accent/20 hover:bg-gradient-primary hover:text-white"
                      >
                        Discover our full suite of productivity tools.
                      </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="hidden md:inline-flex">
                <User className="h-5 w-5" />
            </Button>
            <ThemeToggle />
            <div className="md:hidden">
                <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(true)}>
                    <Menu className="h-6 w-6" />
                </Button>
            </div>
          </div>
        </div>
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
                         <div className="flex items-center gap-2">
                            <DileToolLogo />
                            <span className="text-xl font-bold text-foreground">Toolkit</span>
                        </div>
                    </Link>
                    <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
                        <X className="h-6 w-6" />
                    </Button>
                </div>
                <nav className="flex flex-col items-center justify-center h-full gap-8">
                    <Link href="/tools" className="text-2xl font-semibold text-foreground hover:text-gradient-primary transition-all" onClick={() => setIsMobileMenuOpen(false)}>
                        ORGANIZE PDF
                    </Link>
                     <Link href="/tools" className="text-2xl font-semibold text-foreground hover:text-gradient-primary transition-all" onClick={() => setIsMobileMenuOpen(false)}>
                        CONVERT PDF
                    </Link>
                     <Link href="/tools" className="text-2xl font-semibold text-foreground hover:text-gradient-primary transition-all" onClick={() => setIsMobileMenuOpen(false)}>
                        EDIT & SIGN
                    </Link>
                     <Link href="/tools" className="text-2xl font-semibold text-foreground hover:text-gradient-primary transition-all" onClick={() => setIsMobileMenuOpen(false)}>
                        IMAGE TOOLS
                    </Link>
                    <Link href="/tools" className="text-2xl font-semibold text-foreground hover:text-gradient-primary transition-all" onClick={() => setIsMobileMenuOpen(false)}>
                        ALL TOOLS
                    </Link>
                    <Link href="/contact" className="text-2xl font-semibold text-foreground hover:text-gradient-primary transition-all" onClick={() => setIsMobileMenuOpen(false)}>
                        CONTACT
                    </Link>
                </nav>
            </motion.div>
        )}
      </AnimatePresence>
    </header>
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
              "bg-transparent hover:bg-accent/20 focus:bg-accent/20",
              className
            )}
            {...props}
          >
            <div className="flex items-start gap-3">
              {!isStatic && Icon && (
                <div className="p-1 rounded-md bg-accent/10">
                  <Icon className="h-5 w-5 text-accent transition-all duration-300 ease-in-out group-hover:scale-110 group-hover:-rotate-6" />
                </div>
              )}
              <div className="flex-1">
                <div className="text-sm font-medium leading-none group-hover:font-bold">{title ?? tool?.name}</div>
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
