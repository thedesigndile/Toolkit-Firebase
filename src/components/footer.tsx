
import Link from "next/link";
import { DileToolLogo } from "@/components/icons";
import { Github, Twitter, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className="bg-card text-card-foreground border-t">
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="flex flex-col items-center md:items-start">
                    <Link href="/" className="flex items-center gap-2 mb-4">
                        <DileToolLogo className="h-8 w-auto" />
                    </Link>
                    <p className="text-muted-foreground text-sm text-center md:text-left">
                        Your all-in-one solution for offline document and image processing. Secure, fast, and free.
                    </p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 text-sm">
                    <div>
                        <h4 className="font-semibold mb-3">Company</h4>
                        <ul className="space-y-2">
                            <li><Link href="#" className="text-muted-foreground hover:text-accent">About Us</Link></li>
                            <li><Link href="#" className="text-muted-foreground hover:text-accent">Careers</Link></li>
                            <li><Link href="#" className="text-muted-foreground hover:text-accent">Contact</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-3">Legal</h4>
                        <ul className="space-y-2">
                            <li><Link href="#" className="text-muted-foreground hover:text-accent">Privacy Policy</Link></li>
                            <li><Link href="#" className="text-muted-foreground hover:text-accent">Terms of Service</Link></li>
                        </ul>
                    </div>
                     <div className="mt-8 sm:mt-0">
                        <h4 className="font-semibold mb-3">Social</h4>
                        <ul className="space-y-2">
                            <li><Link href="#" className="text-muted-foreground hover:text-accent flex items-center gap-2"><Github className="h-4 w-4" /> Github</Link></li>
                            <li><Link href="#" className="text-muted-foreground hover:text-accent flex items-center gap-2"><Twitter className="h-4 w-4" /> Twitter</Link></li>
                            <li><Link href="#" className="text-muted-foreground hover:text-accent flex items-center gap-2"><Linkedin className="h-4 w-4" /> LinkedIn</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="flex flex-col items-center md:items-end text-center md:text-right">
                    <h4 className="font-semibold mb-3">Stay Connected</h4>
                    <p className="text-muted-foreground text-sm mb-4">Get the latest tool updates and news.</p>
                     <Button variant="outline">Subscribe</Button>
                </div>
            </div>
            <div className="mt-8 pt-6 border-t text-center text-sm text-muted-foreground">
                <p>&copy; {new Date().getFullYear()} Offline Toolkit. All Rights Reserved.</p>
            </div>
        </div>
    </footer>
  );
}
