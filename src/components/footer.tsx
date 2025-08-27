import Link from "next/link";
import { DileToolLogo } from "@/components/icons";
import { Github, Twitter, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className="bg-background border-t">
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex flex-col items-center md:items-start text-center md:text-left">
                    <Link href="/" className="flex items-center gap-2 mb-2">
                        <DileToolLogo />
                    </Link>
                    <p className="text-sm text-muted-foreground">
                      &copy; {new Date().getFullYear()} Toolkit. All Rights Reserved.
                    </p>
                </div>
                <div className="flex items-center gap-2">
                   <Button variant="ghost" size="icon" asChild>
                       <Link href="#" aria-label="Github">
                           <Github className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
                       </Link>
                   </Button>
                   <Button variant="ghost" size="icon" asChild>
                       <Link href="#" aria-label="Twitter">
                           <Twitter className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
                       </Link>
                   </Button>
                   <Button variant="ghost" size="icon" asChild>
                       <Link href="#" aria-label="LinkedIn">
                           <Linkedin className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
                       </Link>
                   </Button>
                </div>
            </div>
        </div>
    </footer>
  );
}
