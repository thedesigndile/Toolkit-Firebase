"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { MailCheck } from "lucide-react";
import { motion } from "framer-motion";

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
    <section className="py-8 md:py-12 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl mx-auto text-center">
            <motion.div
              className="inline-flex items-center justify-center p-4 bg-primary/10 rounded-full mb-6 shadow-lg"
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
                <MailCheck className="h-12 w-12 text-primary" strokeWidth={1.5} />
            </motion.div>
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-primary mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Stay Updated
            </motion.h2>
            <motion.p
              className="text-muted-foreground mt-2 text-lg md:text-xl leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
                Subscribe to our newsletter for the latest tools and features.
            </motion.p>
            <motion.form
              onSubmit={handleSubmit}
              className="mt-8 flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
                <Input
                type="email"
                name="email"
                placeholder="Enter your email address"
                required
                className="flex-1 h-12 text-base rounded-full border-2 border-border focus:border-primary/30 transition-all duration-300"
                aria-label="Email for newsletter"
                />
                <Button
                  type="submit"
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                Subscribe
            </Button>
            </motion.form>

            <motion.div
              className="mt-6 flex flex-wrap justify-center gap-6 text-sm text-muted-foreground"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <span className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                No spam, ever
              </span>
              <span className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                Weekly updates
              </span>
              <span className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                Unsubscribe anytime
              </span>
            </motion.div>
        </div>
      </div>
    </section>
  );
}