"use client";

import { useState } from "react";
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
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Separator } from "./ui/separator";

const fontLogo = Rajdhani({
  subsets: ['latin'],
  weight: ['700'],
});

const pdfTools = tools.filter(t => ['Edit PDF', 'Protect & Secure', 'View & Organize'].includes(t.category));
const imageTools = tools.filter(t => t.category === 'Image Tools');
const conversionTools = tools.filter(t => ['Convert PDF', 'Converters', 'Other Tools'].includes(t.category));

const getToolUrl = (toolName: string) => `/tools/${toolName.toLowerCase().replace(/ /g, '-').replace(/&/g, 'and')}`;

const navItems = [
    { name: "PDF Tools", subItems: pdfTools },
    { name: "Image Tools", subItems: imageTools },
    { name: "Conversion Tools", subItems: conversionTools },
];

const navLinks = [
    { name: "All Tools", href: "/tools"},
    { name: "Pricing", href: "/pricing"},
    { name: "Contact", href: "/contact"},
]

type ListItemLinkProps = {
  className?: string;
  tool: Tool;
};

const ListItemLink = React.forwardRef<HTMLAnchorElement, ListItemLinkProps>(
  ({ className, tool }, ref) => {
    return (
      <ListItem
        ref={ref}
        href={getToolUrl(tool.name)}
        tool={tool}
        className={className}
      />
    );
  }
);
ListItemLink.displayName = "ListItemLink";


