"use client";

import * as React from "react";
import Link from "next/link";
import {
  ChevronsUpDown,
  Share2,
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
} from "@/components/ui/sheet";
import { tools, type Tool } from "@/lib/tools";
import { cn } from "@/lib/utils";

interface Category {
  name: string;
  tools: Tool[];
}

interface MappedTools {
  [key: string]: Category[];
}

const PDF_CATEGORIES = ["Organize PDF", "Optimize PDF", "Convert to PDF", "Convert from PDF", "Edit PDF", "PDF Security"];

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
  
  const renderToolLinks = (tools: Tool[]) => (
      tools.map((tool) => (
      <DropdownMenuItem key={tool.name} asChild>
        <Link
          href={`/tools/${tool.name.toLowerCase().replace(/ /g, "-").replace(/&/g, "and")}`}
          className="flex items-center gap-3"
        >
          <tool.icon className="h-4 w-4 text-accent" />
          <span className="font-medium">{tool.name}</span>
        </Link>
      </DropdownMenuItem>
    ))
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
            "text-base font-semibold",
            openMenu === menuName && "text-accent"
          )}
        >
          {menuName}
          <ChevronsUpDown className="ml-1 h-4 w-4 opacity-50" />
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

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2 text-foreground">
            <DileToolLogo className="h-8 w-auto" />
          </Link>
          <nav className="hidden md:flex items-center gap-2">
            <NavLink menuName="PDF">
              <div className="grid grid-cols-3 gap-x-8 gap-y-4 min-w-[700px]">
                {renderCategoryGroups(mappedTools.PDF)}
              </div>
            </NavLink>
            <NavLink menuName="Image">
                <div className="grid grid-cols-1 gap-y-1 min-w-[240px]">
                 {renderToolLinks(mappedTools.Image[0].tools)}
                </div>
            </NavLink>
             <NavLink menuName="Utility">
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
          <Button variant="ghost" size="icon">
            <Share2 className="h-5 w-5" />
            <span className="sr-only">Share</span>
          </Button>
          <Button className="bg-primary hover:bg-primary/90 hidden md:inline-flex">Sign In</Button>
          
          {/* Mobile Menu */}
           <div className="md:hidden">
                <Sheet open={openMenu === 'mobile'} onOpenChange={(isOpen) => setOpenMenu(isOpen ? 'mobile' : null)}>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <Menu className="h-6 w-6" />
                            <span className="sr-only">Open menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left">
                        <nav className="grid gap-6 text-lg font-medium mt-8">
                             <Link href="/" className="flex items-center gap-2 mb-4">
                                <DileToolLogo className="h-8 w-auto" />
                             </Link>
                             <Link href="#" className="hover:text-accent">PDF Tools</Link>
                             <Link href="#" className="hover:text-accent">Image Tools</Link>
                             <Link href="#" className="hover:text-accent">Utility Tools</Link>
                        </nav>
                    </SheetContent>
                </Sheet>
            </div>

        </div>
      </div>
    </header>
  );
}
