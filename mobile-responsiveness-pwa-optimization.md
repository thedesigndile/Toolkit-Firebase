# Mobile Responsiveness & Progressive Web App Optimization

## **Complete Mobile Responsiveness Strategy**

### **Responsive Breakpoint System**
```css
/* Mobile-first responsive breakpoints */
:root {
  /* Breakpoints */
  --breakpoint-xs: 375px;   /* Small phones */
  --breakpoint-sm: 640px;   /* Large phones */
  --breakpoint-md: 768px;   /* Tablets */
  --breakpoint-lg: 1024px;  /* Small laptops */
  --breakpoint-xl: 1280px;  /* Desktops */
  --breakpoint-2xl: 1536px; /* Large desktops */
  
  /* Touch targets */
  --touch-target-min: 44px; /* Minimum touch target size */
  --touch-spacing: 8px;     /* Minimum spacing between touch targets */
  
  /* Safe areas */
  --safe-area-inset-top: env(safe-area-inset-top);
  --safe-area-inset-right: env(safe-area-inset-right);
  --safe-area-inset-bottom: env(safe-area-inset-bottom);
  --safe-area-inset-left: env(safe-area-inset-left);
}

/* Responsive grid system */
.responsive-grid {
  display: grid;
  gap: 1rem;
  
  /* Mobile first: 1 column */
  grid-template-columns: 1fr;
  
  /* Small phones and up: 1 column */
  @media (min-width: 375px) {
    gap: 1rem;
  }
  
  /* Large phones and up: 2 columns for tools */
  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }
  
  /* Tablets and up: 3 columns */
  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
  }
  
  /* Large screens and up: 4 columns */
  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }
}

/* Hero section responsive adjustments */
.hero-cards {
  /* Mobile: stacked cards */
  display: flex;
  flex-direction: column;
  gap: 1rem;
  
  @media (min-width: 640px) {
    /* Large phones: 2x2 grid */
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
  
  @media (min-width: 1024px) {
    /* Desktop: horizontal row */
    grid-template-columns: repeat(4, 1fr);
    gap: 2rem;
  }
}
```

### **Touch-Optimized Component Design**
```tsx
interface TouchOptimizedButtonProps {
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'touch';
  variant?: 'primary' | 'secondary' | 'ghost';
  onTouch?: () => void;
  className?: string;
}

const TouchOptimizedButton = ({ 
  children, 
  size = 'touch', 
  variant = 'primary',
  onTouch,
  className,
  ...props 
}: TouchOptimizedButtonProps) => {
  const [isTouched, setIsTouched] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  
  const sizeClasses = {
    sm: 'px-3 py-2 text-sm min-h-[36px]',
    md: 'px-4 py-2 text-base min-h-[40px]',
    lg: 'px-6 py-3 text-lg min-h-[48px]',
    touch: 'px-6 py-4 text-base min-h-[44px]' // WCAG compliant touch target
  };
  
  const handleTouchStart = () => {
    setIsTouched(true);
    setIsPressed(true);
    onTouch?.();
  };
  
  const handleTouchEnd = () => {
    setIsPressed(false);
    // Keep touched state for visual feedback
    setTimeout(() => setIsTouched(false), 150);
  };
  
  return (
    <motion.button
      className={`
        relative overflow-hidden rounded-lg font-medium transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
        disabled:opacity-50 disabled:cursor-not-allowed
        ${sizeClasses[size]}
        ${variant === 'primary' 
          ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md active:shadow-lg' 
          : variant === 'secondary'
          ? 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 shadow-sm'
          : 'bg-transparent hover:bg-slate-100 text-slate-600'
        }
        ${isTouched ? 'bg-opacity-90' : ''}
        ${className}
      `}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      whileTap={{ scale: 0.98 }}
      animate={{ 
        scale: isPressed ? 0.98 : 1,
        backgroundColor: isTouched ? 'rgba(0,0,0,0.1)' : undefined
      }}
      transition={{ duration: 0.1 }}
      {...props}
    >
      {/* Ripple effect for touch feedback */}
      <AnimatePresence>
        {isPressed && (
          <motion.div
            className="absolute inset-0 bg-white opacity-30 rounded-lg"
            initial={{ scale: 0, opacity: 0.6 }}
            animate={{ scale: 1.5, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </AnimatePresence>
      
      {children}
    </motion.button>
  );
};
```

