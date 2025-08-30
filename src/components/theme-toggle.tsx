
"use client"

import * as React from "react"
import { Moon, Sun, Eye, Type, Contrast, Settings } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

import { useTheme } from "./theme-provider"
import { useAccessibility } from "./accessibility-provider"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function ThemeToggle({ className, style, onMouseEnter, onMouseLeave }: {
  className?: string;
  style?: React.CSSProperties;
  onMouseEnter?: React.MouseEventHandler;
  onMouseLeave?: React.MouseEventHandler;
}) {
  // Wait until mounted to render to avoid hydration errors
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => setMounted(true), [])
  if (!mounted) {
    // Render a placeholder or nothing on the server
    // to avoid hydration mismatch.
    return <div className={cn("h-10 w-10", className)} />;
  }

  return (
    <div
      className={cn("flex items-center gap-2 text-white/80 p-2", className)}
      style={style}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <Eye className="h-4 w-4" />
      <span className="text-sm font-medium">Reduced Motion: On</span>
    </div>
  )
}

    