
import Link from "next/link";
import { Github, Twitter, Linkedin, Facebook, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./theme-toggle";

const FooterLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Link href={href} className="text-muted-foreground hover:text-foreground transition-colors">
    {children}
  </Link>
);

const FooterLogo = () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="24" rx="6" fill="url(#logo-gradient-footer)"/>
        <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M14 2V8H20" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 18V12" stroke="white" strokeOpacity="0.7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9 15H15" stroke="white" strokeOpacity="0.7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <defs>
            <linearGradient id="logo-gradient-footer" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
            <stop stopColor="#2563EB"/>
            <stop offset="1" stopColor="#8B5CF6"/>
            </linearGradient>
        </defs>
    </svg>
);


export function Footer() {
  return (
    <footer className="bg-muted/50 dark:bg-card/20 border-t">
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="flex flex-col items-start">
                     <Link href="/" className="flex items-center gap-3 mb-4">
                        <FooterLogo />
                        <span className="text-xl font-semibold">Toolkit</span>
                    </Link>
                    <p className="text-muted-foreground text-sm max-w-xs">
                        The all-in-one platform for your document and creative needs.
                    </p>
                </div>
                
                <div className="flex flex-col gap-2.5">
                    <h4 className="font-semibold mb-2">Organize</h4>
                    <FooterLink href="/tools/merge-pdf">Merge PDF</FooterLink>
                    <FooterLink href="/tools/split-pdf">Split PDF</FooterLink>
                    <FooterLink href="/tools/compress-pdf">Compress PDF</FooterLink>
                </div>

                <div className="flex flex-col gap-2.5">
                    <h4 className="font-semibold mb-2">Convert</h4>
                    <FooterLink href="/tools/pdf-to-word">PDF to Word</FooterLink>
                    <FooterLink href="/tools/word-to-pdf">Word to PDF</FooterLink>
                    <FooterLink href="/tools/pdf-to-jpg">PDF to JPG</FooterLink>
                </div>

                <div className="flex flex-col gap-2.5">
                     <h4 className="font-semibold mb-2">More</h4>
                    <FooterLink href="/tools/password-generator">Password Generator</FooterLink>
                    <FooterLink href="/tools/image-resizer">Image Resizer</FooterLink>
                    <FooterLink href="/contact">Contact</FooterLink>
                </div>
            </div>

            <div className="mt-8 pt-6 border-t flex flex-col sm:flex-row justify-between items-center gap-4">
                 <p className="text-sm text-muted-foreground text-center sm:text-left">
                      &copy; {new Date().getFullYear()} Toolkit. All Rights Reserved.
                 </p>
                <div className="flex items-center gap-1">
                   <ThemeToggle />
                   <Button variant="ghost" size="icon" asChild>
                       <Link href="#" aria-label="Github"><Github className="h-4 w-4" /></Link>
                   </Button>
                   <Button variant="ghost" size="icon" asChild>
                       <Link href="#" aria-label="Twitter"><Twitter className="h-4 w-4" /></Link>
                   </Button>
                   <Button variant="ghost" size="icon" asChild>
                       <Link href="#" aria-label="LinkedIn"><Linkedin className="h-4 w-4" /></Link>
                   </Button>
                </div>
            </div>
        </div>
    </footer>
  );
}
