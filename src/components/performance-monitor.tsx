"use client";

import { useEffect, useState } from 'react';
import { useAccessibility } from './accessibility-provider';

interface PerformanceMetrics {
  fcp: number | null;
  lcp: number | null;
  cls: number | null;
  fid: number | null;
  ttfb: number | null;
}

export function PerformanceMonitor() {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fcp: null,
    lcp: null,
    cls: null,
    fid: null,
    ttfb: null,
  });
  const { announceToScreenReader } = useAccessibility();

  useEffect(() => {
    // Only run in browser environment
    if (typeof window === 'undefined') return;

    let fcpObserver: PerformanceObserver | null = null;
    let lcpObserver: PerformanceObserver | null = null;
    let clsObserver: PerformanceObserver | null = null;
    let fidObserver: PerformanceObserver | null = null;

    // First Contentful Paint
    try {
      fcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1] as PerformancePaintTiming;
        setMetrics(prev => ({ ...prev, fcp: lastEntry.startTime }));
      });
      fcpObserver.observe({ entryTypes: ['paint'] });
    } catch {
      console.warn('FCP observation not supported');
    }

    // Largest Contentful Paint
    try {
      lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1] as PerformanceEntry;
        setMetrics(prev => ({ ...prev, lcp: lastEntry.startTime }));
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
    } catch {
      console.warn('LCP observation not supported');
    }

    // Cumulative Layout Shift
    try {
      clsObserver = new PerformanceObserver((list) => {
        let clsValue = 0;
        const entries = list.getEntries() as any[];

        entries.forEach((entry) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        });

        setMetrics(prev => ({ ...prev, cls: clsValue }));
      });
      clsObserver.observe({ entryTypes: ['layout-shift'] });
    } catch {
      console.warn('CLS observation not supported');
    }

    // First Input Delay
    try {
      fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries() as any[];
        entries.forEach((entry) => {
          setMetrics(prev => ({ ...prev, fid: entry.processingStart - entry.startTime }));
        });
      });
      fidObserver.observe({ entryTypes: ['first-input'] });
    } catch {
      console.warn('FID observation not supported');
    }

    // Time to First Byte
    const navigationEntries = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];
    if (navigationEntries.length > 0) {
      const navEntry = navigationEntries[0];
      const ttfb = navEntry.responseStart - navEntry.requestStart;
      setMetrics(prev => ({ ...prev, ttfb }));
    }

    // Cleanup
    return () => {
      if (fcpObserver) fcpObserver.disconnect();
      if (lcpObserver) lcpObserver.disconnect();
      if (clsObserver) clsObserver.disconnect();
      if (fidObserver) fidObserver.disconnect();
    };
  }, []);

  // Performance warnings for accessibility
  useEffect(() => {
    if (metrics.lcp && metrics.lcp > 2500) {
      announceToScreenReader('Performance warning: Page is loading slowly', 'polite');
    }
    if (metrics.cls && metrics.cls > 0.1) {
      announceToScreenReader('Layout shift detected, page content may be unstable', 'polite');
    }
  }, [metrics, announceToScreenReader]);

  // Development mode performance logging
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log('Performance Metrics:', metrics);
    }
  }, [metrics]);

  return null; // This component doesn't render anything visible
}

// Performance optimization hook
export function usePerformanceOptimization() {
  useEffect(() => {
    // Preload critical resources
    const preloadResources = () => {
      // Preload critical fonts
      const fontLink = document.createElement('link');
      fontLink.rel = 'preload';
      fontLink.href = '/fonts/inter-var.woff2';
      fontLink.as = 'font';
      fontLink.type = 'font/woff2';
      fontLink.crossOrigin = 'anonymous';
      document.head.appendChild(fontLink);

      // Preload critical CSS
      const cssLink = document.createElement('link');
      cssLink.rel = 'preload';
      cssLink.href = '/globals.css';
      cssLink.as = 'style';
      document.head.appendChild(cssLink);
    };

    // Implement resource hints
    const addResourceHints = () => {
      const hints = [
        { rel: 'dns-prefetch', href: '//fonts.googleapis.com' },
        { rel: 'dns-prefetch', href: '//fonts.gstatic.com' },
        { rel: 'preconnect', href: '//fonts.googleapis.com', crossorigin: '' },
        { rel: 'preconnect', href: '//fonts.gstatic.com', crossorigin: '' },
      ];

      hints.forEach(hint => {
        const link = document.createElement('link');
        link.rel = hint.rel;
        link.href = hint.href;
        if (hint.crossorigin) link.crossOrigin = hint.crossorigin;
        document.head.appendChild(link);
      });
    };

    preloadResources();
    addResourceHints();
  }, []);
}

// Lazy loading wrapper component
import { Suspense } from 'react';

const LoadingFallback = () => (
  <div className="flex items-center justify-center p-8">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
    <span className="sr-only">Loading...</span>
  </div>
);

export function LazyWrapper({ children, fallback = <LoadingFallback /> }: {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}) {
  return (
    <Suspense fallback={fallback}>
      {children}
    </Suspense>
  );
}

// Optimized image component with lazy loading
import Image from 'next/image';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  placeholder = 'empty',
  blurDataURL,
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={`bg-muted flex items-center justify-center ${className}`}
        style={{ width, height }}
        role="img"
        aria-label={`Failed to load image: ${alt}`}
      >
        <span className="text-muted-foreground text-sm">Image unavailable</span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        placeholder={placeholder}
        blurDataURL={blurDataURL}
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className={`transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
      {!isLoaded && (
        <div
          className="absolute inset-0 bg-muted animate-pulse"
          aria-hidden="true"
        />
      )}
    </div>
  );
}