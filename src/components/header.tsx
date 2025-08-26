import Link from "next/link";
import { ILovePdfLogo } from "@/components/icons";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown, Grid3x3 } from "lucide-react";
import { tools } from "@/lib/tools";
import { cn } from "@/lib/utils";

const pdfToTools = [
  { name: "PDF to JPG", slug: "pdf-to-jpg"},
  { name: "PDF to WORD", slug: "pdf-to-word"},
  { name: "PDF to POWERPOINT", slug: "pdf-to-powerpoint"},
  { name: "PDF to EXCEL", slug: "pdf-to-excel"},
  { name: "PDF to PDF/A", slug: "pdf-to-pdf-a"},
];
const fromTools = [
    { name: 'JPG to PDF', slug: 'jpg-to-pdf'},
    { name: 'WORD to PDF', slug: 'word-to-pdf'},
    { name: 'POWERPOINT to PDF', slug: 'powerpoint-to-pdf'},
    { name: 'EXCEL to PDF', slug: 'excel-to-pdf'},
    { name: 'HTML to PDF', slug: 'html-to-pdf'},
];
const allPdfTools = tools.filter(t => t.category === 'PDF Tools');


export function Header() {
  const renderToolMenuItem = (tool: {name: string, slug: string}) => (
     <DropdownMenuItem key={tool.slug} asChild>
        <Link href={`/tools/${tool.slug}`} className="flex items-center gap-3">
          <div className="bg-red-500/10 p-1 rounded-md">
            {/* Using a placeholder icon, can be replaced with specific icons later */}
            <div className="h-5 w-5 bg-red-500 rounded-sm" />
          </div>
          <span className="font-medium">{tool.name}</span>
        </Link>
      </DropdownMenuItem>
  )
  
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <ILovePdfLogo className="h-10 w-auto" />
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
              <DropdownMenuContent className="w-80">
                <div className="p-2 font-bold text-red-500">Convert to PDF</div>
                {fromTools.map(renderToolMenuItem)}
                <DropdownMenuSeparator />
                 <div className="p-2 font-bold text-red-500">Convert from PDF</div>
                {pdfToTools.map(renderToolMenuItem)}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                 <button className="flex items-center gap-1 text-foreground/80 hover:text-foreground transition-colors outline-none">
                  ALL PDF TOOLS <ChevronDown className="h-4 w-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-80 grid grid-cols-2 gap-1">
                 {allPdfTools.map(tool => (
                    <DropdownMenuItem key={tool.name} asChild>
                        <Link href={`/tools/${tool.name.toLowerCase().replace(/ /g, '-').replace(/&/g, 'and')}`} className="flex items-center gap-2">
                           <tool.icon className="h-4 w-4 text-red-500"/> <span>{tool.name}</span>
                        </Link>
                    </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
        </div>
        <div className="flex items-center gap-2">
            <Button variant="ghost">Login</Button>
            <Button className="bg-red-500 hover:bg-red-600 text-white rounded-md">Sign up</Button>
            <Button variant="ghost" size="icon" className="ml-2">
                <Grid3x3 />
            </Button>
            <ThemeToggle />
        </div>
      </div>
    </header>
  );
}