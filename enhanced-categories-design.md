# Enhanced Categories Design

## Primary PDF Categories (Your 7 Specified)

### 1. Edit PDF
- **Icon:** `Edit` (24px) - from lucide-react
- **Description:** "Modify text, images, and content directly in your PDFs"
- **Tools:** Edit text and images, Add text, Add images, Annotate, Rearrange pages, Rotate pages, Crop pages, Extract pages, Fill and sign
- **Priority:** 1 (Always expanded on desktop)

### 2. Convert PDF  
- **Icon:** `ArrowRightLeft` (24px) - from lucide-react
- **Description:** "Transform PDFs to other formats and vice versa"
- **Tools:** To Word, To Excel, To PowerPoint, To Image, To HTML, From Word, From Image
- **Priority:** 2 (Always expanded on desktop)

### 3. Organize PDF
- **Icon:** `FolderTree` (24px) - from lucide-react  
- **Description:** "Arrange, combine, and structure your PDF documents"
- **Tools:** Merge, Split, Reorder, Insert pages, Delete pages, Combine files
- **Priority:** 3 (Always expanded on desktop)

### 4. Secure and share
- **Icon:** `ShieldCheck` (24px) - from lucide-react
- **Description:** "Protect and distribute your PDFs safely"
- **Tools:** Password protect, Redact, Watermark, Flatten, Share link
- **Priority:** 4

### 5. Forms
- **Icon:** `FileCheck` (24px) - from lucide-react
- **Description:** "Create, fill, and manage interactive PDF forms"
- **Tools:** Create form, Fill form, Form field recognition, Export data  
- **Priority:** 5

### 6. View and read
- **Icon:** `Eye` (24px) - from lucide-react
- **Description:** "Enhanced PDF viewing and reading experience"
- **Tools:** Reader, Page thumbnails, Dark mode
- **Priority:** 6

### 7. OCR and accessibility
- **Icon:** `ScanText` (24px) - from lucide-react
- **Description:** "Text recognition and accessibility features"
- **Tools:** Recognize text, Tag PDF, Read aloud
- **Priority:** 7

## Existing Categories (Maintained)

### 8. Image Tools
- **Icon:** `Image` (24px)
- **Description:** "Transform and enhance your images"
- **Priority:** 8

### 9. Video Tools  
- **Icon:** `Video` (24px)
- **Description:** "Edit and convert video content"
- **Priority:** 9

### 10. Audio Tools
- **Icon:** `AudioWaveform` (24px) 
- **Description:** "Process and convert audio files"
- **Priority:** 10

### 11. Utility Tools
- **Icon:** `Settings` (24px)
- **Description:** "Essential productivity utilities"
- **Priority:** 11

### 12. Converters
- **Icon:** `GitCompareArrows` (24px)
- **Description:** "Convert between various file formats"
- **Priority:** 12

### 13. Archive Tools
- **Icon:** `Package` (24px)
- **Description:** "Compress and extract archive files"
- **Priority:** 13

### 14. Advanced Features
- **Icon:** `Rocket` (24px)
- **Description:** "Professional tools and automation"
- **Priority:** 14

## Category Configuration Object

```typescript
export const ENHANCED_CATEGORIES = [
  // Primary PDF Categories (top 3 expanded on desktop)
  { 
    name: "Edit PDF", 
    icon: Edit, 
    description: "Modify text, images, and content directly in your PDFs",
    priority: 1,
    defaultExpanded: { desktop: true, mobile: false }
  },
  { 
    name: "Convert PDF", 
    icon: ArrowRightLeft, 
    description: "Transform PDFs to other formats and vice versa",
    priority: 2,
    defaultExpanded: { desktop: true, mobile: false }
  },
  { 
    name: "Organize PDF", 
    icon: FolderTree, 
    description: "Arrange, combine, and structure your PDF documents",
    priority: 3,
    defaultExpanded: { desktop: true, mobile: false }
  },
  
  // Secondary PDF Categories
  { 
    name: "Secure and share", 
    icon: ShieldCheck, 
    description: "Protect and distribute your PDFs safely",
    priority: 4,
    defaultExpanded: { desktop: false, mobile: false }
  },
  { 
    name: "Forms", 
    icon: FileCheck, 
    description: "Create, fill, and manage interactive PDF forms",
    priority: 5,
    defaultExpanded: { desktop: false, mobile: false }
  },
  { 
    name: "View and read", 
    icon: Eye, 
    description: "Enhanced PDF viewing and reading experience",
    priority: 6,
    defaultExpanded: { desktop: false, mobile: false }
  },
  { 
    name: "OCR and accessibility", 
    icon: ScanText, 
    description: "Text recognition and accessibility features",
    priority: 7,
    defaultExpanded: { desktop: false, mobile: false }
  },
  
  // Existing Categories (maintained)
  { 
    name: "Image Tools", 
    icon: Image, 
    description: "Transform and enhance your images",
    priority: 8,
    defaultExpanded: { desktop: false, mobile: false }
  },
  { 
    name: "Video Tools", 
    icon: Video, 
    description: "Edit and convert video content",
    priority: 9,
    defaultExpanded: { desktop: false, mobile: false }
  },
  { 
    name: "Audio Tools", 
    icon: AudioWaveform, 
    description: "Process and convert audio files",
    priority: 10,
    defaultExpanded: { desktop: false, mobile: false }
  },
  { 
    name: "Utility Tools", 
    icon: Settings, 
    description: "Essential productivity utilities",
    priority: 11,
    defaultExpanded: { desktop: false, mobile: false }
  },
  { 
    name: "Converters", 
    icon: GitCompareArrows, 
    description: "Convert between various file formats",
    priority: 12,
    defaultExpanded: { desktop: false, mobile: false }
  },
  { 
    name: "Archive Tools", 
    icon: Package, 
    description: "Compress and extract archive files",
    priority: 13,
    defaultExpanded: { desktop: false, mobile: false }
  },
  { 
    name: "Advanced Features", 
    icon: Rocket, 
    description: "Professional tools and automation",
    priority: 14,
    defaultExpanded: { desktop: false, mobile: false }
  }
];
```

## Responsive Behavior
- **Desktop (≥768px):** Top 3 categories expanded by default
- **Mobile (<768px):** All categories collapsed by default  
- **Icon Size:** 24px for category headings
- **Tool Card Icons:** 20px