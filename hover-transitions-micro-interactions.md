# Smooth Hover Transitions & Micro-Interactions

## **Elevation System with Smooth Transitions**

### **Shadow Elevation Levels**
```css
/* Elevation system inspired by Material Design but with modern aesthetics */
:root {
  /* Elevation Shadows */
  --shadow-xs: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-sm: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  --shadow-base: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  --shadow-md: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  --shadow-lg: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  --shadow-xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  --shadow-2xl: 0 35px 60px -12px rgba(0, 0, 0, 0.35);
  
  /* Colored Shadows for Brand Elements */
  --shadow-brand-sm: 0 4px 14px 0 rgba(37, 99, 235, 0.15);
  --shadow-brand-md: 0 10px 25px 0 rgba(37, 99, 235, 0.20);
  --shadow-brand-lg: 0 20px 40px 0 rgba(37, 99, 235, 0.25);
  
  /* Transition Timings */
  --transition-quick: 150ms;
  --transition-base: 200ms;
  --transition-medium: 300ms;
  --transition-slow: 500ms;
  
  /* Easing Functions */
  --ease-out-cubic: cubic-bezier(0.33, 1, 0.68, 1);
  --ease-in-out-cubic: cubic-bezier(0.65, 0, 0.35, 1);
  --ease-spring: cubic-bezier(0.68, -0.55, 0.265, 1.55);
  --ease-bounce: cubic-bezier(0.68, -0.6, 0.32, 1.6);
}
```

### **Universal Hover States**
```css
/* Base hover transition for all interactive elements */
.interactive-element {
  transition: all var(--transition-base) var(--ease-out-cubic);
  cursor: pointer;
}

.interactive-element:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.interactive-element:active {
  transform: translateY(-1px);
  transition-duration: var(--transition-quick);
}

/* Enhanced hover for primary actions */
.primary-interactive {
  transition: 
    transform var(--transition-base) var(--ease-out-cubic),
    box-shadow var(--transition-base) var(--ease-out-cubic),
    background-color var(--transition-base) var(--ease-out-cubic);
}

.primary-interactive:hover {
  transform: translateY(-4px) scale(1.02);
  box-shadow: var(--shadow-lg);
}
```

## **Category Card Hover Interactions**

### **Enhanced Category Card Component**
```tsx
interface CategoryCardProps {
  category: PDFCategory;
  tools: Tool[];
  isExpanded: boolean;
  onToggle: () => void;
}

const EnhancedCategoryCard = ({ category, tools, isExpanded, onToggle }: CategoryCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [focusWithin, setFocusWithin] = useState(false);
  
  return (
    <motion.div
      className={`
        group relative overflow-hidden rounded-2xl border border-slate-200
        bg-white/70 backdrop-blur-sm
        transition-all duration-300 ease-out
        hover:border-${category.color}-300 hover:bg-white
        focus-within:border-${category.color}-400 focus-within:ring-4 focus-within:ring-${category.color}-100
      `}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ 
        y: -4,
        transition: { duration: 0.2, ease: [0.33, 1, 0.68, 1] }
      }}
      style={{
        boxShadow: isHovered ? `0 20px 40px -10px ${category.shadowColor}` : 'var(--shadow-sm)'
      }}
    >
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className={`absolute top-0 right-0 w-32 h-32 bg-${category.color}-100 rounded-full -translate-y-16 translate-x-16 blur-2xl`} />
        <div className={`absolute bottom-0 left-0 w-24 h-24 bg-${category.color}-200 rounded-full translate-y-12 -translate-x-12 blur-xl`} />
      </div>
      
      {/* Header Section */}
      <div 
        className="relative z-10 p-6 cursor-pointer"
        onClick={onToggle}
        onFocus={() => setFocusWithin(true)}
        onBlur={() => setFocusWithin(false)}
        tabIndex={0}
        role="button"
        aria-expanded={isExpanded}
      >
        <div className="flex items-center justify-between">
          {/* Icon and Title */}
          <div className="flex items-center space-x-4">
            {/* Animated Icon Container */}
            <motion.div
              className={`
                relative p-3 rounded-xl bg-${category.color}-100 border border-${category.color}-200
                group-hover:bg-${category.color}-200 group-hover:border-${category.color}-300
                transition-colors duration-300
              `}
              whileHover={{ 
                scale: 1.1,
                rotate: 5,
                transition: { type: "spring", stiffness: 400, damping: 10 }
              }}
            >
              {/* Icon Glow Effect */}
              <div className={`absolute inset-0 bg-${category.color}-400 rounded-xl opacity-0 group-hover:opacity-20 blur-sm transition-opacity duration-300`} />
              
              <category.icon className={`w-6 h-6 text-${category.color}-600 relative z-10`} />
              
              {/* Floating indicator dots */}
              <div className="absolute -top-1 -right-1">
                <motion.div
                  className={`w-2 h-2 bg-${category.color}-500 rounded-full`}
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </div>
            </motion.div>
            
            <div>
              <h3 className={`text-lg font-semibold text-slate-900 group-hover:text-${category.color}-700 transition-colors`}>
                {category.name}
              </h3>
              <p className="text-sm text-slate-600 mt-1 group-hover:text-slate-700 transition-colors">
                {category.description}
              </p>
            </div>
          </div>
          
          {/* Expand/Collapse Button */}
          <div className="flex items-center space-x-3">
            {/* Tools Count Badge */}
            <motion.div
              className={`
                px-3 py-1 rounded-full text-xs font-medium
                bg-${category.color}-50 text-${category.color}-700 border border-${category.color}-200
                group-hover:bg-${category.color}-100 group-hover:border-${category.color}-300
                transition-colors duration-200
              `}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {tools.length} tools
            </motion.div>
            
            {/* Chevron Button */}
            <motion.div
              className={`
                p-2 rounded-full bg-slate-100 text-slate-600
                group-hover:bg-${category.color}-100 group-hover:text-${category.color}-600
                transition-colors duration-200
              `}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown className="w-4 h-4" />
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Collapsible Tools Section */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.33, 1, 0.68, 1] }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 pt-4 border-t border-slate-200">
                {tools.map((tool, index) => (
                  <EnhancedToolCard key={tool.id} tool={tool} index={index} />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
```

