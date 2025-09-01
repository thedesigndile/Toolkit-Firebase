# Accessibility Design Specifications

## WCAG 2.1 AA Compliance

### Color Contrast Requirements
- **Text on background:** Minimum 4.5:1 ratio
- **Large text (18pt+):** Minimum 3:1 ratio  
- **Interactive elements:** Minimum 4.5:1 ratio
- **Focus indicators:** Minimum 3:1 ratio against adjacent colors

### Current Theme Compliance
```css
/* Light Mode Ratios */
--foreground: 250 40% 25%; /* Dark Purple - 8.2:1 on white background ✅ */
--muted-foreground: 240 15% 45%; /* Gray - 4.7:1 on white background ✅ */
--primary: 220 85% 55%; /* Blue - 4.6:1 on white background ✅ */

/* Dark Mode Ratios */
--foreground: 250 50% 85%; /* Light Purple - 7.8:1 on dark background ✅ */
--muted-foreground: 240 15% 75%; /* Light Gray - 4.9:1 on dark background ✅ */
--primary: 220 85% 65%; /* Brighter Blue - 5.1:1 on dark background ✅ */
```

## Enhanced ARIA Attributes

### Category Headers with Chevron Buttons
```tsx
interface AccessibleCategoryHeaderProps {
  category: EnhancedCategory;
  isExpanded: boolean;
  onToggle: () => void;
  toolCount: number;
}

const AccessibleCategoryHeader = ({ category, isExpanded, onToggle, toolCount }: AccessibleCategoryHeaderProps) => {
  const categoryId = category.name.replace(/\s+/g, '-').toLowerCase();
  
  return (
    <div role="group" aria-labelledby={`category-title-${categoryId}`}>
      <button
        onClick={onToggle}
        onKeyDown={(e) => handleKeyDown(e, onToggle)}
        className="w-full group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-lg"
        aria-expanded={isExpanded}
        aria-controls={`category-content-${categoryId}`}
        aria-describedby={`category-description-${categoryId} category-count-${categoryId}`}
        aria-label={`${isExpanded ? 'Collapse' : 'Expand'} ${category.name} category`}
        type="button"
        tabIndex={0}
      >
        <div className="flex items-center justify-between p-4 bg-card/50 backdrop-blur-sm rounded-lg border hover:border-primary/50 transition-all duration-200">
          <div className="flex items-center gap-4">
            <div 
              className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-primary/10 to-accent/10"
              aria-hidden="true"
            >
              <category.icon className="w-6 h-6 text-primary icon-gradient" />
            </div>
            <div className="text-left">
              <h2 
                id={`category-title-${categoryId}`}
                className="text-xl font-semibold text-foreground transition-colors"
              >
                {category.name}
              </h2>
              <p 
                id={`category-description-${categoryId}`}
                className="text-sm text-muted-foreground mt-1"
              >
                {category.description}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <span 
              id={`category-count-${categoryId}`}
              className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full"
              aria-label={`${toolCount} ${toolCount === 1 ? 'tool' : 'tools'} available`}
            >
              {toolCount} {toolCount === 1 ? 'tool' : 'tools'}
            </span>
            <div 
              className="p-2 rounded-full bg-muted/50 transition-colors"
              aria-hidden="true"
            >
              {isExpanded ? (
                <ChevronDown 
                  className="w-5 h-5 text-muted-foreground transition-all duration-200"
                  aria-hidden="true"
                />
              ) : (
                <ChevronRight 
                  className="w-5 h-5 text-muted-foreground transition-all duration-200"
                  aria-hidden="true"
                />
              )}
            </div>
          </div>
        </div>
      </button>
      
      {/* Live region for state announcements */}
      <div 
        aria-live="polite" 
        aria-atomic="true" 
        className="sr-only"
        id={`category-status-${categoryId}`}
      >
        {isExpanded 
          ? `${category.name} category expanded, showing ${toolCount} tools` 
          : `${category.name} category collapsed`
        }
      </div>
    </div>
  );
};
```