export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const mobileMenuContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const mobileMenuItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        ease: "easeOut",
        duration: 0.3,
      },
    },
  };

  const headerVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        staggerChildren: 0.1
      }
    }
  };

  const navItemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 15
      }
    }
  };

  const navButtonClasses = "font-semibold text-sm px-4 py-3 bg-transparent text-foreground hover:bg-muted rounded-xl transition-all duration-300";


  return (
    <>
      <motion.header
        className={cn(
          "hidden md:flex items-center justify-between w-full max-w-7xl mx-auto p-4 rounded-2xl bg-card/80 backdrop-blur-lg border border-border fixed top-4 left-1/2 -translate-x-1/2 z-50"
        )}
        variants={headerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="flex-shrink-0"
          variants={navItemVariants}
        >
          <Link href="/" aria-label="Go to homepage" className="flex items-center gap-2 group">
            <motion.div
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.6 }}
            >
              <ModernLogo />
            </motion.div>
            <motion.span
              className={cn(fontLogo.className, "font-bold text-xl text-foreground tracking-wider whitespace-nowrap")}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              TOOL KIT
            </motion.span>
          </Link>
        </motion.div>
        
        <motion.div
          className="flex-grow flex justify-center"
          variants={navItemVariants}
        >
          <NavigationMenu>
            <NavigationMenuList>
              {navItems.map((item) => (
                  <motion.div
                    key={item.name}
                    variants={navItemVariants}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <NavigationMenuItem>
                       <NavigationMenuTrigger className={navButtonClasses}>
                         {item.name}
                       </NavigationMenuTrigger>
                       {item.subItems && (
                           <NavigationMenuContent>
                           <motion.ul
                             className={cn("grid gap-3 p-4 bg-popover rounded-lg border border-border shadow-lg md:w-[500px] md:grid-cols-2 lg:w-[600px]")}
                             initial={{ opacity: 0, y: -10 }}
                             animate={{ opacity: 1, y: 0 }}
                             exit={{ opacity: 0, y: -10 }}
                             transition={{ duration: 0.2, ease: "easeOut" }}
                           >
                               {item.subItems.map((tool, toolIndex) => (
                               <motion.div
                                 key={tool.name}
                                 initial={{ opacity: 0, x: -10 }}
                                 animate={{ opacity: 1, x: 0 }}
                                 transition={{ delay: toolIndex * 0.05 }}
                               >
                                 <ListItemLink
                                     tool={tool}
                                 />
                               </motion.div>
                               ))}
                           </motion.ul>
                         </NavigationMenuContent>
                       )}
                   </NavigationMenuItem>
                  </motion.div>
               ))}
                {navLinks.map((link) => (
                  <motion.div
                    key={link.name}
                    variants={navItemVariants}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <NavigationMenuItem>
                      <Link href={link.href} legacyBehavior passHref>
                        <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), navButtonClasses)}>
                            {link.name}
                        </NavigationMenuLink>
                      </Link>
                    </NavigationMenuItem>
                  </motion.div>
                ))}
             </NavigationMenuList>
           </NavigationMenu>
        </motion.div>

        <motion.div className="flex items-center gap-2" variants={navItemVariants}>
          <ThemeToggle />
           <Button>Get Started</Button>
        </motion.div>

      </motion.header>

      {/* Mobile Header */}
      <motion.div
        className="md:hidden flex justify-between items-center w-full px-4 py-3 bg-card/90 backdrop-blur-lg border-b border-border fixed top-0 left-0 right-0 z-50"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        <motion.div
          className="flex-1 flex justify-start"
          whileTap={{ scale: 0.95 }}
        >
          <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-navigation"
          >
              <Menu className="h-6 w-6" aria-hidden="true" />
          </Button>
        </motion.div>
        <motion.div
          className="flex justify-center"
          whileHover={{ scale: 1.05 }}
        >
            <Link href="/" aria-label="Go to homepage" className="flex items-center gap-2">
                <ModernLogo />
                <span className={cn(fontLogo.className, "font-bold text-xl text-foreground")}>TOOL KIT</span>
            </Link>
        </motion.div>
        <motion.div
          className="flex-1 flex justify-end"
          whileHover={{ scale: 1.1 }}
        >
          <ThemeToggle />
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "-100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "-100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden fixed inset-0 bg-background z-50 flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation menu"
            id="mobile-navigation"
          >
            <motion.div
              className="flex justify-between items-center p-4 border-b border-border"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Link href="/" onClick={() => setIsMobileMenuOpen(false)} aria-label="Go to homepage" className="flex items-center gap-2">
                  <ModernLogo />
                  <span className={cn(fontLogo.className, "font-bold text-xl")}>TOOL KIT</span>
              </Link>
              <motion.div
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-label="Close navigation menu"
                >
                  <X className="h-6 w-6" aria-hidden="true" />
                </Button>
              </motion.div>
            </motion.div>
            
            <motion.div
              className="flex-1 overflow-y-auto"
              variants={mobileMenuContainerVariants}
              initial="hidden"
              animate="visible"
            >
              <div className="p-4">
                <motion.div variants={mobileMenuItemVariants}>
                  <Accordion type="multiple" className="w-full">
                    {navItems.map(item => (
                      <AccordionItem value={item.name} key={item.name}>
                          <AccordionTrigger className="text-lg font-semibold py-4 hover:no-underline">
                            {item.name}
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="flex flex-col gap-1 pl-4">
                              {item.subItems && item.subItems.map(tool => (
                                <Link
                                  key={tool.name}
                                  href={getToolUrl(tool.name)}
                                  className="block p-3 rounded-md text-muted-foreground hover:bg-accent/10 hover:text-accent-foreground transition-colors text-base"
                                  onClick={() => setIsMobileMenuOpen(false)}
                                >
                                  {tool.name}
                                </Link>
                              ))}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                    ))}
                  </Accordion>
                </motion.div>

                <Separator className="my-4" />

                <motion.div className="flex flex-col" variants={mobileMenuContainerVariants} initial="hidden" animate="visible">
                    {navLinks.map((link) => (
                        <motion.div key={link.name} variants={mobileMenuItemVariants}>
                             <Link
                                href={link.href}
                                className="block p-4 text-lg font-semibold text-foreground hover:bg-accent/10 rounded-md transition-colors"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {link.name}
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              className="p-4 border-t border-border"
              variants={mobileMenuContainerVariants}
              initial="hidden"
              animate="visible"
            >
               <motion.div
                 className="grid grid-cols-1 gap-3"
                 variants={mobileMenuItemVariants}
               >
                 <Button size="lg" className="w-full">Get Started</Button>
               </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}


interface ListItemProps {
  tool?: Tool;
  title?: string;
  isStatic?: boolean;
  href?: string;
  className?: string;
  children?: React.ReactNode;
}

const ListItem = React.forwardRef<React.ElementRef<"a">, ListItemProps>(
  ({ className, tool, title, children, isStatic, href }, ref) => {
    const Icon = tool?.icon;

    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            href={href}
            className={cn(
              "group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className
            )}
          >
            <div className="flex items-center gap-2">
              {Icon && <Icon className="h-5 w-5 text-primary group-hover:text-accent-foreground" />}
              <div className="text-sm font-medium leading-none text-foreground group-hover:text-accent-foreground">
                {title ?? tool?.name}
              </div>
            </div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground group-hover:text-accent-foreground/80">
              {children ?? tool?.description}
            </p>
          </a>
        </NavigationMenuLink>
      </li>
    );
  }
);
ListItem.displayName = "ListItem";
