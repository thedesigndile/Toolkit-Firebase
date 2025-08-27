
"use client";

import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="fixed top-0 z-50 w-full bg-black/50 backdrop-blur-sm">
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        {/* Left Side */}
        <div className="hidden md:flex items-center">
            <p className="font-bold text-2xl text-brand-blue animate-pulse-glow-text tracking-widest">OFFLINE</p>
        </div>

        {/* Center */}
        <div className="hidden md:flex items-center">
            <p className="text-xl font-bold text-brand-purple tracking-wider">PDF • IMAGE • CONVERT</p>
        </div>
        
        {/* Right Side */}
        <div className="flex-1 flex justify-end items-center">
             <div className="flex flex-col items-center">
                 <Button className="rounded-full bg-black border border-transparent hover:border-brand-blue hover:shadow-glow-blue transition-all text-white font-bold relative">
                    DRAG FILES →
                 </Button>
                 <p className="text-xs text-white/50 mt-1.5 hidden md:block">0 files ever touched servers</p>
            </div>
        </div>

        {/* Mobile Pulse Dot */}
        <div className="md:hidden absolute left-4 top-1/2 -translate-y-1/2">
             <div className="w-3 h-3 rounded-full bg-brand-blue animate-pulse"></div>
        </div>

      </div>
    </header>
  );
}
