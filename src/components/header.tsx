
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
  DropdownMenuSeparator,
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

  const renderToolLinks = (tools: Tool[], onLinkClick: () => void) => (
    tools.map((tool) => {
      const link = `/tools/${tool.name.toLowerCase().replace(/ /g, "-").replace(/&/g, "and")}`;
      return (
        <DropdownMenuItem key={tool.name} asChild>
          <Link href={link} onClick={onLinkClick} className="flex items-center gap-2 p-2 rounded-md hover:bg-accent/10">
            <tool.icon className="h-4 w-4 text-accent" />
            <span className="font-medium text-sm">{tool.name}</span>
          </Link>
        </DropdownMenuItem>
      );
    })
  );
  
  const renderCategoryGroups = (categories: Category[], onLinkClick: () => void) => (
    categories.map((category) => (
      <React.Fragment key={category.name}>
        <DropdownMenuLabel className="px-2 text-sm font-semibold text-muted-foreground">
          {category.name}
        </DropdownMenuLabel>
        {renderToolLinks(category.tools, onLinkClick)}
        <DropdownMenuSeparator className="last:hidden" />
      </React.Fragment>
    ))
  );

  const renderMobileNav = () => (
    <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
            </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-full max-w-sm p-0">
            <SheetHeader className="p-4 border-b">
                <SheetTitle asChild>
                     <Link href="/" className="flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
                        <DileToolLogo className="h-8 w-auto" />
                     </Link>
                </SheetTitle>
            </SheetHeader>
            <div className="p-4">
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="pdf">
                        <AccordionTrigger className="text-lg font-semibold">PDF Tools</AccordionTrigger>
                        <AccordionContent>
                           <div className="pl-2 space-y-2">
                             {toolCategories.PDF.map(category => (
                                <div key={category.name}>
                                    <h4 className="font-bold text-muted-foreground mb-2 text-sm">{category.name}</h4>
                                    <div className="flex flex-col gap-1">
                                      {category.tools.map(tool => (
                                        <Link 
                                          key={tool.name} 
                                          href={`/tools/${tool.name.toLowerCase().replace(/ /g, "-").replace(/&/g, "and")}`} 
                                          onClick={() => setIsMobileMenuOpen(false)}
                                          className="flex items-center gap-3 p-2 -m-2 rounded-md hover:bg-accent/10"
                                        >
                                          <tool.icon className="h-4 w-4 text-accent" />
                                          <span>{tool.name}</span>
                                        </Link>
                                      ))}
                                    </div>
                                </div>
                             ))}
                           </div>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="image">
                        <AccordionTrigger className="text-lg font-semibold">Image Tools</AccordionTrigger>
                        <AccordionContent>
                            <div className="pl-2 flex flex-col gap-1">
                              {renderToolLinks(toolCategories.Image[0].tools, () => setIsMobileMenuOpen(false))}
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="utility">
                        <AccordionTrigger className="text-lg font-semibold">Utility Tools</AccordionTrigger>
                        <AccordionContent>
                           <div className="pl-2 flex flex-col gap-1">
                             {renderToolLinks(toolCategories.Utility[0].tools, () => setIsMobileMenuOpen(false))}
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
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

        <nav className="hidden md:flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="text-base font-semibold">All Tools</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[300px]" align="center">
                 <DropdownMenuGroup>
                  <DropdownMenuLabel className="font-bold text-base">PDF Tools</DropdownMenuLabel>
                   {renderCategoryGroups(toolCategories.PDF, () => {})}
                 </DropdownMenuGroup>
                 <DropdownMenuSeparator />
                 <DropdownMenuGroup>
                  <DropdownMenuLabel className="font-bold text-base">Image Tools</DropdownMenuLabel>
                  {renderToolLinks(toolCategories.Image[0].tools, () => {})}
                 </DropdownMenuGroup>
                 <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                  <DropdownMenuLabel className="font-bold text-base">Utility Tools</DropdownMenuLabel>
                  {renderToolLinks(toolCategories.Utility[0].tools, () => {})}
                 </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
            <Link href="#" className="text-base font-semibold text-muted-foreground hover:text-foreground">About</Link>
            <Link href="#" className="text-base font-semibold text-muted-foreground hover:text-foreground">Contact</Link>
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
