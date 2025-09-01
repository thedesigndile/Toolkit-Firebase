"use client";

import { useState } from "react";
import Link from "next/link";
import { ModernLogo } from "./icons";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "./ui/button";
import { Menu, X, Facebook, Instagram, Twitter, Search } from "lucide-react";
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
const editingTools = tools.filter(t => t.category === 'Edit PDF');
const videoTools = tools.filter(t => t.category === 'Video Tools');
const audioTools = tools.filter(t => t.category === 'Audio Tools');
const utilityTools = tools.filter(t => t.category === 'Utility Tools');

const getToolUrl = (toolName: string) => `/tools/${toolName.toLowerCase().replace(/ /g, '-').replace(/&/g, 'and')}`;

const navItems = [
    { name: "PDF Tools", subItems: pdfTools },
    { name: "Image Tools", subItems: imageTools },
    { name: "Conversion Tools", subItems: conversionTools },
    { name: "Editing Tools", subItems: editingTools },
    { name: "Video Tools", subItems: videoTools },
    { name: "Audio Tools", subItems: audioTools },
    { name: "Utility Tools", subItems: utilityTools },
];

const navLinks = [
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

  const navButtonClasses = "font-semibold text-sm px-4 py-3 bg-transparent text-foreground data-[state=open]:bg-gradient-light data-[state=open]:text-foreground hover:bg-gradient-light hover:text-foreground rounded-xl transition-all duration-300 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gradient-primary hover:after:w-full after:transition-all after:duration-300";


  return (
    <>
      <motion.header
        className={cn(
          "hidden md:flex items-center justify-between w-full max-w-7xl mx-auto p-6 rounded-3xl bg-card/95 backdrop-blur-lg border border-border fixed top-4 left-1/2 -translate-x-1/2 z-50"
        )}
        style={{
          boxShadow: '0 20px 25px -5px rgba(59, 130, 246, 0.1), 0 10px 10px -5px rgba(139, 92, 246, 0.04)'
        }}
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
              className={cn(fontLogo.className, "font-bold text-2xl text-gradient-primary tracking-wider whitespace-nowrap")}
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
                         <motion.span
                           whileHover={{ scale: 1.05 }}
                           transition={{ type: "spring", stiffness: 400 }}
                         >
                           {item.name}
                         </motion.span>
                       </NavigationMenuTrigger>
                       {item.subItems && (
                           <NavigationMenuContent>
                           <motion.ul
                             className={cn("grid gap-4 p-8 bg-popover rounded-2xl border border-border shadow-xl grid-cols-4 w-auto")}
                             initial={{ opacity: 0, y: -10 }}
                             animate={{ opacity: 1, y: 0 }}
                             exit={{ opacity: 0, y: -10 }}
                             transition={{ duration: 0.2, ease: "easeOut" }}
                           >
                               {item.subItems.map((tool, toolIndex) => (
                               <motion.div
                                 key={tool.name}
                                 initial={{ opacity: 0, x: -20 }}
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
                            <motion.span
                              whileHover={{ scale: 1.05 }}
                              transition={{ type: "spring", stiffness: 400 }}
                            >
                              {link.name}
                            </motion.span>
                        </NavigationMenuLink>
                      </Link>
                    </NavigationMenuItem>
                  </motion.div>
                ))}
             </NavigationMenuList>
           </NavigationMenu>
        </motion.div>

        <motion.div className="flex items-center gap-4" variants={navItemVariants}>
          <div className="relative group">
            <motion.input 
              type="text" 
              placeholder="Search..." 
              className="bg-transparent border-2 border-border rounded-full py-2 px-4 w-48 group-hover:w-64 focus:w-64 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
              whileHover={{ boxShadow: "0 0 15px rgba(0, 123, 255, 0.2)" }}
              whileFocus={{ boxShadow: "0 0 25px rgba(0, 123, 255, 0.4)" }}
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <Search className="h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
            </div>
          </div>
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <ThemeToggle />
          </motion.div>
        </motion.div>

      </motion.header>

      {/* Mobile Header */}
      <motion.div
        className="md:hidden flex justify-between items-center w-full px-6 py-4 bg-card/95 backdrop-blur-lg border-b border-border fixed top-0 left-0 right-0 z-50"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100 }}
        style={{
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
        }}
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
              className="w-11 h-11 text-foreground hover:text-foreground border border-border hover:border-primary hover:bg-gradient-light rounded-xl transition-all duration-300"
          >
              <Menu className="h-6 w-6" aria-hidden="true" />
          </Button>
        </motion.div>
        <motion.div
          className="flex justify-center"
          whileHover={{ scale: 1.05 }}
        >
            <Link href="/" aria-label="Go to homepage" className="flex items-center gap-2">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <ModernLogo />
                </motion.div>
                <motion.span
                  className={cn(fontLogo.className, "font-bold text-2xl text-gradient-primary tracking-wider whitespace-nowrap")}
                  whileHover={{ scale: 1.05 }}
                >
                  TOOL KIT
                </motion.span>
            </Link>
        </motion.div>
        <motion.div
          className="flex-1 flex justify-end"
          whileHover={{ scale: 1.1 }}
        >
          <ThemeToggle
            aria-label="Toggle theme"
          />
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "-100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "-100%" }}
            transition={{ duration: 0.4, ease: "easeInOut", type: "spring", stiffness: 100 }}
            className="md:hidden fixed inset-0 bg-background z-50 flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation menu"
            id="mobile-navigation"
          >
            <motion.div
              className="flex justify-between items-center p-6 border-b border-border"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Link href="/" onClick={() => setIsMobileMenuOpen(false)} aria-label="Go to homepage" className="flex items-center gap-3">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <ModernLogo />
                </motion.div>
                  <motion.span
                    className={cn(fontLogo.className, "font-bold text-2xl bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent tracking-wider whitespace-nowrap")}
                    whileHover={{ scale: 1.05 }}
                  >
                    TOOL KIT
                  </motion.span>
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
                  className="w-11 h-11 border"
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
              className="p-6 border-t border-border"
              variants={mobileMenuContainerVariants}
              initial="hidden"
              animate="visible"
            >
               <motion.div
                 className="grid grid-cols-2 gap-3 mb-6"
                 variants={mobileMenuItemVariants}
               >
                   <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                     <Button
                       variant="outline"
                       size="lg"
                       className="w-full"
                       aria-label="Log in to your account"
                     >
                       Log In
                     </Button>
                   </motion.div>
                   <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                     <Button
                       size="lg"
                       className="w-full"
                       aria-label="Get started with our tools"
                     >
                       Get Started
                     </Button>
                   </motion.div>
               </motion.div>

               <motion.div
                 className="flex justify-center gap-8"
                 variants={mobileMenuItemVariants}
               >
                   <motion.div whileHover={{ scale: 1.2, rotate: 360 }} transition={{ duration: 0.3 }}>
                     <Link
                       href="#"
                       className="text-muted-foreground p-3 rounded-full border"
                     >
                       <Twitter />
                     </Link>
                   </motion.div>
                   <motion.div whileHover={{ scale: 1.2, rotate: 360 }} transition={{ duration: 0.3 }}>
                     <Link
                       href="#"
                       className="text-muted-foreground p-3 rounded-full border"
                     >
                       <Facebook />
                     </Link>
                   </motion.div>
                   <motion.div whileHover={{ scale: 1.2, rotate: 360 }} transition={{ duration: 0.3 }}>
                     <Link
                       href="#"
                       className="text-muted-foreground p-3 rounded-full border"
                     >
                       <Instagram />
                     </Link>
                   </motion.div>
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
          <motion.a
            ref={ref}
            href={href}
            className={cn(
              "group block select-none space-y-2 rounded-xl p-4 leading-none no-underline outline-none transition-all duration-300",
              "bg-card hover:bg-gradient-light border border-transparent hover:border-primary hover:shadow-lg",
              className
            )}
            whileHover={{
              scale: 1.02,
              boxShadow: "0 10px 30px rgba(139, 92, 246, 0.15)"
            }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex flex-col items-center text-center">
              {!isStatic && Icon && (
                <motion.div
                  className="p-3 rounded-xl bg-muted group-hover:bg-gradient-primary transition-all duration-300 mx-auto mb-3"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Icon className="h-8 w-8 text-muted-foreground group-hover:text-white transition-colors duration-300" />
                </motion.div>
              )}
              <div className="flex-1 text-center">
                <motion.div
                  className="text-sm font-bold leading-none text-foreground group-hover:text-foreground transition-colors duration-300 font-heading"
                  whileHover={{ scale: 1.02 }}
                >
                  {title ?? tool?.name}
                </motion.div>
                <motion.p
                  className="line-clamp-2 text-xs leading-snug text-muted-foreground mt-2 group-hover:text-muted-foreground"
                  initial={{ opacity: 0.8 }}
                  whileHover={{ opacity: 1 }}
                >
                  {children ?? tool?.description}
                </motion.p>
              </div>
            </div>
          </motion.a>
        </NavigationMenuLink>
      </li>
    );
  }
);
ListItem.displayName = "ListItem";
