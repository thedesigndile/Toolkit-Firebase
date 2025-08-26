"use client";

import * as React from "react";
import Link from "next/link";
import {
  ChevronsUpDown,
  Share2,
  Search,
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
import { tools, type Tool } from "@/lib/tools";
import { cn } from "@/lib/utils";

interface Category {
  name: string;
  tools: Tool[];
}

interface MappedTools {
  [key: string]: Category[];
}

export function Header() {
  const [openMenu, setOpenMenu] = React.useState<string | null>(null);

  const mappedTools = React.useMemo<MappedTools>(() => {
    const pdfTools = tools.filter(
      (tool) => tool.category.includes("PDF") || tool.category.includes("Organize") || tool.category.includes("Optimize") || tool.category.includes("Convert") || tool.category.includes("Edit") || tool.category.includes("Security")
    );
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
            openMenu === menuName && "text-primary"
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
          <Link href="/" className="flex items-center gap-2">
            <DileToolLogo className="h-8 w-auto" />
          </Link>
          <nav className="hidden md:flex items-center gap-2">
            <NavLink menuName="PDF">
              <div className="grid grid-cols-3 gap-x-8 gap-y-4 min-w-[600px]">
                {mappedTools.PDF.map((category) => (
                  <DropdownMenuGroup key={category.name}>
                    <DropdownMenuLabel className="px-2 text-base font-bold text-foreground">
                      {category.name}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator className="mx-2 bg-border" />
                    <div className="flex flex-col gap-1 mt-2">
                      {category.tools.map((tool) => (
                        <DropdownMenuItem key={tool.name} asChild>
                          <Link
                            href={`/tools/${tool.name
                              .toLowerCase()
                              .replace(/ /g, "-")
                              .replace(/&/g, "and")}`}
                            className="flex items-center gap-2"
                          >
                            <tool.icon className="h-4 w-4 text-primary" />
                            {tool.name}
                          </Link>
                        </DropdownMenuItem>
                      ))}
                    </div>
                  </DropdownMenuGroup>
                ))}
              </div>
            </NavLink>
            <NavLink menuName="Image">
                <div className="grid grid-cols-1 gap-y-1 min-w-[200px]">
                 {mappedTools.Image[0].tools.map((tool) => (
                    <DropdownMenuItem key={tool.name} asChild>
                        <Link
                        href={`/tools/${tool.name
                            .toLowerCase()
                            .replace(/ /g, "-")
                            .replace(/&/g, "and")}`}
                        className="flex items-center gap-2"
                        >
                        <tool.icon className="h-4 w-4 text-primary" />
                        {tool.name}
                        </Link>
                    </DropdownMenuItem>
                    ))}
                </div>
            </NavLink>
             <NavLink menuName="Utility">
                <div className="grid grid-cols-1 gap-y-1 min-w-[200px]">
                 {mappedTools.Utility[0].tools.map((tool) => (
                    <DropdownMenuItem key={tool.name} asChild>
                        <Link
                        href={`/tools/${tool.name
                            .toLowerCase()
                            .replace(/ /g, "-")
                            .replace(/&/g, "and")}`}
                        className="flex items-center gap-2"
                        >
                        <tool.icon className="h-4 w-4 text-primary" />
                        {tool.name}
                        </Link>
                    </DropdownMenuItem>
                    ))}
                </div>
            </NavLink>
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative hidden sm:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search"
              className="pl-9 w-40 md:w-64"
            />
          </div>
          <ThemeToggle />
          <Button variant="ghost" size="icon">
            <Share2 className="h-5 w-5" />
            <span className="sr-only">Share</span>
          </Button>
          <Button>Sign In</Button>
        </div>
      </div>
    </header>
  );
}