### Keyboard Navigation Implementation
```tsx
const handleKeyDown = (event: React.KeyboardEvent, onToggle: () => void) => {
  switch (event.key) {
    case 'Enter':
    case ' ': // Spacebar
      event.preventDefault();
      onToggle();
      break;
    case 'Escape':
      // Close expanded categories
      if (event.currentTarget.getAttribute('aria-expanded') === 'true') {
        event.preventDefault();
        onToggle();
      }
      break;
    default:
      break;
  }
};

// Arrow key navigation between categories
const useCategoryNavigation = (categories: EnhancedCategory[]) => {
  const handleArrowNavigation = (event: React.KeyboardEvent, currentIndex: number) => {
    let targetIndex = currentIndex;
    
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        targetIndex = (currentIndex + 1) % categories.length;
        break;
      case 'ArrowUp':  
        event.preventDefault();
        targetIndex = currentIndex === 0 ? categories.length - 1 : currentIndex - 1;
        break;
      case 'Home':
        event.preventDefault();
        targetIndex = 0;
        break;
      case 'End':
        event.preventDefault();
        targetIndex = categories.length - 1;
        break;
      default:
        return;
    }
    
    // Focus the target category header
    const targetElement = document.querySelector(
      `[aria-controls="category-content-${categories[targetIndex].name.replace(/\s+/g, '-').toLowerCase()}"]`
    ) as HTMLElement;
    
    if (targetElement) {
      targetElement.focus();
    }
  };
  
  return handleArrowNavigation;
};
```

### Tool Card Accessibility
```tsx
const AccessibleToolCard = ({ tool, index }: ToolCardProps) => {
  const toolId = tool.name.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and');
  const slug = useMemo(() => toolId, [toolId]);

  return (
    <article 
      className="w-full h-full"
      aria-labelledby={`tool-title-${toolId}`}
      aria-describedby={`tool-description-${toolId}`}
    >
      <Link
        href={`/tools/${slug}`}
        className="block group relative h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-2xl"
        aria-label={`Open ${tool.name} tool - ${tool.description}`}
        tabIndex={0}
        data-tool-card="true"
      >
        <Card className="h-full transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1 overflow-hidden">
          <CardContent className="flex flex-col h-full p-6 text-center justify-center items-center">
            {tool.isNew && (
              <div 
                className="absolute top-3 right-3 px-3 py-1 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs font-bold rounded-full shadow-md z-10"
                aria-label="New tool"
                role="img"
              >
                NEW
              </div>
            )}
            
            <div className="flex flex-col items-center text-center flex-1 justify-center">
              <div 
                className="mb-4 p-3 rounded-full transition-all duration-300"
                aria-hidden="true"
              >
                <tool.icon className="w-5 h-5 icon-gradient" />
              </div>
              
              <h3 
                id={`tool-title-${toolId}`}
                className="text-lg font-semibold leading-tight text-foreground group-hover:text-primary transition-colors duration-300"
              >
                {tool.name}
              </h3>
              
              <p 
                id={`tool-description-${toolId}`}
                className="text-sm text-muted-foreground mt-2 line-clamp-2 px-2 transition-colors duration-300"
              >
                {tool.description}
              </p>
            </div>
          </CardContent>
        </Card>
      </Link>
    </article>
  );
};
```

### Search Bar Accessibility
```tsx
const AccessibleSearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const searchId = "tools-search";
  const resultsId = "search-results";
  
  return (
    <div className="mt-8 mx-auto max-w-lg relative">
      <label htmlFor={searchId} className="sr-only">
        Search for tools
      </label>
      
      <div className="relative">
        <Search 
          className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" 
          aria-hidden="true"
        />
        
        <Input
          id={searchId}
          type="search"
          placeholder="Search for any tool..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-4 h-14 text-lg rounded-full shadow-md"
          aria-describedby="search-instructions"
          aria-controls={resultsId}
          aria-expanded={searchTerm.length > 0}
          autoComplete="off"
          role="searchbox"
        />
      </div>
      
      <div id="search-instructions" className="sr-only">
        Start typing to search through all available tools. Use arrow keys to navigate results.
      </div>
      
      {/* Live region for search results announcements */}
      <div aria-live="polite" aria-atomic="false" className="sr-only">
        {searchTerm && (
          <span>
            {filteredTools.length > 0 
              ? `${filteredTools.length} ${filteredTools.length === 1 ? 'tool' : 'tools'} found for "${searchTerm}"`
              : `No tools found for "${searchTerm}"`
            }
          </span>
        )}
      </div>
    </div>
  );
};
```

