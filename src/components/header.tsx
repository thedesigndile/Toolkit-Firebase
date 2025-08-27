
"use client";

import { DileToolLogo } from "./icons";

export function Header() {
  return (
    <header className="fixed top-0 z-50 w-full bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto flex h-24 items-center justify-center px-4">
        <DileToolLogo />
      </div>
    </header>
  );
}