### **Mobile Navigation & Safe Areas**
```tsx
const MobileAwareLayout = ({ children }: { children: React.ReactNode }) => {
  const [safeAreaInsets, setSafeAreaInsets] = useState({
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  });
  
  useEffect(() => {
    // Detect safe area insets
    const updateSafeAreas = () => {
      const computedStyle = getComputedStyle(document.documentElement);
      setSafeAreaInsets({
        top: parseInt(computedStyle.getPropertyValue('--safe-area-inset-top') || '0'),
        right: parseInt(computedStyle.getPropertyValue('--safe-area-inset-right') || '0'),
        bottom: parseInt(computedStyle.getPropertyValue('--safe-area-inset-bottom') || '0'),
        left: parseInt(computedStyle.getPropertyValue('--safe-area-inset-left') || '0')
      });
    };
    
    updateSafeAreas();
    window.addEventListener('orientationchange', updateSafeAreas);
    window.addEventListener('resize', updateSafeAreas);
    
    return () => {
      window.removeEventListener('orientationchange', updateSafeAreas);
      window.removeEventListener('resize', updateSafeAreas);
    };
  }, []);
  
  return (
    <div 
      className="min-h-screen bg-background"
      style={{
        paddingTop: `max(1rem, ${safeAreaInsets.top}px)`,
        paddingRight: `max(1rem, ${safeAreaInsets.right}px)`,
        paddingBottom: `max(1rem, ${safeAreaInsets.bottom}px)`,
        paddingLeft: `max(1rem, ${safeAreaInsets.left}px)`
      }}
    >
      {children}
    </div>
  );
};
```

### **Touch Gesture Support**
```tsx
const SwipeableCard = ({ children, onSwipeLeft, onSwipeRight }: SwipeableCardProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const dragX = useMotionValue(0);
  const dragOpacity = useTransform(dragX, [-100, 0, 100], [0.5, 1, 0.5]);
  
  const handleDragEnd = (_: any, info: any) => {
    setIsDragging(false);
    
    const swipeThreshold = 100;
    const swipeVelocityThreshold = 500;
    
    if (info.offset.x > swipeThreshold || info.velocity.x > swipeVelocityThreshold) {
      onSwipeRight?.();
    } else if (info.offset.x < -swipeThreshold || info.velocity.x < -swipeVelocityThreshold) {
      onSwipeLeft?.();
    }
  };
  
  return (
    <motion.div
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.2}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={handleDragEnd}
      style={{ 
        x: dragX, 
        opacity: dragOpacity,
        cursor: isDragging ? 'grabbing' : 'grab'
      }}
      className="select-none"
    >
      {children}
      
      {/* Swipe indicators */}
      <AnimatePresence>
        {isDragging && (
          <>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-green-500"
            >
              <ChevronRight className="w-6 h-6" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-red-500"
            >
              <ChevronLeft className="w-6 h-6" />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
```

## **Progressive Web App Implementation**

