
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background pt-20">
      <main className="flex-1">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-4xl font-bold font-headline">Contact Us</h1>
            <p className="text-muted-foreground mt-2 text-lg">
              Have questions? We'd love to hear from you.
            </p>
          </div>
          <form className="max-w-2xl mx-auto mt-8 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Your Name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="your@email.com" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" placeholder="Your message..." rows={5} />
            </div>
            <div className="text-center">
              <Button type="submit" size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">Send Message</Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
