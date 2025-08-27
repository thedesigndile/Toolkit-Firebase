
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
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"


const pdfCategories = [
  "Organize PDF",
  "Optimize PDF",
  "Convert to PDF",
  "Convert from PDF",
  "Edit PDF",
  "PDF Security",
  "Extra Tools",
]

const imageTools = tools.filter(t => t.category === "Image Tools");
const utilityTools = tools.filter(t => t.category === "Utility Tools");
const pdfToolsByCat = pdfCategories.map(cat => ({
  category: cat,
  tools: tools.filter(t => t.category === cat)
}));


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
            <nav className="hidden md:flex items-center gap-2">
              <FlyoutLink href="#" FlyoutContent={PdfToolsFlyout} text="PDF Tools" />
              <FlyoutLink href="#" FlyoutContent={ImageToolsFlyout} text="Image Tools" />
              <FlyoutLink href="#" FlyoutContent={UtilityToolsFlyout} text="Utility Tools" />
            </nav>
            <div className="hidden md:block">
              <ThemeToggle />
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Open mobile menu"
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </header>
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[100] bg-background p-4 md:hidden"
          >
            <div className="flex items-center justify-between pb-4 border-b">
              <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
                 <DileToolLogo />
              </Link>
              <div className="flex items-center gap-2">
                 <ThemeToggle />
                <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)} aria-label="Close mobile menu">
                  <X className="h-6 w-6" />
                </Button>
              </div>
            </div>
            <div className="mt-6 flow-root">
               <div className="-my-6 divide-y divide-border">
                  <div className="space-y-2 py-6">
                      <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="pdf-tools">
                          <AccordionTrigger className="text-base font-semibold py-2">PDF Tools</AccordionTrigger>
                          <AccordionContent className="pl-4">
                            {pdfToolsByCat.map(({ category, tools }) => (
                              <div key={category} className="mb-4">
                                <h4 className="font-semibold text-sm text-accent mb-2">{category}</h4>
                                <div className="grid grid-cols-1 gap-1">
                                  {tools.map(tool => (
                                      <MobileNavLink 
                                        key={tool.name} 
                                        tool={tool}
                                        onClick={() => setIsMobileMenuOpen(false)} 
                                      />
                                  ))}
                                </div>
                              </div>
                            ))}
                          </AccordionContent>
                        </AccordionItem>
                         <AccordionItem value="image-tools">
                          <AccordionTrigger className="text-base font-semibold py-2">Image Tools</AccordionTrigger>
                          <AccordionContent className="pl-4 pt-2">
                             <div className="grid grid-cols-1 gap-1">
                              {imageTools.map(tool => (
                                 <MobileNavLink key={tool.name} tool={tool} onClick={() => setIsMobileMenuOpen(false)} />
                              ))}
                             </div>
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="utility-tools">
                          <AccordionTrigger className="text-base font-semibold py-2">Utility Tools</AccordionTrigger>
                           <AccordionContent className="pl-4 pt-2">
                             <div className="grid grid-cols-1 gap-1">
                              {utilityTools.map(tool => (
                                 <MobileNavLink key={tool.name} tool={tool} onClick={() => setIsMobileMenuOpen(false)} />
                              ))}
                             </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                  </div>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
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
      <Link href={href} className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary p-3">
        {text}
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
          <ChevronDown className="h-4 w-4 ml-1" />
        </motion.div>
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


const PdfToolsFlyout = () => {
  return (
    <div className="w-[60rem] max-w-screen-lg rounded-lg border bg-background shadow-lg">
       <div className="p-8 grid grid-cols-4 gap-x-8 gap-y-6">
          {pdfToolsByCat.map(({category, tools}) => (
            <div key={category} className="space-y-3">
              <h3 className="font-semibold text-accent">{category}</h3>
              <div className="flex flex-col space-y-2">
                {tools.map(tool => <NavLink key={tool.name} tool={tool} />)}
              </div>
            </div>
          ))}
       </div>
    </div>
  )
}

const ImageToolsFlyout = () => {
  return (
    <div className="w-64 rounded-lg border bg-background shadow-lg">
      <div className="p-4">
         {imageTools.map(tool => <NavLink key={tool.name} tool={tool} />)}
      </div>
    </div>
  )
}

const UtilityToolsFlyout = () => {
  return (
    <div className="w-64 rounded-lg border bg-background shadow-lg">
      <div className="p-4">
         {utilityTools.map(tool => <NavLink key={tool.name} tool={tool} />)}
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

function ThemeToggle() {
  // This is a placeholder. A full implementation would require a theme context.
  return <div className="w-10 h-10" />
}
