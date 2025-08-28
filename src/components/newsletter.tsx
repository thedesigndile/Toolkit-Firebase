
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { MailCheck } from "lucide-react";

export function Newsletter() {
  const { toast } = useToast();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");

    if (email) {
      toast({
        title: "Subscribed!",
        description: `Thanks for subscribing, ${email}!`,
      });
      (event.target as HTMLFormElement).reset();
    }
  };

  return (
    <section className="py-8 md:py-12 lg:py-16 bg-muted/50 dark:bg-card/20">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center justify-center p-4 bg-accent/10 dark:bg-accent/20 rounded-full mb-4">
                <MailCheck className="h-12 w-12 text-accent" strokeWidth={1.5} />
            </div>
            <h2 className="text-3xl font-semibold">Stay Updated</h2>
            <p className="text-muted-foreground mt-2 text-lg">
                Subscribe to our newsletter for the latest tools and features.
            </p>
            <form onSubmit={handleSubmit} className="mt-6 flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
                <Input
                type="email"
                name="email"
                placeholder="Enter your email"
                required
                className="flex-1 h-11 text-base"
                aria-label="Email for newsletter"
                />
                <Button type="submit" size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                Subscribe
                </Button>
            </form>
        </div>
      </div>
    </section>
  );
}
