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
    <section className="py-12 md:py-16 lg:py-20">
      <div className="container mx-auto max-w-2xl px-4">
        <Card className="overflow-hidden bg-card">
          <div className="grid md:grid-cols-[1fr,auto]">
            <div className="p-6 md:p-8">
              <CardHeader className="p-0">
                <CardTitle className="font-headline text-2xl">Stay Updated</CardTitle>
                <CardDescription className="mt-2">
                  Subscribe to our newsletter for the latest tools and features.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0 pt-6">
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
                  <Input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    required
                    className="flex-1"
                    aria-label="Email for newsletter"
                  />
                  <Button type="submit" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                    Subscribe
                  </Button>
                </form>
              </CardContent>
            </div>
            <div className="hidden md:flex items-center justify-center p-8 bg-accent/20">
                <MailCheck className="h-20 w-20 text-accent" />
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