### **Service Worker Strategy**
```typescript
// sw.ts - Service Worker
const CACHE_NAME = 'pdf-tools-v1';
const STATIC_CACHE = `${CACHE_NAME}-static`;
const DYNAMIC_CACHE = `${CACHE_NAME}-dynamic`;
const API_CACHE = `${CACHE_NAME}-api`;

// Cache strategies
const CACHE_STRATEGIES = {
  CACHE_FIRST: 'cache-first',
  NETWORK_FIRST: 'network-first',
  STALE_WHILE_REVALIDATE: 'stale-while-revalidate',
  NETWORK_ONLY: 'network-only',
  CACHE_ONLY: 'cache-only'
};

// Static assets to cache immediately
const STATIC_ASSETS = [
  '/',
  '/manifest.json',
  '/offline.html',
  '/static/css/main.css',
  '/static/js/main.js',
  '/static/images/icons/',
  '/static/fonts/'
];

// API endpoints cache configuration
const API_CACHE_CONFIG = {
  '/api/tools': { strategy: CACHE_STRATEGIES.STALE_WHILE_REVALIDATE, maxAge: 300000 }, // 5 min
  '/api/user': { strategy: CACHE_STRATEGIES.NETWORK_FIRST, maxAge: 60000 }, // 1 min
  '/api/process': { strategy: CACHE_STRATEGIES.NETWORK_ONLY } // Always fresh
};

self.addEventListener('install', (event: ExtendableEvent) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then(cache => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
});

self.addEventListener('activate', (event: ExtendableEvent) => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(cacheName => cacheName.startsWith('pdf-tools-') && cacheName !== CACHE_NAME)
          .map(cacheName => caches.delete(cacheName))
      );
    })
  );
});

self.addEventListener('fetch', (event: FetchEvent) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Handle API requests
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(handleApiRequest(request));
    return;
  }
  
  // Handle static assets
  if (request.destination === 'document' || request.destination === '') {
    event.respondWith(handleNavigationRequest(request));
    return;
  }
  
  // Handle other resources
  event.respondWith(handleResourceRequest(request));
});

async function handleApiRequest(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const config = API_CACHE_CONFIG[url.pathname];
  
  if (!config || config.strategy === CACHE_STRATEGIES.NETWORK_ONLY) {
    return fetch(request);
  }
  
  const cache = await caches.open(API_CACHE);
  
  switch (config.strategy) {
    case CACHE_STRATEGIES.CACHE_FIRST:
      return cacheFirst(request, cache);
    case CACHE_STRATEGIES.NETWORK_FIRST:
      return networkFirst(request, cache);
    case CACHE_STRATEGIES.STALE_WHILE_REVALIDATE:
      return staleWhileRevalidate(request, cache);
    default:
      return fetch(request);
  }
}

async function handleNavigationRequest(request: Request): Promise<Response> {
  try {
    return await fetch(request);
  } catch {
    const cache = await caches.open(STATIC_CACHE);
    return cache.match('/offline.html') || new Response('Offline');
  }
}

// Background sync for file processing
self.addEventListener('sync', (event: SyncEvent) => {
  if (event.tag === 'background-process') {
    event.waitUntil(processQueuedFiles());
  }
});

async function processQueuedFiles() {
  const db = await openDB('pdf-tools-queue');
  const tx = db.transaction('files', 'readwrite');
  const files = await tx.store.getAll();
  
  for (const file of files) {
    try {
      await processFile(file);
      await tx.store.delete(file.id);
    } catch (error) {
      console.error('Background processing failed:', error);
    }
  }
}
```

### **App Manifest & Installation**
```json
// public/manifest.json
{
  "name": "PDF Tools Pro",
  "short_name": "PDFTools",
  "description": "Professional PDF editing and conversion tools",
  "start_url": "/",
  "display": "standalone",
  "orientation": "portrait-primary",
  "theme_color": "#2563eb",
  "background_color": "#ffffff",
  "categories": ["productivity", "utilities", "business"],
  "lang": "en",
  "dir": "ltr",
  "icons": [
    {
      "src": "/icons/icon-72x72.png",
      "sizes": "72x72",
      "type": "image/png",
      "purpose": "maskable"
    },
    {
      "src": "/icons/icon-96x96.png", 
      "sizes": "96x96",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-128x128.png",
      "sizes": "128x128", 
      "type": "image/png"
    },
    {
      "src": "/icons/icon-144x144.png",
      "sizes": "144x144",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-152x152.png",
      "sizes": "152x152",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-384x384.png",
      "sizes": "384x384",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ],
  "shortcuts": [
    {
      "name": "Merge PDF",
      "short_name": "Merge",
      "description": "Quickly merge PDF files",
      "url": "/tools/merge-pdf",
      "icons": [
        {
          "src": "/icons/merge-96x96.png",
          "sizes": "96x96"
        }
      ]
    },
    {
      "name": "Convert to Word",
      "short_name": "Convert",
      "description": "Convert PDF to Word document",
      "url": "/tools/pdf-to-word",
      "icons": [
        {
          "src": "/icons/convert-96x96.png", 
          "sizes": "96x96"
        }
      ]
    }
  ],
  "screenshots": [
    {
      "src": "/screenshots/desktop-1.png",
      "sizes": "1280x720",
      "type": "image/png",
      "form_factor": "wide"
    },
    {
      "src": "/screenshots/mobile-1.png",
      "sizes": "375x667", 
      "type": "image/png",
      "form_factor": "narrow"
    }
  ]
}
```

