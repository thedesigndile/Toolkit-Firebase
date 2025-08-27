"use client";

import * as React from "react";
import Link from "next/link";
import { FileImage, Menu, ShieldCheck, File as PdfIcon, X } from "lucide-react";
import { DileToolLogo } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { tools, type Tool } from "@/lib/tools";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

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

  const pdfTools = React.useMemo(() => groupTools(tool => PDF_CATEGORIES.includes(tool.category)), []);
  const imageTools = React.useMemo(() => groupTools(tool => tool.category === "Image Tools"), []);
  const allTools = React.useMemo(() => groupTools(() => true), []);

  const renderToolLinks = (tools: Tool[], onLinkClick: () => void) => (
    tools.map((tool) => (
      <Link
        href={`/tools/${tool.name.toLowerCase().replace(/ /g, "-").replace(/&/g, "and")}`}
        key={tool.name}
        onClick={onLinkClick}
        className="flex items-center gap-3 p-2 -m-2 rounded-md hover:bg-muted/50 transition-colors"
      >
        <tool.icon className="h-4 w-4 text-accent flex-shrink-0" />
        <span className="font-medium text-sm leading-tight text-foreground">{tool.name}</span>
      </Link>
    ))
  );

  const renderDesktopNav = () => (
    <nav className="hidden md:flex items-center gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="rounded-full border-brand-blue hover:bg-brand-blue/10 text-brand-blue">PDF Tools</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-auto p-4" align="start">
          <div className="grid grid-cols-3 gap-x-8 gap-y-4">
            {pdfTools.map(category => (
              <div key={category.name}>
                <h3 className="font-bold text-muted-foreground mb-2 text-sm">{category.name}</h3>
                <div className="flex flex-col gap-2">
                  {renderToolLinks(category.tools, () => {})}
                </div>
              </div>
            ))}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="rounded-full border-brand-purple hover:bg-brand-purple/10 text-brand-purple">Image Tools</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-64 p-2">
          {imageTools[0] && renderToolLinks(imageTools[0].tools, () => {})}
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="rounded-full">All Tools</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-auto p-4" align="center">
           <div className="grid grid-cols-4 gap-x-8 gap-y-4">
            {allTools.map(category => (
                <div key={category.name}>
                     <h3 className="font-bold text-muted-foreground mb-2 text-sm">{category.name}</h3>
                     <div className="flex flex-col gap-2">
                       {renderToolLinks(category.tools, () => {})}
                     </div>
                </div>
            ))}
           </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  );

  const renderMobileNav = () => (
    <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
            </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-full max-w-xs p-4 flex flex-col bg-background">
            <div className="flex justify-between items-center mb-6">
                 <Link href="/" className="flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
                    <DileToolLogo className="h-8 w-auto text-foreground" />
                 </Link>
                 <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
                    <X className="h-6 w-6" />
                 </Button>
            </div>
            <div className="flex flex-col gap-4 overflow-y-auto">
                <DropdownMenuLabel className="px-0 text-base font-semibold">Tools</DropdownMenuLabel>
                <div className="flex flex-col gap-2">
                    <h4 className="font-bold text-brand-blue flex items-center gap-2"><PdfIcon className="w-4 h-4"/> PDF Tools</h4>
                    {pdfTools.flatMap(c => c.tools).map(tool => (
                      <Link href={`/tools/${tool.name.toLowerCase().replace(/ /g, "-").replace(/&/g, "and")}`} key={tool.name} onClick={() => setIsMobileMenuOpen(false)} className="pl-6 text-sm text-muted-foreground hover:text-foreground">{tool.name}</Link>
                    ))}
                </div>
                <DropdownMenuSeparator />
                 <div className="flex flex-col gap-2">
                    <h4 className="font-bold text-brand-purple flex items-center gap-2"><FileImage className="w-4 h-4"/> Image Tools</h4>
                    {imageTools.flatMap(c => c.tools).map(tool => (
                      <Link href={`/tools/${tool.name.toLowerCase().replace(/ /g, "-").replace(/&/g, "and")}`} key={tool.name} onClick={() => setIsMobileMenuOpen(false)} className="pl-6 text-sm text-muted-foreground hover:text-foreground">{tool.name}</Link>
                    ))}
                </div>
            </div>
        </SheetContent>
    </Sheet>
  );
  
  return (
    <>
      <header className="fixed top-0 z-50 w-full border-b bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto flex h-20 items-center justify-between px-4">
          <div className="flex items-center gap-4">
             <Link href="/" className="flex items-center gap-2">
                <DileToolLogo className="h-8 w-auto text-foreground hidden sm:block" />
                <DileToolLogo className="h-8 w-auto text-foreground sm:hidden" />
             </Link>
             <p className="hidden lg:block text-sm font-semibold text-brand-blue">
                Offline PDF & Image Tools • Zero Uploads
             </p>
          </div>

          {renderDesktopNav()}

          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-2">
                <div className="bg-brand-blue text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1.5">
                    <ShieldCheck className="h-4 w-4" />
                    <span>Offline Mode</span>
                </div>
                <div className="flex flex-col items-center">
                    <Button className="rounded-full bg-gradient-to-r from-brand-blue to-brand-purple text-white relative hover:shadow-lg hover:shadow-brand-purple/50 transition-shadow animate-pulse-glow">
                        Upload File
                    </Button>
                    <p className="text-xs text-soft-gray mt-1">Files never leave your device</p>
                </div>
            </div>
            {renderMobileNav()}
          </div>
        </div>
      </header>

      {/* Mobile Bottom Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-t p-2">
          <div className="container mx-auto flex justify-between items-center">
            <div className="bg-brand-blue text-white px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1">
                <ShieldCheck className="h-4 w-4" />
                <span>Offline Mode</span>
            </div>
            <div className="flex flex-col items-center">
                <Button size="sm" className="rounded-full bg-gradient-to-r from-brand-blue to-brand-purple text-white relative hover:shadow-lg hover:shadow-brand-purple/50 transition-shadow animate-pulse-glow">
                    Upload File
                </Button>
                 <p className="text-[10px] text-soft-gray mt-0.5">Files never leave your device</p>
            </div>
          </div>
      </div>
    </>
  );
}
