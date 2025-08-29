
"use client";

import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Search } from "lucide-react";
import { AnimatedHeroBackground } from "./animated-hero-background";

interface AnimatedHeroProps {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
}

export function AnimatedHero({ searchTerm, setSearchTerm }: AnimatedHeroProps) {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    return (
        <div className="relative text-center max-w-5xl mx-auto mb-8 overflow-hidden rounded-3xl">
            {isMounted && <AnimatedHeroBackground />}
            <div className="relative z-10 py-16 md:py-20">
                <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-shadow text-white mb-6">
                    <span className="block">Every Tool</span>
                    <span className="block text-gradient-blue">You Need</span>
                </h1>

                <p className="mt-6 text-lg md:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed px-4">
                    Discover a powerful suite of free tools to boost your productivity, streamline your workflow, and handle tasks like PDF editing, image conversion, and more— all right in your browser.
                </p>

                <div className="my-10 mx-auto max-w-lg relative px-4">
                    <Search className="absolute left-8 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" aria-hidden="true" />
                    <Input
                        type="search"
                        placeholder="Search for any tool..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 h-14 md:h-16 text-base md:text-lg rounded-full shadow-xl border-2 border-transparent focus:border-brand-blue/30 transition-all duration-300 bg-white/90"
                        aria-label="Search for a tool"
                        role="searchbox"
                    />
                </div>

                <div className="flex flex-wrap justify-center gap-4 mt-8">
                    <div className="flex items-center gap-2 text-sm text-white/80">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <span>Free & Unlimited</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-white/80">
                        <div className="w-2 h-2 bg-sky-400 rounded-full animate-pulse"></div>
                        <span>No Registration</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-white/80">
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                        <span>Browser-Based</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
