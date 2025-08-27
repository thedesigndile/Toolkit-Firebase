import Link from "next/link";
import { DileToolLogo } from "@/components/icons";
import { Github, Twitter, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";

const FooterLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Link href={href} className="text-muted-foreground hover:text-white transition-colors duration-200 ease-in-out text-base">
    {children}
  </Link>
);

const FooterLogo = () => (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="24" rx="6" fill="url(#logo-gradient)"/>
        <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M14 2V8H20" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 18V12" stroke="white" strokeOpacity="0.7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9 15H15" stroke="white" strokeOpacity="0.7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <defs>
            <linearGradient id="logo-gradient" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
            <stop stopColor="#2563EB"/>
            <stop offset="1" stopColor="#8B5CF6"/>
            </linearGradient>
        </defs>
    </svg>
);


export function Footer() {
  return (
    <footer className="footer-bg text-white border-t border-white/10">
        <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-8">
                <div className="lg:col-span-2 flex flex-col items-start">
                     <Link href="/" className="flex items-center gap-3 mb-4">
                        <FooterLogo />
                        <span className="text-2xl font-bold text-white">Toolkit</span>
                    </Link>
                    <p className="text-muted-foreground text-base max-w-sm">
                        The all-in-one platform for your document and creative needs. Free, secure, and right in your browser.
                    </p>
                </div>
                
                <div className="flex flex-col gap-4">
                    <h4 className="font-semibold text-lg mb-2">Tools</h4>
                    <FooterLink href="/tools">Merge PDF</FooterLink>
                    <FooterLink href="/tools">Compress PDF</FooterLink>
                    <FooterLink href="/tools">Image Converter</FooterLink>
                    <FooterLink href="/tools">Password Generator</FooterLink>
                </div>

                <div className="flex flex-col gap-4">
                    <h4 className="font-semibold text-lg mb-2">Company</h4>
                    <FooterLink href="/pricing">Pricing</FooterLink>
                    <FooterLink href="/contact">Contact</FooterLink>
                </div>

                <div className="flex flex-col gap-4">
                    <h4 className="font-semibold text-lg mb-2">Legal</h4>
                    <FooterLink href="#">Privacy Policy</FooterLink>
                    <FooterLink href="#">Terms of Service</FooterLink>
                </div>
            </div>

            <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
                 <p className="text-sm text-muted-foreground text-center sm:text-left">
                      &copy; {new Date().getFullYear()} Toolkit. All Rights Reserved.
                 </p>
                <div className="flex items-center gap-2">
                   <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-white hover:bg-white/10" asChild>
                       <Link href="#" aria-label="Github">
                           <Github className="h-5 w-5" />
                       </Link>
                   </Button>
                   <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-white hover:bg-white/10" asChild>
                       <Link href="#" aria-label="Twitter">
                           <Twitter className="h-5 w-5" />
                       </Link>
                   </Button>
                   <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-white hover:bg-white/10" asChild>
                       <Link href="#" aria-label="LinkedIn">
                           <Linkedin className="h-5 w-5" />
                       </Link>
                   </Button>
                </div>
            </div>
        </div>
    </footer>
  );
}
