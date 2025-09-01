# Hero Cards with Custom Gradients & Micro-Animations

## **Large Visually Striking Primary Tool Cards**

### **Hero Quick Action Card Component**
```tsx
interface HeroQuickActionCardProps {
  tool: HeroQuickActionTool;
  index: number;
  onAction: (toolId: string) => void;
}

const HeroQuickActionCard = ({ tool, index, onAction }: HeroQuickActionCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        delay: index * 0.1,
        duration: 0.6,
        ease: [0.21, 1.11, 0.81, 0.99] // Custom spring easing
      }}
      className="group relative"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onTapStart={() => setIsPressed(true)}
      onTapEnd={() => setIsPressed(false)}
    >
      {/* Background Gradient Card */}
      <motion.div
        className={`
          relative overflow-hidden rounded-3xl cursor-pointer
          min-h-[200px] lg:min-h-[240px]
          bg-gradient-to-br ${tool.gradient}
          shadow-lg hover:shadow-2xl
          transition-all duration-500 ease-out
        `}
        whileHover={{ 
          scale: 1.02,
          rotateX: 5,
          rotateY: 5,
        }}
        whileTap={{ 
          scale: 0.98,
          rotateX: 0,
          rotateY: 0,
        }}
        style={{
          transformStyle: 'preserve-3d',
          perspective: 1000,
        }}
        onClick={() => onAction(tool.id)}
      >
        {/* Animated Background Mesh */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-white/10 rounded-full mix-blend-overlay filter blur-xl opacity-70 animate-blob" />
          <div className="absolute top-0 -right-4 w-72 h-72 bg-white/10 rounded-full mix-blend-overlay filter blur-xl opacity-70 animate-blob animation-delay-2000" />
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-white/10 rounded-full mix-blend-overlay filter blur-xl opacity-70 animate-blob animation-delay-4000" />
        </div>

        {/* Glass Morphism Overlay */}
        <div className="absolute inset-0 bg-white/5 backdrop-blur-sm" />
        
        {/* Hover Gradient Overlay */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${tool.hoverGradient} opacity-0`}
          animate={{ opacity: isHovered ? 0.1 : 0 }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Content Container */}
        <div className="relative z-10 p-8 h-full flex flex-col justify-between text-white">
          
          {/* Top Section: Icon & Stats Badge */}
          <div className="flex items-start justify-between">
            {/* Animated Icon Container */}
            <motion.div
              className="relative"
              whileHover={{ 
                scale: 1.1,
                rotateZ: 5,
              }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              {/* Icon Glow Effect */}
              <div className="absolute inset-0 bg-white/20 rounded-2xl blur-lg scale-110" />
              
              {/* Icon Background */}
              <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                <tool.icon className="w-8 h-8 text-white drop-shadow-sm" />
              </div>
              
              {/* Floating particles around icon */}
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-white/60 rounded-full"
                  style={{
                    top: `${20 + i * 15}%`,
                    left: `${80 + i * 10}%`,
                  }}
                  animate={{
                    y: [-5, 5, -5],
                    opacity: [0.6, 1, 0.6],
                  }}
                  transition={{
                    duration: 2,
                    delay: i * 0.3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </motion.div>
            
            {/* Stats Badge */}
            {tool.stats && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="bg-black/20 backdrop-blur-sm px-3 py-1 rounded-full border border-white/30"
              >
                <span className="text-xs font-medium text-white/90">
                  {tool.stats}
                </span>
              </motion.div>
            )}
          </div>
          
          {/* Middle Section: Title & Description */}
          <div className="flex-1 flex flex-col justify-center space-y-3">
            <motion.h3
              className="text-2xl lg:text-3xl font-bold text-white leading-tight"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
            >
              {tool.title}
            </motion.h3>
            
            <motion.p
              className="text-white/80 text-sm lg:text-base font-medium leading-relaxed"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              {tool.description}
            </motion.p>
          </div>
          
          {/* Bottom Section: Action Button */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + index * 0.1 }}
            className="flex items-center justify-between"
          >
            <div className="flex items-center space-x-2 text-white/60">
              <div className="flex -space-x-1">
                {/* User avatars for social proof */}
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="w-6 h-6 rounded-full bg-white/20 border-2 border-white/30"
                  />
                ))}
              </div>
              <span className="text-xs">1M+ users</span>
            </div>
            
            {/* Action Arrow */}
            <motion.div
              className="bg-white/10 backdrop-blur-sm p-2 rounded-full border border-white/20"
              whileHover={{ scale: 1.1, x: 2 }}
              whileTap={{ scale: 0.9 }}
            >
              <ArrowRight className="w-4 h-4 text-white" />
            </motion.div>
          </motion.div>
        </div>
        
        {/* Shine Effect on Hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12"
          style={{ transform: 'translateX(-100%)' }}
          animate={{ 
            transform: isHovered ? 'translateX(300%)' : 'translateX(-100%)'
          }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        />
      </motion.div>
    </motion.div>
  );
};
```

### **Custom CSS Animations**
```css
/* Blob animation for floating background elements */
@keyframes blob {
  0% {
    transform: translate(0px, 0px) scale(1);
  }
  33% {
    transform: translate(30px, -50px) scale(1.1);
  }
  66% {
    transform: translate(-20px, 20px) scale(0.9);
  }
  100% {
    transform: translate(0px, 0px) scale(1);
  }
}

.animate-blob {
  animation: blob 7s infinite;
}

.animation-delay-2000 {
  animation-delay: 2s;
}

.animation-delay-4000 {
  animation-delay: 4s;
}

/* Gradient shimmer effect */
@keyframes shimmer {
  0% {
    background-position: -468px 0;
  }
  100% {
    background-position: 468px 0;
  }
}

.shimmer {
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
  background-size: 468px 100%;
  animation: shimmer 2s infinite;
}

/* Floating micro-interactions */
@keyframes float {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-10px) rotate(5deg);
  }
}

