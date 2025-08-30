
"use client"

import * as React from "react"
import { Moon, Sun, Eye, Type, Contrast, Settings } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

import { useTheme } from "./theme-provider"
import { useAccessibility } from "./accessibility-provider"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme()
  const {
    highContrast,
    largeText,
    reducedMotion,
    setHighContrast,
    setLargeText,
    setReducedMotion,
    announceToScreenReader
  } = useAccessibility()

  const [showAccessibilityMenu, setShowAccessibilityMenu] = React.useState(false)

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    announceToScreenReader(`Theme changed to ${newTheme} mode`, 'polite');
  };

  const toggleHighContrast = () => {
    setHighContrast(!highContrast);
    announceToScreenReader(
      `${highContrast ? 'Disabled' : 'Enabled'} high contrast mode`,
      'assertive'
    );
  };

  const toggleLargeText = () => {
    setLargeText(!largeText);
    announceToScreenReader(
      `${largeText ? 'Disabled' : 'Enabled'} large text mode`,
      'assertive'
    );
  };

  const toggleReducedMotion = () => {
    setReducedMotion(!reducedMotion);
    announceToScreenReader(
      `${reducedMotion ? 'Disabled' : 'Enabled'} reduced motion`,
      'assertive'
    );
  };

  // Wait until mounted to render to avoid hydration errors
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => setMounted(true), [])
  if (!mounted) {
    // Render a placeholder or nothing on the server
    // to avoid hydration mismatch.
    return <div className={cn("h-10 w-10", className)} />;
  }

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setShowAccessibilityMenu(!showAccessibilityMenu)}
        aria-label="Accessibility settings"
        aria-expanded={showAccessibilityMenu}
        aria-haspopup="menu"
        className={cn("relative", className)}
      >
        <Settings className="h-[1.2rem] w-[1.2rem]" strokeWidth={1.5} />
        <span className="sr-only">Accessibility settings</span>
      </Button>

      <AnimatePresence>
        {showAccessibilityMenu && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 top-full mt-2 w-64 bg-popover rounded-lg border border-border p-4 shadow-xl z-50"
            role="menu"
            aria-label="Accessibility options"
          >
            <div className="space-y-3">
              {/* Theme Toggle */}
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Theme</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleTheme}
                  aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
                >
                  <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                </Button>
              </div>

              {/* High Contrast */}
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium flex items-center gap-2">
                  <Contrast className="h-4 w-4" />
                  High Contrast
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleHighContrast}
                  aria-label={`${highContrast ? 'Disable' : 'Enable'} high contrast mode`}
                  aria-pressed={highContrast}
                  className={cn(
                    highContrast && "bg-accent text-accent-foreground"
                  )}
                >
                  {highContrast ? 'On' : 'Off'}
                </Button>
              </div>

              {/* Large Text */}
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium flex items-center gap-2">
                  <Type className="h-4 w-4" />
                  Large Text
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleLargeText}
                  aria-label={`${largeText ? 'Disable' : 'Enable'} large text mode`}
                  aria-pressed={largeText}
                  className={cn(
                    largeText && "bg-accent text-accent-foreground"
                  )}
                >
                  {largeText ? 'On' : 'Off'}
                </Button>
              </div>

              {/* Reduced Motion */}
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  Reduced Motion
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleReducedMotion}
                  aria-label={`${reducedMotion ? 'Disable' : 'Enable'} reduced motion`}
                  aria-pressed={reducedMotion}
                  className={cn(
                    reducedMotion && "bg-accent text-accent-foreground"
                  )}
                >
                  {reducedMotion ? 'On' : 'Off'}
                </Button>
              </div>
            </div>

            {/* Keyboard shortcuts info */}
            <div className="mt-4 pt-3 border-t border-border">
              <p className="text-xs text-muted-foreground">
                <strong>Keyboard:</strong> Tab to navigate, Enter to activate
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay to close menu */}
      {showAccessibilityMenu && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowAccessibilityMenu(false)}
          aria-hidden="true"
        />
      )}
    </div>
  )
}

    