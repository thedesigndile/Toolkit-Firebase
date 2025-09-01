# Comprehensive Loading States & Skeleton Screens

## **Skeleton Screen System**

### **Hero Section Skeleton**
```tsx
const HeroSectionSkeleton = () => {
  return (
    <section className="relative py-20 lg:py-28">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header Skeleton */}
        <div className="text-center mb-16">
          <div className="space-y-4">
            <Skeleton className="h-16 w-96 mx-auto bg-gradient-to-r from-slate-200 to-slate-300 animate-pulse" />
            <Skeleton className="h-6 w-80 mx-auto" />
            <Skeleton className="h-6 w-72 mx-auto" />
          </div>
        </div>
        
        {/* Hero Cards Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-8">
          {[...Array(4)].map((_, index) => (
            <HeroCardSkeleton key={index} delay={index * 100} />
          ))}
        </div>
        
        {/* Trust Indicators Skeleton */}
        <div className="flex items-center justify-center space-x-8 mt-12">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center space-x-2">
              <Skeleton className="w-4 h-4 rounded-full" />
              <Skeleton className="h-4 w-20" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const HeroCardSkeleton = ({ delay = 0 }: { delay?: number }) => {
  return (
    <div 
      className="min-h-[240px] rounded-3xl bg-gradient-to-br from-slate-200 to-slate-300 animate-pulse shadow-lg"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="p-8 h-full flex flex-col justify-between">
        {/* Top section */}
        <div className="flex items-start justify-between">
          <Skeleton className="w-16 h-16 rounded-2xl bg-white/50" />
          <Skeleton className="w-16 h-6 rounded-full bg-white/50" />
        </div>
        
        {/* Middle section */}
        <div className="flex-1 flex flex-col justify-center space-y-3">
          <Skeleton className="h-8 w-32 bg-white/50" />
          <Skeleton className="h-5 w-full bg-white/50" />
          <Skeleton className="h-5 w-3/4 bg-white/50" />
        </div>
        
        {/* Bottom section */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="flex -space-x-1">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="w-6 h-6 rounded-full bg-white/50" />
              ))}
            </div>
            <Skeleton className="h-4 w-12 bg-white/50" />
          </div>
          <Skeleton className="w-8 h-8 rounded-full bg-white/50" />
        </div>
      </div>
    </div>
  );
};
```

### **Category Card Skeleton**
```tsx
const CategoryCardSkeleton = ({ delay = 0 }: { delay?: number }) => {
  return (
    <div 
      className="rounded-2xl border border-slate-200 bg-white/70 backdrop-blur-sm shadow-sm animate-pulse"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Header */}
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* Icon skeleton */}
            <Skeleton className="w-12 h-12 rounded-xl" />
            
            {/* Title and description */}
            <div className="space-y-2">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-4 w-48" />
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Skeleton className="h-6 w-16 rounded-full" />
            <Skeleton className="w-8 h-8 rounded-full" />
          </div>
        </div>
      </div>
      
      {/* Expanded content skeleton (randomly show for some cards) */}
      {Math.random() > 0.5 && (
        <div className="px-6 pb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 pt-4 border-t border-slate-200">
            {[...Array(6)].map((_, index) => (
              <ToolCardSkeleton key={index} delay={index * 50} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
```

### **Tool Card Skeleton**
```tsx
const ToolCardSkeleton = ({ delay = 0 }: { delay?: number }) => {
  return (
    <div 
      className="rounded-lg p-4 bg-white border border-slate-200 animate-pulse"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-center space-x-3">
        <Skeleton className="w-10 h-10 rounded-lg flex-shrink-0" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-3 w-3/4" />
        </div>
        <Skeleton className="w-4 h-4 flex-shrink-0" />
      </div>
    </div>
  );
};
```

## **Advanced Progress Indicators**

