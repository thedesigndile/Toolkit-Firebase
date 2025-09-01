# Home Page Component Specification

## Overview
The Home page functions as a grouped tools hub with collapsible categories, featuring a quick actions row and organized tool categories with full accessibility support.

## Visual Hierarchy

### Page Structure
```
┌─────────────────────────────────────────────────────────────┐
│                     Page Header                             │
├─────────────────────────────────────────────────────────────┤
│                   Hero Section                              │
│  "Every Tool You Need" + Search Bar                        │
├─────────────────────────────────────────────────────────────┤
│                  Quick Actions Row                          │
│  [Merge PDF] [Convert to Word] [Compress PDF] [Sign PDF]   │
├─────────────────────────────────────────────────────────────┤
│                 Category: Edit PDF (Expanded)               │
│  ┌─ Edit Text  ┐ ┌─ Add Text   ┐ ┌─ Annotate   ┐           │
│  └─────────────┘ └─────────────┘ └─────────────┘           │
├─────────────────────────────────────────────────────────────┤
│               Category: Convert PDF (Expanded)              │
│  ┌─ To Word    ┐ ┌─ To Excel   ┐ ┌─ To PowerPt  ┐           │
│  └─────────────┘ └─────────────┘ └─────────────┘           │
├─────────────────────────────────────────────────────────────┤
│              Category: Organize PDF (Expanded)              │
│  ┌─ Merge      ┐ ┌─ Split      ┐ ┌─ Reorder    ┐           │
│  └─────────────┘ └─────────────┘ └─────────────┘           │
├─────────────────────────────────────────────────────────────┤
│         Category: Secure and share (Collapsed)              │
│                      [Chevron >]                            │
├─────────────────────────────────────────────────────────────┤
│                 ... other categories ...                    │
└─────────────────────────────────────────────────────────────┘
```

## Component Breakdown

### 1. Hero Section Component
**File:** Enhanced [`src/components/tools-section.tsx`](src/components/tools-section.tsx:96-114)

```tsx
interface HeroSectionProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

const HeroSection = ({ searchTerm, onSearchChange }: HeroSectionProps) => {
  return (
    <div className="text-center py-12 md:py-16">
      <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
        <span className="block">Every Tool</span>
        <span className="block text-gradient-primary">You Need</span>
      </h1>
      <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
        Discover a powerful suite of free tools to boost your productivity, 
        streamline your workflow, and handle tasks like PDF editing, image 
        conversion, and more—all right in your browser.
      </p>
      <AccessibleSearchBar 
        searchTerm={searchTerm}
        onSearchChange={onSearchChange}
      />
    </div>
  );
};
```

### 2. Quick Actions Component
**File:** New `src/components/quick-actions.tsx`

```tsx
interface QuickAction {
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  slug: string;
  category: string;
}

const QUICK_ACTIONS: QuickAction[] = [
  {
    name: 'Merge PDF',
    description: 'Combine PDFs instantly',
    icon: MergePdfIcon,
    slug: 'merge-pdf',
    category: 'Organize PDF'
  },
  {
    name: 'Convert to Word', 
    description: 'PDF to Word conversion',
    icon: PdfToWordIcon,
    slug: 'pdf-to-word',
    category: 'Convert PDF'
  },
  {
    name: 'Compress PDF',
    description: 'Reduce file size',
    icon: CompressPdfIcon, 
    slug: 'compress-pdf',
    category: 'Edit PDF'
  },
  {
    name: 'Sign PDF',
    description: 'Add your signature',
    icon: SignPdfIcon,
    slug: 'sign-pdf', 
    category: 'Secure and share'
  }
];

export const QuickActions = () => {
  return (
    <section 
      aria-labelledby="quick-actions-heading"
      className="bg-card/50 backdrop-blur-sm rounded-xl p-6 mb-8"
    >
      <h2 id="quick-actions-heading" className="text-xl font-semibold mb-4 text-center">
        Quick Actions
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {QUICK_ACTIONS.map((action) => (
          <QuickActionCard key={action.name} action={action} />
        ))}
      </div>
    </section>
  );
};
```

### 3. Enhanced Category Component
**File:** Enhanced [`src/components/tools-section.tsx`](src/components/tools-section.tsx:153-191)

