"use client";

import * as React from "react";
import Link from "next/link";
import {
  ChevronDown,
  Search,
  Menu,
} from "lucide-react";
import { DileToolLogo } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  SheetTitle
} from "@/components/ui/sheet";
import { tools, type Tool } from "@/lib/tools";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"


interface Category {
  name: string;
  tools: Tool[];
}

interface MappedTools {
  [key: string]: Category[];
}

const PDF_CATEGORIES = ["Organize PDF", "Optimize PDF", "Convert to PDF", "Convert from PDF", "Edit PDF", "PDF Security", "Extra Tools"];

export function Header() {
  const [openMenu, setOpenMenu] = React.useState<string | null>(null);

  const mappedTools = React.useMemo<MappedTools>(() => {
    const pdfTools = tools.filter(tool => PDF_CATEGORIES.includes(tool.category));
    const imageTools = tools.filter((tool) => tool.category === "Image Tools");
    const utilityTools = tools.filter((tool) => tool.category === "Utility Tools");

    const groupByCategory = (tools: Tool[]): Category[] => {
      const groups: { [key: string]: Tool[] } = {};
      tools.forEach((tool) => {
        if (!groups[tool.category]) {
          groups[tool.category] = [];
        }
        groups[tool.category].push(tool);
      });
      return Object.entries(groups).map(([name, tools]) => ({ name, tools }));
    };

    return {
      PDF: groupByCategory(pdfTools),
      Image: groupByCategory(imageTools),
      Utility: groupByCategory(utilityTools),
    };
  }, []);
  
  const renderToolLinks = (tools: Tool[], isMobile: boolean = false) => (
      tools.map((tool) => {
        const link = `/tools/${tool.name.toLowerCase().replace(/ /g, "-").replace(/&/g, "and")}`;
        const content = (
            <div className="flex items-center gap-3">
                <tool.icon className="h-4 w-4 text-accent" />
                <span className="font-medium">{tool.name}</span>
            </div>
        );

        if(isMobile) {
            return (
                <Link key={tool.name} href={link} className="block p-2 -m-2 rounded-md hover:bg-accent/10">
                   {content}
                </Link>
            )
        }
        return (
            <DropdownMenuItem key={tool.name} asChild>
                <Link href={link}>
                    {content}
                </Link>
            </DropdownMenuItem>
        )
      })
  );
  
  const renderCategoryGroups = (categories: Category[]) => (
    categories.map((category) => (
      <DropdownMenuGroup key={category.name}>
        <DropdownMenuLabel className="px-2 text-base font-bold text-foreground">
          {category.name}
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="mx-2 bg-border" />
        <div className="flex flex-col gap-1 mt-2">
          {renderToolLinks(category.tools)}
        </div>
      </DropdownMenuGroup>
    ))
  );

  const NavLink = ({
    menuName,
    children,
  }: {
    menuName: string;
    children: React.ReactNode;
  }) => (
    <DropdownMenu
      open={openMenu === menuName}
      onOpenChange={(isOpen) => setOpenMenu(isOpen ? menuName : null)}
    >
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className={cn(
            "text-base font-semibold text-foreground/70 hover:text-accent hover:bg-transparent",
            openMenu === menuName && "text-accent"
          )}
        >
          {menuName}
          <ChevronDown className="ml-1 h-4 w-4 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        className="p-4"
        onCloseAutoFocus={(e) => e.preventDefault()}
      >
        {children}
      </DropdownMenuContent>
    </DropdownMenu>
  );
  
  const renderMobileNav = () => (
    <Sheet open={openMenu === 'mobile'} onOpenChange={(isOpen) => setOpenMenu(isOpen ? 'mobile' : null)}>
        <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
            </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-full max-w-sm">
            <SheetHeader>
                <SheetTitle asChild>
                     <Link href="/" className="flex items-center gap-2 mb-4" onClick={() => setOpenMenu(null)}>
                        <DileToolLogo className="h-8 w-auto" />
                     </Link>
                </SheetTitle>
            </SheetHeader>
            <div className="mt-4">
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="pdf">
                        <AccordionTrigger className="text-lg font-semibold">PDF Tools</AccordionTrigger>
                        <AccordionContent>
                           <div className="pl-4 space-y-4">
                             {mappedTools.PDF.map(category => (
                                <div key={category.name}>
                                    <h4 className="font-bold mb-2">{category.name}</h4>
                                    <div className="flex flex-col gap-2">
                                        {renderToolLinks(category.tools, true)}
                                    </div>
                                </div>
                             ))}
                           </div>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="image">
                        <AccordionTrigger className="text-lg font-semibold">Image Tools</AccordionTrigger>
                        <AccordionContent>
                            <div className="pl-4 flex flex-col gap-2">
                                {renderToolLinks(mappedTools.Image[0].tools, true)}
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="utility">
                        <AccordionTrigger className="text-lg font-semibold">Utility Tools</AccordionTrigger>
                        <AccordionContent>
                           <div className="pl-4 flex flex-col gap-2">
                                {renderToolLinks(mappedTools.Utility[0].tools, true)}
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </SheetContent>
    </Sheet>
  )

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2 text-foreground">
            <DileToolLogo className="h-8 w-auto" />
          </Link>
          <nav className="hidden md:flex items-center gap-2">
            <NavLink menuName="PDF Tools">
              <div className="grid grid-cols-3 gap-x-8 gap-y-4 min-w-[700px]">
                {renderCategoryGroups(mappedTools.PDF)}
              </div>
            </NavLink>
            <NavLink menuName="Image Tools">
                <div className="grid grid-cols-1 gap-y-1 min-w-[240px]">
                 {renderToolLinks(mappedTools.Image[0].tools)}
                </div>
            </NavLink>
             <NavLink menuName="Utility Tools">
                <div className="grid grid-cols-1 gap-y-1 min-w-[240px]">
                 {renderToolLinks(mappedTools.Utility[0].tools)}
                </div>
            </NavLink>
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative hidden sm:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search tools..."
              className="pl-9 w-40 md:w-64"
            />
          </div>
          <ThemeToggle />
          <Button variant="outline" className="hidden md:inline-flex">Sign In</Button>
          
          <div className="md:hidden">
            {renderMobileNav()}
          </div>
        </div>
      </div>
    </header>
  );
}
