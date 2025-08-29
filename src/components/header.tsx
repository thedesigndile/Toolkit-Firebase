
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
import { ThemeToggle } from "./theme-toggle";
import React from "react";
import { Rajdhani } from "next/font/google";

const fontLogo = Rajdhani({
  subsets: ['latin'],
  weight: ['600'],
});

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
    { name: "Contact", href: "/contact" },
]

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <header
        className={cn(
          "hidden md:flex items-center justify-between w-full max-w-6xl mx-auto p-2 rounded-full header-bg shadow-lg"
        )}
      >
        <div className="flex-1">
          <Link href="/" aria-label="Go to homepage" className="flex items-center gap-3">
            <ModernLogo />
            <span className={cn(fontLogo.className, "font-semibold text-2xl text-white tracking-widest")}>TOOL KIT</span>
          </Link>
        </div>
        
        <div className="flex-none">
          <NavigationMenu>
            <NavigationMenuList>
              {navItems.map((item) => (
                 <NavigationMenuItem key={item.name}>
                    {item.href ? (
                         <NavigationMenuLink asChild>
                           <Link href={item.href} className={cn(navigationMenuTriggerStyle(), "font-semibold text-sm bg-transparent text-white px-4 py-2 hover:bg-blue-500 hover:text-white focus:bg-blue-500 focus:text-white transition-colors duration-300 rounded-full")}>
                              {item.name}
                           </Link>
                        </NavigationMenuLink>
                    ) : (
                        <NavigationMenuTrigger className="font-semibold text-sm bg-transparent text-white px-4 py-2 hover:bg-blue-500 hover:text-white focus:bg-blue-500 focus:text-white data-[state=open]:bg-blue-500 data-[state=open]:text-white transition-colors duration-300 rounded-full">
                            {item.name}
                        </NavigationMenuTrigger>
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

        <div className="flex-1 flex justify-end items-center gap-2">
          <ThemeToggle className="text-white hover:text-white/90 hover:bg-white/10 rounded-full w-10 h-10" />
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
         <Link href="/" aria-label="Go to homepage" className="flex items-center gap-3">
            <ModernLogo />
            <span className={cn(fontLogo.className, "font-semibold text-xl text-foreground tracking-widest")}>TOOL KIT</span>
         </Link>
         <div className="flex items-center gap-2">
           <ThemeToggle className="w-10 h-10" aria-label="Toggle theme" />
           <Button
             variant="ghost"
             size="icon"
             onClick={() => setIsMobileMenuOpen(true)}
             aria-label="Open navigation menu"
             aria-expanded={isMobileMenuOpen}
             aria-controls="mobile-navigation"
             className="w-10 h-10"
           >
              <Menu className="h-6 w-6" aria-hidden="true" />
           </Button>
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
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation menu"
            id="mobile-navigation"
          >
            <div className="flex justify-between items-center p-4 border-b">
              <Link href="/" onClick={() => setIsMobileMenuOpen(false)} aria-label="Go to homepage" className="flex items-center gap-3">
                <ModernLogo />
                 <span className={cn(fontLogo.className, "font-semibold text-xl text-foreground tracking-widest")}>TOOL KIT</span>
              </Link>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Close navigation menu"
                className="w-10 h-10"
              >
                <X className="h-6 w-6" aria-hidden="true" />
              </Button>
            </div>
            <nav
              className="flex flex-col items-center justify-center h-full gap-8"
              role="navigation"
              aria-label="Mobile navigation"
            >
               <Link
                 href="/tools"
                 className="text-2xl font-semibold text-foreground hover:text-gradient-primary transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg px-4 py-2"
                 onClick={() => setIsMobileMenuOpen(false)}
               >
                 All Tools
               </Link>
               <Link
                 href="/pricing"
                 className="text-2xl font-semibold text-foreground hover:text-gradient-primary transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg px-4 py-2"
                 onClick={() => setIsMobileMenuOpen(false)}
               >
                Pricing
               </Link>
               <Link
                 href="/contact"
                 className="text-2xl font-semibold text-foreground hover:text-gradient-primary transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg px-4 py-2"
                 onClick={() => setIsMobileMenuOpen(false)}
               >
                 Contact
               </Link>
              <div className="mt-8 flex flex-col gap-4 w-full px-8">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full min-h-[44px]"
                  aria-label="Log in to your account"
                >
                  Log In
                </Button>
                <Button
                  size="lg"
                  className="bg-blue-500 hover:bg-blue-600 w-full min-h-[44px]"
                  aria-label="Get started with our tools"
                >
                  Get Started
                </Button>
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
                    <Icon className="h-10 w-10 transition-all duration-300 ease-in-out text-brand-blue group-hover:text-brand-purple" />
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