### **Installation Prompt Component**
```tsx
const PWAInstallPrompt = () => {
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  
  useEffect(() => {
    // Listen for install prompt
    const handleBeforeInstallPrompt = (e: BeforeInstallPromptEvent) => {
      e.preventDefault();
      setInstallPrompt(e);
      setIsInstallable(true);
      
      // Show prompt after user has interacted with the app
      setTimeout(() => setShowPrompt(true), 30000); // 30 seconds
    };
    
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setIsInstallable(false);
      setShowPrompt(false);
    };
    
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);
    
    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }
    
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);
  
  const handleInstall = async () => {
    if (!installPrompt) return;
    
    const result = await installPrompt.prompt();
    console.log('Install prompt result:', result);
    
    setInstallPrompt(null);
    setShowPrompt(false);
  };
  
  const handleDismiss = () => {
    setShowPrompt(false);
    // Don't show again for this session
    sessionStorage.setItem('install-prompt-dismissed', 'true');
  };
  
  // Don't show if already installed or dismissed
  if (isInstalled || !isInstallable || !showPrompt) return null;
  
  // Don't show if dismissed in this session
  if (sessionStorage.getItem('install-prompt-dismissed')) return null;
  
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        className="fixed bottom-4 left-4 right-4 z-50 max-w-sm mx-auto md:left-auto md:right-4 md:max-w-xs"
      >
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-lg backdrop-blur-sm">
          <div className="flex items-start space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Download className="w-5 h-5 text-blue-600" />
            </div>
            
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-slate-900 text-sm">
                Install PDF Tools
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                Get quick access and work offline
              </p>
            </div>
            
            <button
              onClick={handleDismiss}
              className="text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          
          <div className="flex space-x-2 mt-3">
            <TouchOptimizedButton
              size="sm"
              onClick={handleInstall}
              className="flex-1"
            >
              Install
            </TouchOptimizedButton>
            <TouchOptimizedButton
              size="sm"
              variant="ghost"
              onClick={handleDismiss}
              className="flex-1"
            >
              Later
            </TouchOptimizedButton>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
```

## **Performance Optimization Strategies**

### **Code Splitting & Lazy Loading**
```typescript
// Route-based code splitting
const ToolPage = lazy(() => import('./pages/ToolPage'));
const CategoryPage = lazy(() => import('./pages/CategoryPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));

// Component-based code splitting
const HeavyPDFProcessor = lazy(() => import('./components/HeavyPDFProcessor'));

// Dynamic imports for tools
const loadTool = async (toolName: string) => {
  const toolModule = await import(`./tools/${toolName}.tsx`);
  return toolModule.default;
};

// Preload critical routes
const preloadRoutes = () => {
  // Preload most common tools
  const commonTools = ['merge-pdf', 'pdf-to-word', 'compress-pdf'];
  commonTools.forEach(tool => {
    import(`./tools/${tool}.tsx`);
  });
};

// Image optimization with lazy loading
const OptimizedImage = ({ src, alt, className, ...props }: OptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    
    if (imgRef.current) observer.observe(imgRef.current);
    return () => observer.disconnect();
  }, []);
  
  return (
    <div ref={imgRef} className={className}>
      {isInView && (
        <img
          src={src}
          alt={alt}
          onLoad={() => setIsLoaded(true)}
          className={`transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          {...props}
        />
      )}
      {!isLoaded && isInView && (
        <div className="animate-pulse bg-slate-200 w-full h-full rounded" />
      )}
    </div>
  );
};
```

### **Memory & Bundle Optimization**
```typescript
// Bundle analysis and optimization
const BundleAnalyzer = () => {
  useEffect(() => {
    // Monitor bundle size and performance
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach(entry => {
        if (entry.entryType === 'navigation') {
          console.log('Page load time:', entry.duration);
        }
      });
    });
    observer.observe({ entryTypes: ['navigation'] });
    
    return () => observer.disconnect();
  }, []);
};

// Memory management for large files
const useFileProcessor = () => {
  const processFile = useCallback(async (file: File) => {
    // Process file in web worker to avoid blocking main thread
    const worker = new Worker('/workers/pdf-processor.js');
    
    return new Promise((resolve, reject) => {
      worker.postMessage({ file });
      
      worker.onmessage = (e) => {
        worker.terminate(); // Clean up worker
        resolve(e.data);
      };
      
      worker.onerror = (error) => {
        worker.terminate();
        reject(error);
      };
    });
  }, []);
  
  return { processFile };
};

