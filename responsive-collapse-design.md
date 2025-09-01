# Responsive Collapse Behavior Design

## Default Expansion Logic

### Desktop (≥768px)
- **Edit PDF**: Expanded by default ✅
- **Convert PDF**: Expanded by default ✅  
- **Organize PDF**: Expanded by default ✅
- **All other categories**: Collapsed by default ❌

### Mobile (<768px)
- **All categories**: Collapsed by default ❌

## Technical Implementation

### Enhanced State Management
```typescript
interface CategoryState {
  [categoryName: string]: boolean;
}

const useResponsiveCategories = () => {
  const isMobile = useIsMobile();
  
  const getDefaultExpandedState = useCallback((): CategoryState => {
    if (isMobile) {
      // Mobile: all collapsed
      return ENHANCED_CATEGORIES.reduce((acc, cat) => ({
        ...acc,
        [cat.name]: false
      }), {});
    } else {
      // Desktop: top 3 PDF categories expanded
      return ENHANCED_CATEGORIES.reduce((acc, cat) => ({
        ...acc,
        [cat.name]: cat.defaultExpanded.desktop
      }), {});
    }
  }, [isMobile]);

  const [expandedCategories, setExpandedCategories] = useState<CategoryState>(() => 
    getDefaultExpandedState()
  );

  // Update state when screen size changes
  useEffect(() => {
    setExpandedCategories(getDefaultExpandedState());
  }, [getDefaultExpandedState]);

  return { expandedCategories, setExpandedCategories };
};
```

### Category Header Component
```typescript
interface CategoryHeaderProps {
  category: EnhancedCategory;
  isExpanded: boolean;
  onToggle: () => void;
  toolCount: number;
}

const CategoryHeader = ({ category, isExpanded, onToggle, toolCount }: CategoryHeaderProps) => {
  return (
    <button
      onClick={onToggle}
      className="w-full group focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg"
      aria-expanded={isExpanded}
      aria-controls={`category-${category.name.replace(/\s+/g, '-').toLowerCase()}`}
      aria-label={`${isExpanded ? 'Collapse' : 'Expand'} ${category.name} category with ${toolCount} tools`}
    >
      <div className="flex items-center justify-between p-4 bg-card/50 backdrop-blur-sm rounded-lg border hover:border-primary/50 hover:bg-card/70 transition-all duration-200 group-focus:border-primary">
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-primary/10 to-accent/10 group-hover:from-primary/20 group-hover:to-accent/20 transition-colors">
            <category.icon className="w-6 h-6 text-primary icon-gradient" />
          </div>
          <div className="text-left">
            <h2 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
              {category.name}
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              {category.description}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
            {toolCount} {toolCount === 1 ? 'tool' : 'tools'}
          </span>
          <div 
            className="p-2 rounded-full bg-muted/50 group-hover:bg-primary/10 transition-colors"
            aria-hidden="true"
          >
            {isExpanded ? (
              <ChevronDown className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-all duration-200" />
            ) : (
              <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-all duration-200" />
            )}
          </div>
        </div>
      </div>
    </button>
  );
};
```

### Collapsible Content Component
```typescript
interface CollapsibleContentProps {
  isExpanded: boolean;
  categoryName: string;
  tools: Tool[];
  children: React.ReactNode;
}

const CollapsibleContent = ({ isExpanded, categoryName, children }: CollapsibleContentProps) => {
  return (
    <Collapsible open={isExpanded}>
      <CollapsibleContent
        className="data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down"
        id={`category-${categoryName.replace(/\s+/g, '-').toLowerCase()}`}
      >
        <div className="pt-4 pb-8">
          {children}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};
```

## Animation Specifications

### CSS Animations
```css
@keyframes collapsible-down {
  from {
    height: 0;
    opacity: 0;
  }
  to {
    height: var(--radix-collapsible-content-height);
    opacity: 1;
  }
}

@keyframes collapsible-up {
  from {
    height: var(--radix-collapsible-content-height);
    opacity: 1;
  }
  to {
    height: 0;
    opacity: 0;
  }
}

.animate-collapsible-down {
  animation: collapsible-down 0.3s ease-out;
}

.animate-collapsible-up {
  animation: collapsible-up 0.3s ease-out;
}
```

### Tailwind Configuration
```javascript
// tailwind.config.ts additions
module.exports = {
  theme: {
    extend: {
      animation: {
        'collapsible-down': 'collapsible-down 0.3s ease-out',
        'collapsible-up': 'collapsible-up 0.3s ease-out',
      },
      keyframes: {
        'collapsible-down': {
          from: { height: 0, opacity: 0 },
          to: { height: 'var(--radix-collapsible-content-height)', opacity: 1 },
        },
        'collapsible-up': {
          from: { height: 'var(--radix-collapsible-content-height)', opacity: 1 },
          to: { height: 0, opacity: 0 },
        },
      },
    },
  },
};
```

## Performance Optimizations

### Virtualization for Large Categories
```typescript
// For categories with many tools (>20), implement virtualization
const VirtualizedToolGrid = ({ tools }: { tools: Tool[] }) => {
  if (tools.length <= 20) {
    return <StandardToolGrid tools={tools} />;
  }
  
  return (
    <div className="h-96 overflow-auto">
      <VirtualList
        height={384}
        itemCount={tools.length}
        itemSize={200}
        itemData={tools}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {({ index, data }) => <ToolCard tool={data[index]} index={index} />}
      </VirtualList>
    </div>
  );
};
```

### Lazy Loading for Non-Visible Categories
```typescript
const LazyToolGrid = ({ tools, isVisible }: { tools: Tool[]; isVisible: boolean }) => {
  if (!isVisible) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: Math.min(tools.length, 6) }).map((_, i) => (
          <ToolCardSkeleton key={i} />
        ))}
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {tools.map((tool, i) => (
        <Suspense key={tool.name} fallback={<ToolCardSkeleton />}>
          <ToolCard tool={tool} index={i} />
        </Suspense>
      ))}
    </div>
  );
};
```

## Accessibility Enhancements

### Keyboard Navigation
```typescript
const handleKeyDown = (event: React.KeyboardEvent, onToggle: () => void) => {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    onToggle();
  }
};

// Focus management for expanded/collapsed states
const useFocusManagement = (isExpanded: boolean, categoryRef: RefObject<HTMLElement>) => {
  useEffect(() => {
    if (isExpanded && categoryRef.current) {
      // Focus first tool when category expands
      const firstTool = categoryRef.current.querySelector('[data-tool-card]') as HTMLElement;
      if (firstTool) {
        firstTool.focus();
      }
    }
  }, [isExpanded]);
};
```

### Screen Reader Support
```typescript
// Enhanced ARIA attributes
const ariaProps = {
  'aria-expanded': isExpanded,
  'aria-controls': `category-content-${categoryId}`,
  'aria-describedby': `category-description-${categoryId}`,
  'role': 'button',
  'tabIndex': 0
};

// Live regions for dynamic content updates
<div aria-live="polite" aria-atomic="true" className="sr-only">
  {isExpanded ? `${category.name} category expanded, showing ${toolCount} tools` : `${category.name} category collapsed`}
</div>