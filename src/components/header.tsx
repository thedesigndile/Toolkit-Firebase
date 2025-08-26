import Link from "next/link";
import { DileToolLogo } from "@/components/icons";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown, Grid3x3 } from "lucide-react";
import { tools } from "@/lib/tools";

const convertToPdfTools = tools.filter(t => t.category === 'Convert to PDF');
const convertFromPdfTools = tools.filter(t => t.category === 'Convert from PDF');

const allPdfToolsByCategory = Array.from(
    tools.reduce((acc, tool) => {
        if (!acc.has(tool.category)) {
            acc.set(tool.category, {
                name: tool.category,
                icon: tool.categoryIcon,
                tools: [],
            });
        }
        acc.get(tool.category)!.tools.push(tool);
        return acc;
    }, new Map<string, {name: string, icon: any, tools: any[]}>()).values()
);

export function Header() {
  const renderToolMenuItem = (tool: {name: string, icon: any, category: string}) => {
    const slug = tool.name.toLowerCase().replace(/ /g, '-').replace(/&/g, 'and');
     return (
        <DropdownMenuItem key={slug} asChild>
            <Link href={`/tools/${slug}`} className="flex items-center gap-2">
                <tool.icon className="h-4 w-4 text-primary"/> <span>{tool.name}</span>
            </Link>
        </DropdownMenuItem>
    )
  }
  
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <DileToolLogo className="h-10 w-auto" />
          </Link>
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium">
            <Link href="/tools/merge-pdf" className="text-foreground/80 hover:text-foreground transition-colors">MERGE PDF</Link>
            <Link href="/tools/split-pdf" className="text-foreground/80 hover:text-foreground transition-colors">SPLIT PDF</Link>
            <Link href="/tools/compress-pdf" className="text-foreground/80 hover:text-foreground transition-colors">COMPRESS PDF</Link>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-1 text-foreground/80 hover:text-foreground transition-colors outline-none">
                  CONVERT PDF <ChevronDown className="h-4 w-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-64">
                <DropdownMenuLabel className="font-bold text-primary">Convert to PDF</DropdownMenuLabel>
                {convertToPdfTools.map(renderToolMenuItem)}
                <DropdownMenuSeparator />
                <DropdownMenuLabel className="font-bold text-primary">Convert from PDF</DropdownMenuLabel>
                {convertFromPdfTools.map(renderToolMenuItem)}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                 <button className="flex items-center gap-1 text-foreground/80 hover:text-foreground transition-colors outline-none">
                  ALL PDF TOOLS <ChevronDown className="h-4 w-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-96 max-h-[80vh] overflow-y-auto">
                 {allPdfToolsByCategory.map((category) => (
                    <DropdownMenuGroup key={category.name}>
                        <DropdownMenuLabel className="font-bold text-primary flex items-center gap-2">
                            <category.icon className="h-4 w-4" />
                            {category.name}
                        </DropdownMenuLabel>
                        <div className="grid grid-cols-2 gap-1">
                            {category.tools.map(renderToolMenuItem)}
                        </div>
                    </DropdownMenuGroup>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
        </div>
        <div className="flex items-center gap-2">
            <Button variant="ghost">Login</Button>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-md">Sign up</Button>
            <Button variant="ghost" size="icon" className="ml-2">
                <Grid3x3 />
            </Button>
            <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