// Virtual scrolling for large lists
const VirtualizedToolList = ({ tools }: { tools: Tool[] }) => {
  const ITEM_HEIGHT = 80;
  const CONTAINER_HEIGHT = 400;
  const VISIBLE_ITEMS = Math.ceil(CONTAINER_HEIGHT / ITEM_HEIGHT) + 2;
  
  const [scrollTop, setScrollTop] = useState(0);
  const startIndex = Math.floor(scrollTop / ITEM_HEIGHT);
  const endIndex = Math.min(startIndex + VISIBLE_ITEMS, tools.length);
  
  const visibleItems = tools.slice(startIndex, endIndex);
  
  return (
    <div
      className="relative overflow-auto"
      style={{ height: CONTAINER_HEIGHT }}
      onScroll={(e) => setScrollTop(e.currentTarget.scrollTop)}
    >
      <div style={{ height: tools.length * ITEM_HEIGHT }}>
        <div style={{ transform: `translateY(${startIndex * ITEM_HEIGHT}px)` }}>
          {visibleItems.map((tool, index) => (
            <ToolListItem key={tool.id} tool={tool} style={{ height: ITEM_HEIGHT }} />
          ))}
        </div>
      </div>
    </div>
  );
};
```

### **Caching & Storage Strategies**
```typescript
// Intelligent caching system
class CacheManager {
  private static instance: CacheManager;
  private memoryCache = new Map();
  private readonly MAX_MEMORY_SIZE = 50 * 1024 * 1024; // 50MB
  
  static getInstance() {
    if (!this.instance) {
      this.instance = new CacheManager();
    }
    return this.instance;
  }
  
  async get(key: string): Promise<any> {
    // Check memory cache first
    if (this.memoryCache.has(key)) {
      return this.memoryCache.get(key);
    }
    
    // Check IndexedDB
    const dbValue = await this.getFromDB(key);
    if (dbValue) {
      // Add to memory cache if space available
      if (this.getMemorySize() < this.MAX_MEMORY_SIZE) {
        this.memoryCache.set(key, dbValue);
      }
      return dbValue;
    }
    
    return null;
  }
  
  async set(key: string, value: any, ttl?: number): Promise<void> {
    // Store in memory cache
    this.memoryCache.set(key, value);
    
    // Store in IndexedDB with TTL
    await this.setInDB(key, value, ttl);
    
    // Clean up if memory limit exceeded
    if (this.getMemorySize() > this.MAX_MEMORY_SIZE) {
      this.evictLRU();
    }
  }
  
  private getMemorySize(): number {
    return JSON.stringify([...this.memoryCache]).length;
  }
  
  private evictLRU(): void {
    // Remove oldest entries
    const entries = [...this.memoryCache.entries()];
    const toRemove = Math.ceil(entries.length * 0.25);
    
    for (let i = 0; i < toRemove; i++) {
      this.memoryCache.delete(entries[i][0]);
    }
  }
}

// Offline storage for user data
const useOfflineStorage = () => {
  const saveOffline = useCallback(async (key: string, data: any) => {
    try {
      const db = await openDB('pdf-tools-offline');
      await db.put('user-data', { key, data, timestamp: Date.now() });
    } catch (error) {
      console.error('Failed to save offline:', error);
    }
  }, []);
  
  const getOffline = useCallback(async (key: string) => {
    try {
      const db = await openDB('pdf-tools-offline');
      const result = await db.get('user-data', key);
      return result?.data;
    } catch (error) {
      console.error('Failed to get offline data:', error);
      return null;
    }
  }, []);
  
  return { saveOffline, getOffline };
};
```

This comprehensive mobile responsiveness and PWA optimization provides:

- **Complete mobile-first responsive design** with touch-optimized interactions
- **Safe area handling** for modern mobile devices with notches
- **Touch gesture support** with swipe interactions and proper feedback
- **Progressive Web App functionality** with offline support and installation
- **Advanced caching strategies** for optimal performance
- **Code splitting and lazy loading** to minimize bundle sizes  
- **Background sync** for processing files while offline
- **Memory management** and performance monitoring
- **Virtual scrolling** for handling large datasets
- **Installation prompts** and PWA best practices
- **Service worker** implementation with multiple caching strategies