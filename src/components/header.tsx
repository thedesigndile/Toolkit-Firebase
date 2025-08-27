
"use client";

import Link from "next/link";
import { DileToolLogo } from "./icons";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { tools } from "@/lib/tools";
import { Button } from "./ui/button";
import { ChevronDown, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { ThemeToggle } from "./theme-toggle";


const pdfCategories = [
  "Organize PDF",
  "Optimize PDF",
  "Convert to PDF",
  "Convert from PDF",
  "Edit PDF",
  "PDF Security",
  "Extra Tools",
];

const imageTools = tools.filter(t => t.category === "Image Tools");
const utilityTools = tools.filter(t => t.category === "Utility Tools");
const allToolsCategorized = [
    { name: "Image Tools", tools: imageTools, icon: imageTools[0]?.categoryIcon },
    ...pdfCategories.map(cat => ({
        name: cat,
        tools: tools.filter(t => t.category === cat),
        icon: tools.find(t => t.category === cat)?.categoryIcon
    })),
    { name: "Utility Tools", tools: utilityTools, icon: utilityTools[0]?.categoryIcon },
].filter(c => c.tools.length > 0);


export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <Link href="/" aria-label="Go to homepage">
              <DileToolLogo />
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <FlyoutLink href="#" FlyoutContent={AllToolsFlyout} text="All Tools" />
              {/* Add other top-level links here if needed */}
            </nav>
            <div className="flex items-center gap-2">
              <div className="hidden md:block">
                <ThemeToggle />
              </div>
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                   <Button
                      variant="ghost"
                      size="icon"
                      className="md:hidden"
                      aria-label="Open mobile menu"
                    >
                      <Menu className="h-6 w-6" />
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="p-0">
                   <div className="flex flex-col h-full">
                     <div className="flex items-center justify-between p-4 border-b">
                        <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
                           <DileToolLogo />
                        </Link>
                        <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)} aria-label="Close mobile menu">
                            <X className="h-6 w-6" />
                        </Button>
                      </div>
                      <div className="flex-1 overflow-y-auto p-4">
                           <Accordion type="single" collapsible className="w-full">
                            {allToolsCategorized.map(({ name, tools: categoryTools, icon: CategoryIcon }) => (
                                <AccordionItem key={name} value={name}>
                                <AccordionTrigger className="text-base font-semibold py-3">
                                    <div className="flex items-center gap-3">
                                      {CategoryIcon && <CategoryIcon className="h-5 w-5 text-accent" />}
                                      <span>{name}</span>
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent className="pl-4">
                                    <div className="grid grid-cols-1 gap-1">
                                    {categoryTools.map(tool => (
                                        <MobileNavLink 
                                            key={tool.name} 
                                            tool={tool}
                                            onClick={() => setIsMobileMenuOpen(false)} 
                                        />
                                    ))}
                                    </div>
                                </AccordionContent>
                                </AccordionItem>
                            ))}
                           </Accordion>
                      </div>
                      <div className="p-4 border-t">
                          <ThemeToggle />
                      </div>
                   </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}


const FlyoutLink = ({ text, href, FlyoutContent }: {text: string, href: string, FlyoutContent: React.ComponentType}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div 
      className="relative h-fit w-fit"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <Link href={href} className="group flex items-center text-sm font-semibold text-foreground p-3">
        {text}
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
          <ChevronDown className="h-4 w-4 ml-1 transition-transform" />
        </motion.div>
        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-center" />
      </Link>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute left-1/2 top-12 -translate-x-1/2"
          >
            <div className="absolute -top-6 left-0 right-0 h-6 bg-transparent" />
            <div className="absolute left-1/2 top-0 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-sm bg-background border-t border-l" />
            <FlyoutContent />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};


const AllToolsFlyout = () => {
  return (
    <div className="w-[56rem] max-w-screen-lg rounded-lg border bg-background shadow-lg">
       <div className="p-8 grid grid-cols-3 gap-x-8 gap-y-6">
          {allToolsCategorized.map(({name, tools: categoryTools, icon: CategoryIcon}) => (
            <div key={name} className="space-y-3">
              <h3 className="font-semibold text-accent flex items-center gap-2">
                {CategoryIcon && <CategoryIcon className="h-5 w-5" />}
                {name}
              </h3>
              <div className="flex flex-col space-y-2">
                {categoryTools.map(tool => <NavLink key={tool.name} tool={tool} />)}
              </div>
            </div>
          ))}
       </div>
    </div>
  )
}

const NavLink = ({ tool }: { tool: typeof tools[0]}) => {
  const Icon = tool.icon;
  const slug = tool.name.toLowerCase().replace(/ /g, '-').replace(/&/g, 'and');
  return (
    <Link href={`/tools/${slug}`} className="group block text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
       <div className="flex items-center gap-2">
          <Icon className="h-4 w-4 text-accent/80 transition-colors group-hover:text-accent" />
          <span>{tool.name}</span>
       </div>
    </Link>
  )
}

const MobileNavLink = ({ tool, onClick }: { tool: typeof tools[0], onClick: () => void}) => {
  const Icon = tool.icon;
  const slug = tool.name.toLowerCase().replace(/ /g, '-').replace(/&/g, 'and');
  return (
    <Link href={`/tools/${slug}`} onClick={onClick} className="group flex items-center rounded-md p-2 text-base font-medium text-muted-foreground hover:bg-accent/10 hover:text-accent">
       <div className="flex items-center gap-3">
          <Icon className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-accent" />
          <span>{tool.name}</span>
       </div>
    </Link>
  )
}
