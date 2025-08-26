
import Link from "next/link";
import { DileToolLogo } from "@/components/icons";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { tools } from "@/lib/tools";

const allToolsByCategory = Array.from(
    tools.reduce((acc, tool) => {
        if (!acc.has(tool.category)) {
            acc.set(tool.category, {
                name: tool.category,
                icon: tool.categoryIcon,
                tools: [],
            });
        }
        const category = acc.get(tool.category);
        if(category) {
            category.tools.push(tool);
        }
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
             <DropdownMenu>
              <DropdownMenuTrigger asChild>
                 <Button variant="ghost" className="flex items-center gap-1 text-base">
                  All Tools <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[80vw] max-w-4xl max-h-[80vh] overflow-y-auto" align="start">
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                    {allToolsByCategory.map((category) => (
                        <div key={category.name}>
                            <DropdownMenuLabel className="font-bold text-primary flex items-center gap-2 text-lg mb-2">
                                <category.icon className="h-5 w-5" />
                                {category.name}
                            </DropdownMenuLabel>
                            <div className="flex flex-col gap-1">
                                {category.tools.map(renderToolMenuItem)}
                            </div>
                        </div>
                    ))}
                 </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
        </div>
        <div className="flex items-center gap-2">
            <Button variant="ghost">Login</Button>
            <Button>Sign up</Button>
            <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