```tsx
interface EnhancedCategory {
  name: string;
  icon: LucideIcon;
  description: string;
  priority: number;
  defaultExpanded: {
    desktop: boolean;
    mobile: boolean;
  };
}

const ENHANCED_CATEGORIES: EnhancedCategory[] = [
  { 
    name: "Edit PDF", 
    icon: Edit, 
    description: "Modify text, images, and content directly in your PDFs",
    priority: 1,
    defaultExpanded: { desktop: true, mobile: false }
  },
  // ... other categories
];

const CategorySection = ({ 
  category, 
  tools, 
  isExpanded, 
  onToggle 
}: CategorySectionProps) => {
  const categoryId = category.name.replace(/\s+/g, '-').toLowerCase();
  
  return (
    <div className="space-y-6">
      <AccessibleCategoryHeader 
        category={category}
        isExpanded={isExpanded}
        onToggle={onToggle}
        toolCount={tools.length}
      />
      
      <Collapsible open={isExpanded}>
        <CollapsibleContent className="data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
          <div className="pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <StaggerContainer staggerDelay={0.05}>
                {tools.map((tool, index) => (
                  <StaggerItem key={tool.name}>
                    <AccessibleToolCard tool={tool} index={index} />
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};
```

### 4. Enhanced Tool Card Component
**File:** Enhanced [`src/components/tool-card.tsx`](src/components/tool-card.tsx:35-107)

```tsx
interface EnhancedTool extends Tool {
  popularity: number; // 1-10 scale for sorting
  hint?: string; // Brief usage hint
}

const AccessibleToolCard = ({ tool, index }: ToolCardProps) => {
  const toolId = tool.name.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and');
  
  return (
    <article 
      className="w-full h-full"
      aria-labelledby={`tool-title-${toolId}`}
      aria-describedby={`tool-description-${toolId}`}
    >
      <Link
        href={`/tools/${toolId}`}
        className="block group relative h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-2xl"
        data-tool-card="true"
      >
        <Card className="h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-primary/50">
          <CardContent className="flex flex-col h-full p-6 text-center justify-center items-center">
            {/* Tool Icon - 20px */}
            <div className="mb-4 p-3 rounded-full transition-all duration-300 group-hover:scale-110">
              <tool.icon className="w-5 h-5 icon-gradient" />
            </div>
            
            {/* Tool Name */}
            <h3 
              id={`tool-title-${toolId}`}
              className="text-lg font-semibold leading-tight text-foreground group-hover:text-primary transition-colors"
            >
              {tool.name}
            </h3>
            
            {/* Tool Description */}
            <p 
              id={`tool-description-${toolId}`}
              className="text-sm text-muted-foreground mt-2 line-clamp-2"
            >
              {tool.description}
            </p>
            
            {/* Hint (if provided) */}
            {tool.hint && (
              <div className="mt-2 px-2 py-1 bg-muted/50 rounded text-xs text-muted-foreground">
                {tool.hint}
              </div>
            )}
          </CardContent>
        </Card>
      </Link>
    </article>
  );
};
```

## Interaction States

### 1. Category Headers
- **Default:** Background `bg-card/50`, border `border`
- **Hover:** Background `bg-card/70`, border `border-primary/50`
- **Focus:** Ring `ring-2 ring-primary ring-offset-2`
- **Active:** Scale `scale-98`
- **Expanded:** Chevron rotates 90°, icon tint increases

### 2. Tool Cards
- **Default:** Background `bg-card`, subtle shadow
- **Hover:** Transform `translateY(-4px)`, enhanced shadow, border `border-primary/50`
- **Focus:** Ring `ring-2 ring-primary ring-offset-2`
- **Active:** Scale `scale-98`
- **Loading:** Skeleton placeholder animation

### 3. Quick Action Cards
- **Default:** Background `bg-card`, border `border`
- **Hover:** Background `bg-card/70`, scale `scale-102`
- **Focus:** Ring `ring-2 ring-primary ring-offset-2`
- **Active:** Scale `scale-98`

### 4. Search Bar
- **Default:** Background `bg-background`, border `border-input`
- **Focus:** Ring `ring-2 ring-ring`, border highlight
- **Typing:** Live search results update
- **Empty Results:** Helpful message display

