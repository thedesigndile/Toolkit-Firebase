
"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { motion } from "framer-motion";

export function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <motion.div
      className="max-w-2xl mx-auto mt-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
    >
      <form
        className="relative"
        onSubmit={(e) => {
          e.preventDefault();
          // Handle search submission
          console.log("Searching for:", searchTerm);
        }}
      >
        <Input
          type="search"
          placeholder="Search for any tool..."
          className="w-full h-16 pl-6 pr-16 text-lg rounded-full shadow-lg border-border/30 focus-visible:ring-primary/50"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button
          type="submit"
          size="icon"
          className="absolute top-1/2 right-3 -translate-y-1/2 w-12 h-12 rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <Search className="h-6 w-6" />
        </Button>
      </form>
    </motion.div>
  );
}
