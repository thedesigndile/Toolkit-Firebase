# Visual Design Specifications

## Icon Sizing Standards

### Category Heading Icons
- **Size:** 24px (w-6 h-6 in Tailwind)
- **Container:** 48px circle (w-12 h-12) with gradient background
- **Usage:** All category header icons
- **Implementation:**
```tsx
<div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-primary/10 to-accent/10">
  <category.icon className="w-6 h-6 text-primary icon-gradient" />
</div>
```

### Tool Card Icons  
- **Size:** 20px (w-5 h-5 in Tailwind) 
- **Container:** 40px circle (w-10 h-10) with hover scaling
- **Usage:** All individual tool icons within cards
- **Implementation:**
```tsx
<motion.div
  className="mb-4 p-3 rounded-full transition-all duration-300"
  whileHover={{ scale: 1.15, rotate: 5 }}
>
  <Icon className="w-5 h-5 icon-gradient" />
</motion.div>
```

### Quick Action Icons
- **Size:** 24px (w-6 h-6 in Tailwind)
- **Container:** No container, inline with text
- **Usage:** Quick action cards at top
- **Implementation:**
```tsx
<action.icon className="w-6 h-6 text-primary icon-gradient mr-3" />
```

### Search and UI Icons
- **Size:** 20px (w-5 h-5 in Tailwind)
- **Usage:** Search icon, chevrons, utility icons
- **Implementation:**
```tsx
<Search className="w-5 h-5 text-muted-foreground" />
<ChevronDown className="w-5 h-5 text-muted-foreground" />
```

## Grid System Specifications

### Quick Actions Grid
```css
/* Desktop: 4 columns */
.quick-actions-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

/* Tablet: 2 columns */
@media (max-width: 1023px) {
  .quick-actions-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Mobile: 1 column */
@media (max-width: 639px) {
  .quick-actions-grid {
    grid-template-columns: 1fr;
  }
}
```

### Tool Cards Grid
```css
/* Desktop: 3 columns */
.tools-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

/* Tablet: 2 columns */
@media (max-width: 1023px) {
  .tools-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Mobile: 1 column */
@media (max-width: 639px) {
  .tools-grid {
    grid-template-columns: 1fr;
  }
}
```

### Tailwind Implementation
```tsx
// Quick Actions
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
  {quickActions.map(action => <QuickActionCard key={action.name} />)}
</div>

// Tool Cards  
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {tools.map(tool => <ToolCard key={tool.name} />)}
</div>
```

## Tool Sorting Logic Implementation

### Enhanced Tool Interface
```typescript
interface Tool {
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  category: string;
  categoryIcon: LucideIcon;
  processorType: ToolProcessorType;
  popularity: number; // 1-10 scale (10 = most used)
  isStandalone?: boolean;
  isNew?: boolean;
}
```

### Sorting Function
```typescript
const sortToolsInCategory = (tools: Tool[]): Tool[] => {
  return [...tools].sort((a, b) => {
    // Primary sort: by popularity (most used first)
    if (a.popularity !== b.popularity) {
      return b.popularity - a.popularity;
    }
    
    // Secondary sort: alphabetically by name
    return a.name.localeCompare(b.name, 'en', { 
      numeric: true, 
      sensitivity: 'base' 
    });
  });
};

// Usage in component
const categorizedTools = useMemo(() => {
  return ENHANCED_CATEGORIES.map(categoryInfo => {
    const categoryTools = filteredTools.filter(tool => tool.category === categoryInfo.name);
    if (categoryTools.length > 0) {
      return {
        ...categoryInfo,
        tools: sortToolsInCategory(categoryTools) // Apply sorting here
      };
    }
    return null;
  }).filter(Boolean);
}, [filteredTools]);
```

### Popularity Ratings by Tool
```typescript
const TOOL_POPULARITY = {
  // Most Used (9-10)
  'Merge PDF': 10,
  'PDF to Word': 10,
  'Compress PDF': 9,
  'Sign PDF': 9,
  'Fill PDF Form': 9,
  'Add Text to PDF': 9,
  
  // High Usage (7-8)
  'Split PDF': 8,
  'Password Protect PDF': 8,
  'Extract PDF Pages': 8,
  'Share PDF Link': 8,
  'Edit Text in PDF': 8,
  'PDF Dark Mode': 8,
  
  // Medium Usage (5-6)
  'Rotate PDF': 6,
  'Watermark PDF': 6,
  'PDF Reader': 6,
  'Add Images to PDF': 7,
  'Combine Files to PDF': 7,
  'Export Form Data': 7,
  
  // Lower Usage (3-4)
  'Crop PDF Pages': 5,
  'Form Field Recognition': 5,
  'PDF Page Thumbnails': 6,
  'Tag PDF Structure': 4,
  'Flatten PDF': 4,
  
  // Specialized Tools (1-2)
  'OCR Text Recognition': 3,
  'PDF Read Aloud': 3,
  'Create PDF Form': 2,
  'Insert PDF Pages': 2
};
```

## Spacing and Layout

### Container Spacing
- **Main container:** `container mx-auto px-4`
- **Section spacing:** `space-y-12 md:space-y-16` 
- **Category spacing:** `space-y-8`

### Card Padding
- **Quick action cards:** `p-4` (16px)
- **Tool cards:** `p-6` (24px)
- **Category headers:** `p-4` (16px)

### Gap Specifications
- **Grid gaps:** `gap-4` (16px) for all grids
- **Element gaps:** `gap-3` (12px) within components
- **Icon gaps:** `gap-2` (8px) for icon-text pairs

### Border Radius
- **Cards:** `rounded-xl` (12px)
- **Buttons:** `rounded-lg` (8px)
- **Icons containers:** `rounded-full`

## Color and Visual Hierarchy

### Background Layers
```css
.primary-background {
  background: hsl(var(--background));
}

.card-background {
  background: hsl(var(--card));
  backdrop-filter: blur(8px);
}

.elevated-background {
  background: hsl(var(--card) / 0.8);
  backdrop-filter: blur(12px);
}
```

### Text Hierarchy
- **H1 (Main title):** `text-4xl md:text-5xl font-bold`
- **H2 (Category titles):** `text-xl font-semibold`
- **H3 (Tool names):** `text-lg font-semibold`
- **Body text:** `text-base`
- **Descriptions:** `text-sm text-muted-foreground`
- **Labels:** `text-xs text-muted-foreground`

### Interactive States
```css
/* Hover Effects */
.hover-lift {
  transition: all 0.2s ease;
}

.hover-lift:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

/* Focus States */
.focus-ring {
  focus: outline-none;
  focus-visible: ring-2 ring-primary ring-offset-2;
}

/* Active States */
.active-scale {
  active: transform scale(0.98);
}
```

## Typography Scale

### Font Weights
- **Bold:** `font-bold` (700) - Main headings
- **Semibold:** `font-semibold` (600) - Category titles, tool names
- **Medium:** `font-medium` (500) - Buttons, labels
- **Normal:** `font-normal` (400) - Body text

### Line Heights
- **Tight:** `leading-tight` (1.25) - Headings
- **Normal:** `leading-normal` (1.5) - Body text
- **Relaxed:** `leading-relaxed` (1.625) - Descriptions

### Letter Spacing
- **Tight:** `tracking-tight` (-0.025em) - Large headings
- **Normal:** Default - Regular text
- **Wide:** `tracking-wide` (0.025em) - Small labels