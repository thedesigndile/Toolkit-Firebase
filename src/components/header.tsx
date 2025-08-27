
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ModernLogo } from "./icons";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { tools, Tool } from "@/lib/tools";
import React from "react";

const pdfConvertTools = tools.filter(t => t.category === 'Convert PDF');
const imageTools = tools.filter(t => t.category === 'Image Tools');
const organizePdfTools = tools.filter(t => t.category === 'Organize PDF');
const allTools = tools;

const getToolUrl = (toolName: string) => `/tools/${toolName.toLowerCase().replace(/ /g, '-').replace(/&/g, 'and')}`;

const navItems = [
    { name: "Convert PDF", subItems: pdfConvertTools },
    { name: "Organize PDF", subItems: organizePdfTools },
    { name: "Image Tools", subItems: imageTools },
    { name: "All Tools", subItems: allTools },
    { name: "Pricing", href: "/pricing" },
]

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

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
            <NavigationMenuList 
                className="relative"
                onMouseLeave={() => setHoveredItem(null)}
            >
              {navItems.map((item) => (
                 <NavigationMenuItem 
                    key={item.name} 
                    onMouseEnter={() => setHoveredItem(item.name)}
                 >
                    {item.href ? (
                         <Link href={item.href}>
                            <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "font-semibold text-sm bg-transparent text-white hover:text-white/90 px-4 py-2 hover:bg-transparent focus:bg-transparent")}>
                                {item.name}
                            </NavigationMenuLink>
                         </Link>
                    ) : (
                        <NavigationMenuTrigger className="font-semibold text-sm bg-transparent text-white hover:text-white/90 hover:bg-transparent focus:bg-transparent">
                            {item.name}
                        </NavigationMenuTrigger>
                    )}
                   
                    {hoveredItem === item.name && (
                       <motion.div
                          className="absolute -z-10 inset-0 bg-white/10 rounded-full"
                          layoutId="hover-bg"
                          transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                        />
                    )}

                    {item.subItems && (
                        <NavigationMenuContent>
                        <ul className={cn("grid gap-3 p-4", {
                            "w-[400px] md:w-[500px] md:grid-cols-2 lg:w-[600px]": item.name !== "All Tools",
                            "w-[400px] md:w-[800px] md:grid-cols-4 lg:w-[800px]": item.name === "All Tools",
                        })}>
                            {item.subItems.map((tool) => (
                            <ListItem
                                key={tool.name}
                                tool={tool}
                                href={getToolUrl(tool.name)}
                            />
                            ))}
                        </ul>
                        </NavigationMenuContent>
                    )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" className="text-white hover:text-white/90 hover:bg-white/10 rounded-full">
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
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href || "/tools"}
                  className="text-2xl font-semibold text-foreground hover:text-gradient-primary transition-all"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
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
                  <motion.div whileHover={{ scale: 1.1 }}>
                    <Icon className="h-10 w-10 transition-all duration-300 ease-in-out" />
                  </motion.div>
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

    