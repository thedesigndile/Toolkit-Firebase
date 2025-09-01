# Quick Actions Component Design

## Component Specification

### Layout
```
┌─────────────────────────────────────────────────────────────────────────────┐
│                            Quick Actions                                    │
├─────────────────────────────────────────────────────────────────────────────┤
│  [📄➕] Merge PDF    [📝] Convert to Word    [📦] Compress PDF    [✍️] Sign PDF  │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Technical Specifications

**Grid System:**
- Desktop: 4 columns (1fr each)
- Tablet: 2 columns, 2 rows
- Mobile: 1 column, 4 rows
- Gap: 16px between items

**Card Design:**
- Height: 80px (desktop), 70px (mobile)
- Border radius: 12px
- Background: Card background with hover effect
- Shadow: Subtle shadow with hover enhancement
- Icon size: 24px
- Typography: font-semibold, responsive sizing

**Interaction States:**
- Hover: Scale 1.02, enhanced shadow
- Focus: Ring-2 ring-primary 
- Active: Scale 0.98
- Disabled: Opacity 0.6, pointer-events none

### Component Structure
```tsx
<div className="bg-card/50 backdrop-blur-sm rounded-xl p-6 mb-8">
  <h2 className="text-xl font-semibold mb-4 text-center">Quick Actions</h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
    {quickActions.map(action => (
      <QuickActionCard key={action.name} action={action} />
    ))}
  </div>
</div>
```

## Quick Actions Data
```tsx
const QUICK_ACTIONS = [
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