### **File Processing Progress**
```tsx
interface ProcessingProgressProps {
  fileName: string;
  progress: number; // 0-100
  stage: 'uploading' | 'processing' | 'optimizing' | 'finalizing' | 'complete';
  estimatedTime?: number; // seconds
  fileSize?: string;
}

const ProcessingProgress = ({ 
  fileName, 
  progress, 
  stage, 
  estimatedTime, 
  fileSize 
}: ProcessingProgressProps) => {
  const stageMessages = {
    uploading: "Uploading your file...",
    processing: "Processing your PDF...",
    optimizing: "Optimizing quality...",
    finalizing: "Finalizing your document...",
    complete: "Ready for download!"
  };
  
  const stageIcons = {
    uploading: Upload,
    processing: Cpu,
    optimizing: Zap,
    finalizing: CheckCircle2,
    complete: Download
  };
  
  const StageIcon = stageIcons[stage];
  
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-lg max-w-md mx-auto">
      {/* File Info Header */}
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
          <FileText className="w-6 h-6 text-red-600" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-slate-900 truncate">{fileName}</h4>
          {fileSize && (
            <p className="text-sm text-slate-500">{fileSize}</p>
          )}
        </div>
      </div>
      
      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-slate-700">
            {Math.round(progress)}% Complete
          </span>
          {estimatedTime && estimatedTime > 0 && (
            <span className="text-sm text-slate-500">
              ~{estimatedTime}s remaining
            </span>
          )}
        </div>
        
        {/* Animated Progress Bar */}
        <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full relative overflow-hidden"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
          </motion.div>
        </div>
      </div>
      
      {/* Current Stage */}
      <div className="flex items-center space-x-3">
        <motion.div
          animate={{ rotate: stage === 'processing' ? 360 : 0 }}
          transition={{ duration: 2, repeat: stage === 'processing' ? Infinity : 0, ease: "linear" }}
          className={`
            w-8 h-8 rounded-full flex items-center justify-center
            ${stage === 'complete' 
              ? 'bg-green-100 text-green-600' 
              : 'bg-blue-100 text-blue-600'
            }
          `}
        >
          <StageIcon className="w-4 h-4" />
        </motion.div>
        
        <div className="flex-1">
          <p className="text-sm font-medium text-slate-700">
            {stageMessages[stage]}
          </p>
          
          {/* Stage Progress Dots */}
          <div className="flex space-x-1 mt-2">
            {['uploading', 'processing', 'optimizing', 'finalizing', 'complete'].map((s, index) => {
              const isActive = Object.keys(stageMessages).indexOf(stage) >= index;
              const isCurrent = s === stage;
              
              return (
                <motion.div
                  key={s}
                  className={`
                    w-2 h-2 rounded-full
                    ${isActive 
                      ? isCurrent 
                        ? 'bg-blue-500' 
                        : 'bg-green-500'
                      : 'bg-slate-300'
                    }
                  `}
                  animate={{ 
                    scale: isCurrent ? [1, 1.2, 1] : 1,
                    opacity: isCurrent ? [0.7, 1, 0.7] : isActive ? 1 : 0.5
                  }}
                  transition={{ 
                    duration: isCurrent ? 1.5 : 0,
                    repeat: isCurrent ? Infinity : 0
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
```

### **Circular Progress Indicator**
```tsx
interface CircularProgressProps {
  progress: number; // 0-100
  size?: 'sm' | 'md' | 'lg';
  showPercentage?: boolean;
  color?: 'blue' | 'green' | 'red' | 'purple';
  strokeWidth?: number;
}

const CircularProgress = ({ 
  progress, 
  size = 'md', 
  showPercentage = true, 
  color = 'blue',
  strokeWidth = 4
}: CircularProgressProps) => {
  const sizes = {
    sm: { width: 32, height: 32, fontSize: 'text-xs' },
    md: { width: 48, height: 48, fontSize: 'text-sm' },
    lg: { width: 64, height: 64, fontSize: 'text-base' }
  };
  
  const colors = {
    blue: { stroke: '#3b82f6', bg: '#dbeafe' },
    green: { stroke: '#10b981', bg: '#dcfce7' },
    red: { stroke: '#ef4444', bg: '#fef2f2' },
    purple: { stroke: '#8b5cf6', bg: '#f3e8ff' }
  };
  
  const { width, height, fontSize } = sizes[size];
  const radius = (width - strokeWidth * 2) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (progress / 100) * circumference;
  
  return (
    <div className="relative inline-flex items-center justify-center">
      <svg
        width={width}
        height={height}
        className="transform -rotate-90"
      >
        {/* Background circle */}
        <circle
          cx={width / 2}
          cy={height / 2}
          r={radius}
          fill="transparent"
          stroke={colors[color].bg}
          strokeWidth={strokeWidth}
        />
        
        {/* Progress circle */}
        <motion.circle
          cx={width / 2}
          cy={height / 2}
          r={radius}
          fill="transparent"
          stroke={colors[color].stroke}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={strokeDasharray}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1, ease: "easeInOut" }}
        />
      </svg>
      
      {/* Percentage Text */}
      {showPercentage && (
        <motion.div
          className={`absolute inset-0 flex items-center justify-center ${fontSize} font-semibold text-slate-700`}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.3 }}
        >
          {Math.round(progress)}%
        </motion.div>
      )}
    </div>
  );
};
```

## **Context-Specific Loading States**

