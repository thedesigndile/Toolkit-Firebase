
"use client";

import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import React from "react";
import { DileToolLogo } from "./icons";
import { tools } from "@/lib/tools";
import { Button } from "./ui/button";
import { ThemeToggle } from "./theme-toggle";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const pdfTools = tools.filter(t => t.category.includes('PDF')).slice(0, 4);
const allTools = tools;

export function SubHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const getToolUrl = (toolName: string) => `/tools/${toolName.toLowerCase().replace(/ /g, '-').replace(/&/g, 'and')}`;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <DileToolLogo />
            <span className="hidden font-bold sm:inline-block">Toolkit</span>
          </Link>
          <NavigationMenu>
            <NavigationMenuList>
               <NavigationMenuItem>
                <Link href={getToolUrl('Merge PDF')} legacyBehavior passHref>
                  <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "font-semibold")}>
                    MERGE PDF
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href={getToolUrl('Split PDF')} legacyBehavior passHref>
                  <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "font-semibold")}>
                    SPLIT PDF
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href={getToolUrl('Compress PDF')} legacyBehavior passHref>
                  <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "font-semibold")}>
                    COMPRESS PDF
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="font-semibold">CONVERT PDF</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                    {tools.filter(t => t.category.startsWith('Convert')).map((tool) => (
                      <ListItem
                        key={tool.name}
                        title={tool.name}
                        href={getToolUrl(tool.name)}
                      >
                        {tool.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="font-semibold">ALL TOOLS</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                    {allTools.slice(0,10).map((tool) => (
                      <ListItem
                        key={tool.name}
                        title={tool.name}
                        href={getToolUrl(tool.name)}
                      >
                        {tool.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Mobile View */}
        <div className="flex flex-1 items-center justify-between md:hidden">
          <Link href="/" className="flex items-center space-x-2">
            <DileToolLogo />
            <span className="font-bold">Toolkit</span>
          </Link>
          <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(true)}>
              <Menu className="h-6 w-6" />
          </Button>
        </div>

        <div className="flex flex-1 items-center justify-end space-x-2">
            <ThemeToggle />
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
                     {pdfTools.map((tool) => (
                        <Link 
                            key={tool.name} 
                            href={getToolUrl(tool.name)}
                            className="text-2xl font-semibold text-foreground hover:text-gradient-primary transition-all"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            {tool.name.toUpperCase()}
                        </Link>
                    ))}
                    <Link 
                        href="/tools"
                        className="text-2xl font-semibold text-foreground hover:text-gradient-primary transition-all"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        ALL TOOLS
                    </Link>
                </nav>
            </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