## **Enhanced Tool Card Micro-Interactions**

### **Individual Tool Card Component**
```tsx
const EnhancedToolCard = ({ tool, index }: { tool: Tool; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      whileHover={{ 
        y: -2,
        transition: { duration: 0.2 }
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative"
    >
      <Link
        href={`/tools/${tool.slug}`}
        className={`
          block relative overflow-hidden rounded-lg p-4
          bg-white border border-slate-200
          hover:border-slate-300 hover:shadow-md
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
          transition-all duration-200 ease-out
        `}
      >
        {/* Hover Background Gradient */}
        <div className={`
          absolute inset-0 opacity-0 group-hover:opacity-100
          bg-gradient-to-br from-${tool.category.color}-50 to-transparent
          transition-opacity duration-300
        `} />
        
        {/* Content */}
        <div className="relative z-10 flex items-center space-x-3">
          {/* Tool Icon with Micro-Animation */}
          <motion.div
            className={`
              flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center
              bg-${tool.category.color}-100 text-${tool.category.color}-600
              group-hover:bg-${tool.category.color}-200
              transition-colors duration-200
            `}
            whileHover={{ 
              scale: 1.1,
              rotate: [0, -5, 5, 0],
              transition: { 
                scale: { duration: 0.2 },
                rotate: { duration: 0.4, ease: "easeInOut" }
              }
            }}
          >
            <tool.icon className="w-5 h-5" />
            
            {/* Sparkle effect on hover */}
            <AnimatePresence>
              {isHovered && (
                <>
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-yellow-400 rounded-full"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ 
                        scale: [0, 1, 0],
                        opacity: [0, 1, 0],
                        x: [0, (i - 1) * 15],
                        y: [0, (i - 1) * 10],
                      }}
                      transition={{
                        duration: 0.6,
                        delay: i * 0.1,
                        ease: "easeOut"
                      }}
                    />
                  ))}
                </>
              )}
            </AnimatePresence>
          </motion.div>
          
          {/* Tool Info */}
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-medium text-slate-900 group-hover:text-slate-800 transition-colors truncate">
              {tool.name}
            </h4>
            <p className="text-xs text-slate-500 mt-1 leading-tight">
              {tool.hint || tool.description}
            </p>
          </div>
          
          {/* Arrow Indicator */}
          <motion.div
            className="flex-shrink-0 text-slate-400 group-hover:text-slate-600"
            animate={{ x: isHovered ? 2 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ArrowRight className="w-4 h-4" />
          </motion.div>
        </div>
        
        {/* Popular Badge */}
        {tool.isPopular && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="absolute top-2 right-2 w-2 h-2 bg-green-500 rounded-full"
          >
            <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-75" />
          </motion.div>
        )}
        
        {/* Ripple Effect on Click */}
        <div className="absolute inset-0 overflow-hidden rounded-lg">
          <div className="absolute inset-0 bg-slate-200 opacity-0 group-active:opacity-100 transition-opacity duration-150" />
        </div>
      </Link>
    </motion.div>
  );
};
```

## **Button Micro-Interactions**

