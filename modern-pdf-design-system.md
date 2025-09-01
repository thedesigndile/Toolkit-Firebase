# Modern PDF Tool Website - Comprehensive Design System

## **Sophisticated Visual Hierarchy**

### **1. Hero Section - Quick Actions (Above the Fold)**
```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          Professional PDF Tools                             │
│                     Powerful • Secure • Lightning Fast                     │
│                                                                             │
│  ┌────────────────┐ ┌────────────────┐ ┌────────────────┐ ┌────────────────┐ │
│  │   MERGE PDF    │ │ CONVERT TO DOC │ │ COMPRESS PDF   │ │   SIGN PDF     │ │
│  │                │ │                │ │                │ │                │ │
│  │ [Gradient Icon]│ │ [Gradient Icon]│ │ [Gradient Icon]│ │ [Gradient Icon]│ │
│  │                │ │                │ │                │ │                │ │
│  │ Combine files  │ │ Perfect editing│ │ Reduce 90% size│ │ Digital signing│ │
│  │   instantly    │ │   conversion   │ │  without loss  │ │   in seconds   │ │
│  └────────────────┘ └────────────────┘ └────────────────┘ └────────────────┘ │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### **Hero Component Specifications**
```tsx
interface HeroQuickActionCard {
  title: string;
  description: string;
  icon: React.ComponentType;
  gradient: string;
  hoverGradient: string;
  stats?: string; // e.g. "90% size reduction"
  popularity?: number;
}

const HERO_QUICK_ACTIONS: HeroQuickActionCard[] = [
  {
    title: "Merge PDF",
    description: "Combine files instantly",
    icon: MergePdfIcon,
    gradient: "from-blue-500 via-blue-600 to-indigo-700",
    hoverGradient: "from-blue-600 via-blue-700 to-indigo-800",
    stats: "#1 Most Used",
    popularity: 10
  },
  {
    title: "Convert to Word", 
    description: "Perfect editing conversion",
    icon: PdfToWordIcon,
    gradient: "from-emerald-500 via-green-600 to-teal-700",
    hoverGradient: "from-emerald-600 via-green-700 to-teal-800",
    stats: "99% accuracy",
    popularity: 9
  },
  {
    title: "Compress PDF",
    description: "Reduce 90% size without loss", 
    icon: CompressPdfIcon,
    gradient: "from-orange-500 via-red-500 to-pink-600",
    hoverGradient: "from-orange-600 via-red-600 to-pink-700",
    stats: "Up to 90% smaller",
    popularity: 8
  },
  {
    title: "Sign PDF",
    description: "Digital signing in seconds",
    icon: SignPdfIcon, 
    gradient: "from-purple-500 via-violet-600 to-indigo-700",
    hoverGradient: "from-purple-600 via-violet-700 to-indigo-800",
    stats: "Legally binding",
    popularity: 9
  }
];
```

## **Advanced Design System**

### **Color Palette with Semantic Usage**
```css
:root {
  /* Primary Brand Colors */
  --brand-primary: #2563eb; /* Blue 600 */
  --brand-primary-light: #3b82f6; /* Blue 500 */
  --brand-primary-dark: #1d4ed8; /* Blue 700 */
  
  /* Category-Specific Colors */
  --category-edit: #059669; /* Emerald 600 */
  --category-convert: #dc2626; /* Red 600 */
  --category-organize: #7c3aed; /* Violet 600 */
  --category-optimize: #ea580c; /* Orange 600 */
  --category-security: #be123c; /* Rose 700 */
  --category-view: #0891b2; /* Cyan 600 */
  --category-extract: #65a30d; /* Lime 600 */
  
  /* Semantic Colors */
  --success: #16a34a; /* Green 600 */
  --success-light: #dcfce7; /* Green 50 */
  --warning: #ca8a04; /* Yellow 600 */
  --warning-light: #fefce8; /* Yellow 50 */
  --error: #dc2626; /* Red 600 */
  --error-light: #fef2f2; /* Red 50 */
  --info: #2563eb; /* Blue 600 */
  --info-light: #eff6ff; /* Blue 50 */
  
  /* Neutral Palette */
  --neutral-50: #fafafa;
  --neutral-100: #f5f5f5;
  --neutral-200: #e5e5e5;
  --neutral-300: #d4d4d4;
  --neutral-400: #a3a3a3;
  --neutral-500: #737373;
  --neutral-600: #525252;
  --neutral-700: #404040;
  --neutral-800: #262626;
  --neutral-900: #171717;
}
```

### **8-Point Grid System**
```css
/* Base spacing using 8px increments */
:root {
  --space-1: 8px;   /* 0.5rem */
  --space-2: 16px;  /* 1rem */
  --space-3: 24px;  /* 1.5rem */
  --space-4: 32px;  /* 2rem */
  --space-5: 40px;  /* 2.5rem */
  --space-6: 48px;  /* 3rem */
  --space-8: 64px;  /* 4rem */
  --space-10: 80px; /* 5rem */
  --space-12: 96px; /* 6rem */
  --space-16: 128px; /* 8rem */
  --space-20: 160px; /* 10rem */
}