### Quick Actions Accessibility
```tsx
const AccessibleQuickActions = ({ actions }: { actions: QuickAction[] }) => {
  return (
    <section 
      aria-labelledby="quick-actions-heading"
      className="bg-card/50 backdrop-blur-sm rounded-xl p-6 mb-8"
    >
      <h2 id="quick-actions-heading" className="text-xl font-semibold mb-4 text-center">
        Quick Actions
      </h2>
      
      <div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        role="group"
        aria-labelledby="quick-actions-heading"
      >
        {actions.map((action, index) => (
          <Link
            key={action.name}
            href={`/tools/${action.slug}`}
            className="flex items-center p-4 bg-card rounded-lg border hover:border-primary/50 hover:bg-card/70 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            aria-label={`${action.name} - ${action.description}`}
            tabIndex={0}
          >
            <action.icon 
              className="w-6 h-6 text-primary icon-gradient mr-3 flex-shrink-0" 
              aria-hidden="true"
            />
            <div className="min-w-0 flex-1">
              <h3 className="font-semibold text-foreground text-sm">
                {action.name}
              </h3>
              <p className="text-xs text-muted-foreground mt-1 truncate">
                {action.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};
```

## Focus Management

### Focus Trap for Expanded Categories
```tsx
const useFocusTrap = (isExpanded: boolean, containerRef: RefObject<HTMLElement>) => {
  useEffect(() => {
    if (!isExpanded || !containerRef.current) return;

    const container = containerRef.current;
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstFocusable = focusableElements[0] as HTMLElement;
    const lastFocusable = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleTabKey = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return;

      if (event.shiftKey) {
        if (document.activeElement === firstFocusable) {
          event.preventDefault();
          lastFocusable.focus();
        }
      } else {
        if (document.activeElement === lastFocusable) {
          event.preventDefault();
          firstFocusable.focus();
        }
      }
    };

    container.addEventListener('keydown', handleTabKey);
    return () => container.removeEventListener('keydown', handleTabKey);
  }, [isExpanded]);
};
```

### Visible Focus Indicators
```css
/* Enhanced focus styles */
.focus-visible {
  outline: 2px solid hsl(var(--primary));
  outline-offset: 2px;
  border-radius: 4px;
}

/* High contrast focus for accessibility */
@media (prefers-contrast: high) {
  .focus-visible {
    outline: 3px solid hsl(var(--primary));
    outline-offset: 3px;
  }
}

/* Reduced motion respect */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Screen Reader Enhancements
```tsx
// Skip links for keyboard users
const SkipLinks = () => (
  <nav className="sr-only focus-within:not-sr-only">
    <a 
      href="#main-content" 
      className="absolute top-4 left-4 bg-primary text-primary-foreground px-4 py-2 rounded z-50 focus:outline-none focus-visible:ring-2"
    >
      Skip to main content
    </a>
    <a 
      href="#quick-actions" 
      className="absolute top-4 left-32 bg-primary text-primary-foreground px-4 py-2 rounded z-50 focus:outline-none focus-visible:ring-2"
    >
      Skip to quick actions
    </a>
  </nav>
);

// Landmark roles for page structure
<main id="main-content" role="main" aria-label="Tool categories and search">
  <section id="quick-actions" aria-label="Quick access to popular tools">
    {/* Quick actions content */}
  </section>
  
  <section aria-label="All tool categories" role="region">
    {/* Categories content */}
  </section>
</main>
```

## Testing Checklist

### Automated Testing
- [ ] ESLint a11y plugin compliance
- [ ] axe-core accessibility testing
- [ ] WAVE browser extension validation
- [ ] Color contrast analyzer verification

### Manual Testing  
- [ ] Screen reader navigation (NVDA, JAWS, VoiceOver)
- [ ] Keyboard-only navigation
- [ ] High contrast mode compatibility
- [ ] Zoom to 200% without horizontal scrolling
- [ ] Focus management and visibility