## Required Copy

### Category Descriptions
```typescript
const CATEGORY_COPY = {
  "Edit PDF": "Modify text, images, and content directly in your PDFs",
  "Convert PDF": "Transform PDFs to other formats and vice versa", 
  "Organize PDF": "Arrange, combine, and structure your PDF documents",
  "Secure and share": "Protect and distribute your PDFs safely",
  "Forms": "Create, fill, and manage interactive PDF forms",
  "View and read": "Enhanced PDF viewing and reading experience", 
  "OCR and accessibility": "Text recognition and accessibility features",
  "Image Tools": "Transform and enhance your images",
  "Video Tools": "Edit and convert video content",
  "Audio Tools": "Process and convert audio files",
  "Utility Tools": "Essential productivity utilities",
  "Converters": "Convert between various file formats", 
  "Archive Tools": "Compress and extract archive files",
  "Advanced Features": "Professional tools and automation"
};
```

### Tool Hints
```typescript
const TOOL_HINTS = {
  "Merge PDF": "Drag & drop multiple files",
  "Split PDF": "Choose pages or page ranges",
  "Compress PDF": "Reduce size up to 90%",
  "PDF to Word": "Maintains formatting",
  "Sign PDF": "Digital signature support",
  "Add Text": "Click anywhere to add text",
  "Fill Form": "Auto-detect form fields",
  "Dark Mode": "Easy on the eyes",
  // ... more hints as needed
};
```

### Accessibility Labels
```typescript
const A11Y_LABELS = {
  searchPlaceholder: "Search for any tool...",
  searchInstructions: "Start typing to search through all available tools",
  categoryExpanded: (name: string, count: number) => 
    `${name} category expanded, showing ${count} tools`,
  categoryCollapsed: (name: string) => `${name} category collapsed`,
  toolAction: (name: string, description: string) => 
    `Open ${name} tool - ${description}`,
  quickAction: (name: string, description: string) => 
    `${name} - ${description}`,
  newTool: "New tool",
  toolCount: (count: number) => `${count} ${count === 1 ? 'tool' : 'tools'} available`
};
```

## Performance Considerations

### Lazy Loading
- Categories beyond the first 3 use lazy-loaded tool grids
- Images and icons are optimized for fast loading
- Skeleton states provide immediate feedback

### Animation Performance
```css
/* Optimized transitions */
.category-header {
  transition: background-color 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
}

.tool-card {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), 
              box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  will-change: transform;
}

/* Respect reduced motion preferences */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### State Management
```typescript
// Optimized state updates
const useOptimizedCategories = () => {
  const [expandedCategories, setExpandedCategories] = useState(() => 
    getInitialState()
  );
  
  const toggleCategory = useCallback((categoryName: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryName]: !prev[categoryName]
    }));
  }, []);
  
  // Batch updates for better performance
  const expandMultiple = useCallback((categories: string[]) => {
    setExpandedCategories(prev => {
      const updates = categories.reduce((acc, cat) => ({
        ...acc,
        [cat]: true
      }), {});
      return { ...prev, ...updates };
    });
  }, []);
  
  return { expandedCategories, toggleCategory, expandMultiple };
};
```

## File Structure Updates

### New Files to Create
- `src/components/quick-actions.tsx` - Quick actions component
- `src/components/category-header.tsx` - Enhanced category header
- `src/components/enhanced-search.tsx` - Accessible search component
- `src/hooks/use-category-navigation.tsx` - Keyboard navigation hook
- `src/hooks/use-responsive-categories.tsx` - Responsive state management

### Files to Update
- [`src/lib/tools.ts`](src/lib/tools.ts) - Add missing tools and popularity ratings
- [`src/components/tools-section.tsx`](src/components/tools-section.tsx) - Implement enhanced categorization
- [`src/components/tool-card.tsx`](src/components/tool-card.tsx) - Add accessibility improvements
- [`src/app/page.tsx`](src/app/page.tsx) - Integrate quick actions component

This specification provides a complete blueprint for implementing the enhanced Home page with all requested features, accessibility compliance, and performance optimizations.