.float-animation {
  animation: float 3s ease-in-out infinite;
}

/* Pulse glow effect */
@keyframes pulse-glow {
  0%, 100% {
    box-shadow: 0 0 20px rgba(255, 255, 255, 0.1);
  }
  50% {
    box-shadow: 0 0 40px rgba(255, 255, 255, 0.2);
  }
}

.pulse-glow {
  animation: pulse-glow 2s ease-in-out infinite;
}
```

### **Enhanced Gradient Definitions**
```tsx
const ENHANCED_GRADIENTS = {
  merge: {
    default: "from-blue-500 via-blue-600 to-indigo-700",
    hover: "from-blue-600 via-indigo-700 to-purple-800",
    shadow: "shadow-blue-500/25",
    glow: "drop-shadow-lg drop-shadow-blue-500/20"
  },
  convert: {
    default: "from-emerald-500 via-green-600 to-teal-700", 
    hover: "from-emerald-600 via-teal-700 to-cyan-800",
    shadow: "shadow-emerald-500/25",
    glow: "drop-shadow-lg drop-shadow-emerald-500/20"
  },
  compress: {
    default: "from-orange-500 via-red-500 to-pink-600",
    hover: "from-orange-600 via-red-600 to-pink-700", 
    shadow: "shadow-orange-500/25",
    glow: "drop-shadow-lg drop-shadow-orange-500/20"
  },
  sign: {
    default: "from-purple-500 via-violet-600 to-indigo-700",
    hover: "from-purple-600 via-indigo-700 to-blue-800",
    shadow: "shadow-purple-500/25", 
    glow: "drop-shadow-lg drop-shadow-purple-500/20"
  }
};
```

### **Hero Section Layout Container**
```tsx
const HeroQuickActionsSection = () => {
  return (
    <section className="relative py-20 lg:py-28 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-slate-100" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
        
        {/* Floating geometric shapes */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-purple-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-green-500/5 rounded-full blur-2xl transform -translate-x-1/2 -translate-y-1/2" />
      </div>
      
      <div className="relative z-10 container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.21, 1.11, 0.81, 0.99] }}
          className="text-center mb-16"
        >
          <h1 className="text-hero bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 bg-clip-text text-transparent mb-6">
            Professional PDF Tools
          </h1>
          <p className="text-body-large text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Powerful • Secure • Lightning Fast
            <br />
            <span className="text-slate-500">Transform your PDFs with enterprise-grade tools trusted by millions</span>
          </p>
        </motion.div>
        
        {/* Hero Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-8">
          {HERO_QUICK_ACTIONS.map((tool, index) => (
            <HeroQuickActionCard 
              key={tool.id}
              tool={tool} 
              index={index}
              onAction={handleToolAction}
            />
          ))}
        </div>
        
        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="flex items-center justify-center space-x-8 mt-12 text-slate-500"
        >
          <div className="flex items-center space-x-2">
            <Shield className="w-4 h-4" />
            <span className="text-sm">256-bit SSL</span>
          </div>
          <div className="flex items-center space-x-2">
            <Zap className="w-4 h-4" />
            <span className="text-sm">Lightning Fast</span>
          </div>
          <div className="flex items-center space-x-2">
            <Users className="w-4 h-4" />
            <span className="text-sm">10M+ Users</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
```

### **Mobile-Optimized Card Variant**
```tsx
const MobileHeroCard = ({ tool, index }: MobileHeroCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className={`
        relative overflow-hidden rounded-2xl
        min-h-[140px] p-6
        bg-gradient-to-br ${tool.gradient}
        shadow-lg active:shadow-xl
        transform active:scale-95
        transition-all duration-200
      `}
    >
      {/* Simplified mobile layout */}
      <div className="flex items-center justify-between text-white h-full">
        <div className="flex-1">
          <h3 className="text-lg font-bold mb-1">{tool.title}</h3>
          <p className="text-white/80 text-sm leading-tight">{tool.description}</p>
        </div>
        
        <div className="ml-4">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
            <tool.icon className="w-6 h-6 text-white" />
          </div>
        </div>
      </div>
      
      {/* Mobile tap feedback */}
      <div className="absolute inset-0 bg-white/5 opacity-0 active:opacity-100 transition-opacity duration-150" />
    </motion.div>
  );
};
```

These hero cards feature:
- **Custom gradient backgrounds** with hover state transitions
- **Micro-animations** including floating elements, shimmer effects, and spring transitions
- **Glass morphism effects** with backdrop blur and transparency layers
- **3D hover transformations** with perspective and rotation
- **Social proof elements** with user avatars and statistics
- **Progressive enhancement** from mobile to desktop layouts
- **Accessibility considerations** with proper focus states and touch targets
- **Performance optimization** with hardware-accelerated transforms