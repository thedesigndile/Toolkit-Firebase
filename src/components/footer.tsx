
import Link from "next/link";
import { Github, Twitter, Linkedin, Facebook, Instagram, Mail, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ModernLogo } from "./icons";

const FooterLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Link href={href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
    {children}
  </Link>
);

const FooterColumn = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="flex flex-col gap-3">
    <h4 className="font-semibold text-foreground tracking-wider uppercase text-sm">{title}</h4>
    {children}
  </div>
);

const SocialIcon = ({ href, icon: Icon }: { href: string; icon: React.ElementType }) => (
    <Link href={href} className="text-muted-foreground hover:text-foreground transition-colors">
        <Icon className="h-5 w-5" strokeWidth={1.5} />
    </Link>
);


export function Footer() {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
    
  return (
    <footer className="footer-bg text-foreground relative">
      <div className="container mx-auto px-4 py-12 md:py-16">
        
        {/* Top section: Main grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-1 flex flex-col items-start max-w-sm">
                <Link href="/" className="flex items-center gap-3 mb-4">
                    <ModernLogo />
                    <span className="text-2xl font-bold">Toolkit</span>
                </Link>
                <p className="text-muted-foreground text-base">
                    Your all-in-one suite of online tools for documents, images, and more. Simple, fast, and secure processing right in your browser.
                </p>
            </div>

            {/* Navigation Links */}
            <FooterColumn title="Navigation">
                <FooterLink href="/about">About Us</FooterLink>
                <FooterLink href="/tools">All Tools</FooterLink>
                <FooterLink href="/blog">Blog</FooterLink>
                <FooterLink href="/contact">Contact</FooterLink>
            </FooterColumn>

            {/* Resources & Support */}
            <FooterColumn title="Resources">
                <FooterLink href="/help">Help Center</FooterLink>
                <FooterLink href="/pricing">Pricing</FooterLink>
                <FooterLink href="/terms">Terms of Service</FooterLink>
                <FooterLink href="/privacy">Privacy Policy</FooterLink>
            </FooterColumn>
            
            {/* Contact & Socials */}
             <div className="flex flex-col gap-4">
                <h4 className="font-semibold text-foreground tracking-wider uppercase text-sm">Contact Us</h4>
                <a href="mailto:support@toolkit.dev" className="text-sm text-muted-foreground hover:text-foreground transition-colors">support@toolkit.dev</a>
                 <div className="flex items-center gap-4 mt-2">
                    <SocialIcon href="#" icon={Twitter} />
                    <SocialIcon href="#" icon={Github} />
                    <SocialIcon href="#" icon={Linkedin} />
                    <SocialIcon href="#" icon={Instagram} />
                </div>
            </div>
        </div>

        {/* Newsletter Section */}
        <div className="max-w-3xl mx-auto my-12 py-8 text-center bg-card/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
            <h3 className="font-semibold text-lg mb-3 flex items-center justify-center gap-2">
                <Mail className="h-5 w-5" strokeWidth={1.5} />
                Stay Updated
            </h3>
            <p className="text-muted-foreground mb-4 text-sm max-w-md mx-auto">
                Get the latest tool releases and feature updates delivered to your inbox. No spam, ever.
            </p>
            <form className="flex w-full max-w-sm items-center space-x-2 mx-auto">
                <Input type="email" placeholder="Enter your email" className="bg-white/5 border-white/20 placeholder:text-muted-foreground h-11" />
                <Button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white h-11 rounded-lg">Subscribe</Button>
            </form>
        </div>


        {/* Bottom section: Copyright and Socials */}
        <div className="mt-8 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground text-center sm:text-left">
                &copy; {new Date().getFullYear()} Toolkit Inc. All Rights Reserved.
            </p>
             <button onClick={handleScrollToTop} className="absolute bottom-6 right-6 p-3 rounded-full bg-blue-500/80 hover:bg-blue-500 text-white transition-all hover:scale-110 focus:outline-none">
                <ArrowUp className="h-5 w-5" />
            </button>
        </div>
      </div>
    </footer>
  );
}