### **Search Results Loading**
```tsx
const SearchResultsSkeleton = ({ query }: { query: string }) => {
  return (
    <div className="space-y-6">
      {/* Search header */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Skeleton className="h-6 w-48" />
          <div className="flex items-center space-x-2">
            <Skeleton className="w-4 h-4 rounded-full" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>
        <Skeleton className="w-24 h-8 rounded-md" />
      </div>
      
      {/* Results grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(9)].map((_, index) => (
          <SearchResultCardSkeleton key={index} delay={index * 50} />
        ))}
      </div>
    </div>
  );
};

const SearchResultCardSkeleton = ({ delay }: { delay: number }) => {
  return (
    <div 
      className="p-4 bg-white border border-slate-200 rounded-lg animate-pulse"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-start space-x-3">
        <Skeleton className="w-12 h-12 rounded-lg flex-shrink-0" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <div className="flex items-center space-x-2 mt-3">
            <Skeleton className="w-16 h-5 rounded-full" />
            <Skeleton className="w-1 h-1 rounded-full" />
            <Skeleton className="w-20 h-4" />
          </div>
        </div>
      </div>
    </div>
  );
};
```

### **Upload Zone Loading**
```tsx
const UploadZoneLoading = ({ filesCount }: { filesCount: number }) => {
  return (
    <div className="border-2 border-dashed border-blue-300 rounded-xl p-8 bg-blue-50/50">
      <div className="text-center space-y-4">
        {/* Animated Upload Icon */}
        <motion.div
          animate={{ y: [-2, 2, -2] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center"
        >
          <Upload className="w-8 h-8 text-blue-600" />
        </motion.div>
        
        {/* Loading Message */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-slate-900">
            Processing {filesCount} {filesCount === 1 ? 'file' : 'files'}...
          </h3>
          <p className="text-slate-600">
            Please wait while we prepare your documents
          </p>
        </div>
        
        {/* Animated Progress Dots */}
        <div className="flex justify-center space-x-1">
          {[...Array(3)].map((_, index) => (
            <motion.div
              key={index}
              className="w-2 h-2 bg-blue-500 rounded-full"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: index * 0.2
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
```

## **Lazy Loading Components**

### **Intersection Observer Hook**
```tsx
const useIntersectionObserver = (threshold = 0.1) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasBeenVisible, setHasBeenVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
        if (entry.isIntersecting && !hasBeenVisible) {
          setHasBeenVisible(true);
        }
      },
      { threshold }
    );
    
    if (ref.current) {
      observer.observe(ref.current);
    }
    
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold, hasBeenVisible]);
  
  return { ref, isVisible, hasBeenVisible };
};
```

### **Lazy Loaded Category Section**
```tsx
const LazyLoadedCategorySection = ({ category, tools }: CategorySectionProps) => {
  const { ref, hasBeenVisible } = useIntersectionObserver(0.1);
  
  return (
    <div ref={ref} className="min-h-[200px]">
      {hasBeenVisible ? (
        <CategorySection category={category} tools={tools} />
      ) : (
        <CategoryCardSkeleton />
      )}
    </div>
  );
};
```

## **Performance Optimized Animations**

### **Skeleton Animation Styles**
```css
/* Optimized skeleton animation */
@keyframes shimmer {
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
}

.skeleton {
  background: linear-gradient(
    90deg,
    #f0f0f0 25%,
    #e0e0e0 37%,
    #f0f0f0 63%
  );
  background-size: 400px 100%;
  animation: shimmer 1.5s ease-in-out infinite;
  will-change: background-position;
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .skeleton {
    animation: none;
    background: #f0f0f0;
  }
}

/* Hardware acceleration */
.hardware-accelerated-skeleton {
  transform: translateZ(0);
  backface-visibility: hidden;
  perspective: 1000px;
}
```

### **Base Skeleton Component**
```tsx
interface SkeletonProps {
  className?: string;
  width?: string;
  height?: string;
  variant?: 'rectangular' | 'circular' | 'text';
  animation?: 'pulse' | 'wave' | 'none';
}

const Skeleton = ({ 
  className = '', 
  width, 
  height, 
  variant = 'rectangular',
  animation = 'wave'
}: SkeletonProps) => {
  const baseClasses = `
    ${animation === 'wave' ? 'skeleton' : ''}
    ${animation === 'pulse' ? 'animate-pulse' : ''}
    ${variant === 'circular' ? 'rounded-full' : ''}
    ${variant === 'text' ? 'rounded' : variant === 'rectangular' ? 'rounded-md' : ''}
  `;
  
  return (
    <div
      className={`${baseClasses} bg-slate-200 ${className}`}
      style={{
        width: width || (variant === 'text' ? '100%' : undefined),
        height: height || (variant === 'text' ? '1em' : undefined)
      }}
    />
  );
};
```

This loading system provides:
- **Contextual skeleton screens** matching actual content structure
- **Smooth progress indicators** with stage-based feedback
- **Performance optimized animations** using CSS transforms and GPU acceleration
- **Accessibility compliance** with reduced motion support
- **Lazy loading integration** with Intersection Observer API
- **Realistic loading times** with estimated completion indicators
- **Visual hierarchy preservation** during loading states