/* Grid application */
.grid-8pt {
  display: grid;
  gap: var(--space-2);
  padding: var(--space-2);
  margin: var(--space-2);
}

/* Component sizing */
.hero-card {
  min-height: calc(var(--space-6) * 4); /* 192px */
  padding: var(--space-4); /* 32px */
  border-radius: var(--space-2); /* 16px */
}
```

### **Typography Hierarchy**
```css
/* Font System */
.text-hero {
  font-size: 3.5rem; /* 56px */
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -0.02em;
}

.text-title-1 {
  font-size: 2.5rem; /* 40px */
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.01em;
}

.text-title-2 {
  font-size: 2rem; /* 32px */
  font-weight: 600;
  line-height: 1.25;
}

.text-title-3 {
  font-size: 1.5rem; /* 24px */
  font-weight: 600;
  line-height: 1.3;
}

.text-body-large {
  font-size: 1.125rem; /* 18px */
  font-weight: 400;
  line-height: 1.6;
}

.text-body {
  font-size: 1rem; /* 16px */
  font-weight: 400;
  line-height: 1.5;
}

.text-body-small {
  font-size: 0.875rem; /* 14px */
  font-weight: 400;
  line-height: 1.4;
}

.text-caption {
  font-size: 0.75rem; /* 12px */
  font-weight: 500;
  line-height: 1.3;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
```

## **7 Reorganized PDF Categories**

### **1. Edit PDF** (Emerald Theme)
- **Primary Tools**: Edit text, Edit images, Add text, Add images, Annotate, Highlight, Comments
- **Color**: `--category-edit` (#059669)
- **Icon**: `Edit` (24px)
- **Description**: "Modify and enhance your PDFs with powerful editing tools"

### **2. Convert PDF** (Red Theme)  
- **Primary Tools**: To Word, To Excel, To PowerPoint, To Image, From Word, From Image, To HTML
- **Color**: `--category-convert` (#dc2626)
- **Icon**: `ArrowRightLeft` (24px)
- **Description**: "Transform PDFs to any format with perfect accuracy"

### **3. Organize PDF** (Violet Theme)
- **Primary Tools**: Merge, Split, Rotate, Reorder, Insert pages, Delete pages, Extract pages
- **Color**: `--category-organize` (#7c3aed)
- **Icon**: `FolderTree` (24px)  
- **Description**: "Arrange and structure your PDF documents efficiently"

### **4. Optimize PDF** (Orange Theme)
- **Primary Tools**: Compress, Reduce size, Image optimization, Font optimization, Quality settings
- **Color**: `--category-optimize` (#ea580c)
- **Icon**: `Zap` (24px)
- **Description**: "Enhance performance and reduce file sizes intelligently"

### **5. Security PDF** (Rose Theme)
- **Primary Tools**: Password protect, Remove password, Encrypt, Sign, Watermark, Redact
- **Color**: `--category-security` (#be123c)
- **Icon**: `ShieldCheck` (24px)
- **Description**: "Secure and protect your documents with enterprise-grade security"

### **6. View PDF** (Cyan Theme)
- **Primary Tools**: Reader, Thumbnails, Dark mode, Full screen, Page navigation, Bookmarks
- **Color**: `--category-view` (#0891b2)
- **Icon**: `Eye` (24px)
- **Description**: "Experience PDFs with our advanced viewing capabilities"

### **7. Extract PDF** (Lime Theme)
- **Primary Tools**: Extract text, Extract images, OCR text recognition, Extract data, Extract pages
- **Color**: `--category-extract` (#65a30d)
- **Icon**: `Download` (24px)
- **Description**: "Pull out content and data from your PDF documents"