### **Enhanced Button Components**
```tsx
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  children: React.ReactNode;
}

const EnhancedButton = ({ 
  variant = 'primary', 
  size = 'md', 
  isLoading, 
  children, 
  ...props 
}: ButtonProps) => {
  const [isPressed, setIsPressed] = useState(false);
  
  const baseClasses = `
    relative inline-flex items-center justify-center font-medium rounded-lg
    focus:outline-none focus:ring-2 focus:ring-offset-2
    transition-all duration-200 ease-out
    disabled:opacity-50 disabled:cursor-not-allowed
    overflow-hidden
  `;
  
  const variants = {
    primary: `
      bg-blue-600 hover:bg-blue-700 text-white
      shadow-md hover:shadow-lg active:shadow-md
      focus:ring-blue-500
      transform hover:-translate-y-0.5 active:translate-y-0
    `,
    secondary: `
      bg-white hover:bg-slate-50 text-slate-900 border border-slate-300
      shadow-sm hover:shadow-md
      focus:ring-slate-500
      transform hover:-translate-y-0.5 active:translate-y-0
    `,
    ghost: `
      bg-transparent hover:bg-slate-100 text-slate-600 hover:text-slate-900
      focus:ring-slate-500
    `
  };
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  };
  
  return (
    <motion.button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]}`}
      whileTap={{ scale: 0.98 }}
      onTapStart={() => setIsPressed(true)}
      onTapEnd={() => setIsPressed(false)}
      {...props}
    >
      {/* Ripple Effect */}
      <AnimatePresence>
        {isPressed && (
          <motion.div
            className="absolute inset-0 bg-white/30 rounded-full"
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 4, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        )}
      </AnimatePresence>
      
      {/* Loading Spinner */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className="mr-2"
          >
            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Content */}
      <motion.span
        animate={{ x: isLoading ? 0 : 0 }}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.span>
      
      {/* Shimmer Effect for Primary Buttons */}
      {variant === 'primary' && (
        <div className="absolute inset-0 -top-2 -bottom-2 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 -translate-x-full hover:translate-x-full transition-transform duration-1000 ease-out" />
      )}
    </motion.button>
  );
};
```

## **Form Input Micro-Interactions**

### **Enhanced Input Component**
```tsx
const EnhancedInput = ({ label, error, ...props }: InputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);
  
  return (
    <div className="relative">
      {/* Floating Label */}
      <motion.label
        className={`
          absolute left-3 transition-all duration-200 pointer-events-none
          ${isFocused || hasValue 
            ? 'top-2 text-xs text-blue-600 bg-white px-1' 
            : 'top-3 text-base text-slate-500'
          }
        `}
        animate={{
          y: isFocused || hasValue ? -8 : 0,
          scale: isFocused || hasValue ? 0.85 : 1,
        }}
      >
        {label}
      </motion.label>
      
      {/* Input Field */}
      <motion.input
        className={`
          w-full px-3 py-3 border rounded-lg bg-white
          transition-all duration-200 ease-out
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
          ${error 
            ? 'border-red-300 focus:ring-red-500' 
            : 'border-slate-300 hover:border-slate-400'
          }
        `}
        onFocus={() => setIsFocused(true)}
        onBlur={(e) => {
          setIsFocused(false);
          setHasValue(!!e.target.value);
        }}
        whileFocus={{ 
          scale: 1.02,
          transition: { duration: 0.2 }
        }}
        {...props}
      />
      
      {/* Error Message */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-2 text-sm text-red-600 flex items-center"
          >
            <AlertCircle className="w-4 h-4 mr-1" />
            {error}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
```

## **Accessibility & Performance Considerations**

### **Reduced Motion Support**
```css
/* Respect user preference for reduced motion */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
  
  /* Keep essential micro-feedbacks but reduce intensity */
  .interactive-element:hover {
    transform: none;
    box-shadow: var(--shadow-sm);
  }
  
  .interactive-element:focus-visible {
    outline: 2px solid currentColor;
    outline-offset: 2px;
  }
}
```

### **Performance Optimization**
```css
/* Hardware acceleration for smooth animations */
.hardware-accelerated {
  transform: translateZ(0);
  will-change: transform;
  backface-visibility: hidden;
}

/* Optimize repaints */
.optimized-hover {
  contain: layout style paint;
}

/* Batch layout changes */
.batch-transforms {
  transform: translate3d(0, 0, 0) scale(1) rotate(0deg);
  transition: transform var(--transition-base) var(--ease-out-cubic);
}

.batch-transforms:hover {
  transform: translate3d(0, -4px, 0) scale(1.02) rotate(0deg);
}
```

These hover transitions and micro-interactions provide:
- **Smooth elevation changes** with consistent shadow progression
- **Spring-based animations** for natural feeling interactions
- **Category-specific color theming** for visual hierarchy
- **Performance optimized transforms** using GPU acceleration
- **Accessibility compliance** with reduced motion support
- **Progressive enhancement** from basic hover to advanced animations
- **Consistent timing** across all interactive elements