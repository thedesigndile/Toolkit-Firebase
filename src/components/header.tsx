
"use client";

import * as React from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { DileToolLogo } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { tools, type Tool } from "@/lib/tools";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";


interface Category {
  name: string;
  tools: Tool[];
}

const PDF_CATEGORIES = ["Organize PDF", "Optimize PDF", "Convert to PDF", "Convert from PDF", "Edit PDF", "PDF Security", "Extra Tools"];

const groupTools = (filter: (tool: Tool) => boolean) => {
    const grouped: { [key: string]: Tool[] } = {};
    tools.filter(filter).forEach((tool) => {
        if (!grouped[tool.category]) {
            grouped[tool.category] = [];
        }
        grouped[tool.category].push(tool);
    });
    return Object.entries(grouped).map(([name, tools]) => ({ name, tools }));
};


export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  
  const toolCategories = React.useMemo(() => {
    const pdfTools = groupTools(tool => PDF_CATEGORIES.includes(tool.category));
    const imageTools = groupTools(tool => tool.category === "Image Tools");
    const utilityTools = groupTools(tool => tool.category === "Utility Tools");
    return { PDF: pdfTools, Image: imageTools, Utility: utilityTools };
  }, []);

  const renderToolLinks = (tools: Tool[], onLinkClick: () => void, className?: string) => (
    tools.map((tool) => {
      const link = `/tools/${tool.name.toLowerCase().replace(/ /g, "-").replace(/&/g, "and")}`;
      return (
        <Link 
            href={link} 
            key={tool.name} 
            onClick={onLinkClick} 
            className={cn("flex items-center gap-3 p-2 -m-2 rounded-md hover:bg-accent/10 transition-colors", className)}
        >
          <tool.icon className="h-4 w-4 text-accent flex-shrink-0" />
          <div className="flex flex-col">
            <span className="font-medium text-sm leading-tight">{tool.name}</span>
          </div>
        </Link>
      );
    })
  );
  
  const renderMobileNav = () => (
    <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
            </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-full max-w-sm p-0 flex flex-col">
            <SheetHeader className="p-4 border-b">
                <SheetTitle asChild>
                     <Link href="/" className="flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
                        <DileToolLogo className="h-8 w-auto" />
                     </Link>
                </SheetTitle>
            </SheetHeader>
            <div className="p-4 flex-1 overflow-y-auto">
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="pdf">
                        <AccordionTrigger className="text-lg font-semibold">PDF Tools</AccordionTrigger>
                        <AccordionContent>
                           <div className="pl-2 space-y-4">
                             {toolCategories.PDF.map(category => (
                                <div key={category.name}>
                                    <h4 className="font-bold text-muted-foreground mb-2 text-sm">{category.name}</h4>
                                    <div className="flex flex-col gap-2">
                                      {renderToolLinks(category.tools, () => setIsMobileMenuOpen(false))}
                                    </div>
                                </div>
                             ))}
                           </div>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="image">
                        <AccordionTrigger className="text-lg font-semibold">Image Tools</AccordionTrigger>
                        <AccordionContent>
                            <div className="pl-2 flex flex-col gap-2">
                              {renderToolLinks(toolCategories.Image[0].tools, () => setIsMobileMenuOpen(false))}
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="utility">
                        <AccordionTrigger className="text-lg font-semibold">Utility Tools</AccordionTrigger>
                        <AccordionContent>
                           <div className="pl-2 flex flex-col gap-2">
                             {renderToolLinks(toolCategories.Utility[0].tools, () => setIsMobileMenuOpen(false))}
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
                 <div className="mt-6 border-t pt-6 flex flex-col gap-2">
                    <Link href="#" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-semibold text-muted-foreground hover:text-foreground p-2 -m-2 rounded-md">About</Link>
                    <Link href="#" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-semibold text-muted-foreground hover:text-foreground p-2 -m-2 rounded-md">Contact</Link>
                 </div>
            </div>
        </SheetContent>
    </Sheet>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2 text-foreground">
            <DileToolLogo className="h-8 w-auto" />
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="text-base font-semibold">PDF Tools</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[var(--radix-dropdown-menu-trigger-width)] sm:w-auto p-4" align="start">
                 <div className="grid grid-cols-3 gap-x-8 gap-y-4">
                    {toolCategories.PDF.map(category => (
                        <div key={category.name}>
                             <h3 className="font-bold text-muted-foreground mb-2 text-sm">{category.name}</h3>
                             <div className="flex flex-col gap-2">
                               {renderToolLinks(category.tools, () => {}, "p-2 -m-2")}
                             </div>
                        </div>
                    ))}
                 </div>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="text-base font-semibold">Image Tools</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-64 p-2">
                 <div className="flex flex-col gap-1">
                    {renderToolLinks(toolCategories.Image[0].tools, () => {}, "p-3 -m-1")}
                 </div>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="text-base font-semibold">Utility Tools</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-64 p-2">
                 <div className="flex flex-col gap-1">
                    {renderToolLinks(toolCategories.Utility[0].tools, () => {}, "p-3 -m-1")}
                 </div>
              </DropdownMenuContent>
            </DropdownMenu>

            <Link href="#" className="text-base font-semibold text-muted-foreground hover:text-foreground px-3 py-2 rounded-md">About</Link>
            <Link href="#" className="text-base font-semibold text-muted-foreground hover:text-foreground px-3 py-2 rounded-md">Contact</Link>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <div className="md:hidden">
            {renderMobileNav()}
          </div>
        </div>
      </div>
    </header>
  );
}

    