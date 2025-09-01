# Updated Tools Data Structure

## Missing Tools to Add

### Edit PDF Category - New Tools Needed
```typescript
// New tools to add to Edit PDF category
{ name: 'Edit Text in PDF', description: 'Directly modify and edit text content in PDFs.', icon: PenSquare, category: 'Edit PDF', categoryIcon: Edit, processorType: 'generic', popularity: 8 },
{ name: 'Edit Images in PDF', description: 'Replace, resize, and modify images in PDFs.', icon: ImagePlus, category: 'Edit PDF', categoryIcon: Edit, processorType: 'generic', popularity: 6 },
{ name: 'Add Text to PDF', description: 'Insert new text anywhere in your PDF document.', icon: Type, category: 'Edit PDF', categoryIcon: Edit, processorType: 'generic', popularity: 9 },
{ name: 'Add Images to PDF', description: 'Insert images into your PDF documents.', icon: ImagePlus, category: 'Edit PDF', categoryIcon: Edit, processorType: 'generic', popularity: 7 },
{ name: 'Crop PDF Pages', description: 'Trim and crop specific areas of PDF pages.', icon: Crop, category: 'Edit PDF', categoryIcon: Edit, processorType: 'generic', popularity: 5 },
{ name: 'Extract PDF Pages', description: 'Extract specific pages as separate PDF files.', icon: ChevronsRight, category: 'Edit PDF', categoryIcon: Edit, processorType: 'generic', popularity: 8 },
```

### Organize PDF Category - New Tools Needed  
```typescript
// New tools to add to Organize PDF category
{ name: 'Insert PDF Pages', description: 'Add new pages to existing PDF documents.', icon: PlusSquare, category: 'Organize PDF', categoryIcon: FolderTree, processorType: 'generic', popularity: 6 },
{ name: 'Combine Files to PDF', description: 'Merge different file types into one PDF.', icon: Combine, category: 'Organize PDF', categoryIcon: FolderTree, processorType: 'generic', popularity: 7 },
```

### Secure and share Category - New Tools Needed
```typescript
// New tools to add to Secure and share category
{ name: 'Flatten PDF', description: 'Flatten form fields and annotations permanently.', icon: Layers, category: 'Secure and share', categoryIcon: ShieldCheck, processorType: 'generic', popularity: 4 },
{ name: 'Share PDF Link', description: 'Create shareable links for your PDF documents.', icon: Share2, category: 'Secure and share', categoryIcon: ShieldCheck, processorType: 'generic', popularity: 8 },
```

### Forms Category - All New Tools
```typescript
// All new tools for Forms category
{ name: 'Create PDF Form', description: 'Build interactive forms with fillable fields.', icon: FileCheck, category: 'Forms', categoryIcon: FileCheck, processorType: 'generic', popularity: 6 },
{ name: 'Fill PDF Form', description: 'Complete and submit PDF forms electronically.', icon: Edit, category: 'Forms', categoryIcon: FileCheck, processorType: 'generic', popularity: 9 },
{ name: 'Form Field Recognition', description: 'Auto-detect and convert form fields in PDFs.', icon: ScanText, category: 'Forms', categoryIcon: FileCheck, processorType: 'generic', popularity: 5 },
{ name: 'Export Form Data', description: 'Extract form data to Excel or CSV formats.', icon: Database, category: 'Forms', categoryIcon: FileCheck, processorType: 'generic', popularity: 7 },
```

### View and read Category - New Tools Needed
```typescript
// New tools to add to View and read category
{ name: 'PDF Page Thumbnails', description: 'View all PDF pages as thumbnail grid.', icon: Grid3X3, category: 'View and read', categoryIcon: Eye, processorType: 'generic', popularity: 6 },
{ name: 'PDF Dark Mode', description: 'Switch PDF viewer to comfortable dark theme.', icon: Moon, category: 'View and read', categoryIcon: Eye, processorType: 'generic', popularity: 8 },
```

### OCR and accessibility Category - New Tools Needed
```typescript
// New tool to add to OCR and accessibility category
{ name: 'Tag PDF Structure', description: 'Add accessibility tags for screen readers.', icon: Tags, category: 'OCR and accessibility', categoryIcon: ScanText, processorType: 'generic', popularity: 4 },
```

## Tool Reorganization Map

### Tools Moving from Current Categories:

**From "Edit PDF" to "Organize PDF":**
- Merge PDF
- Split PDF  
- Delete PDF Pages
- Reorder PDF Pages

**From "Protect & Secure" to "Secure and share":**  
- Password Protect PDF
- Redact PDF
- Watermark PDF
- Sign PDF
- Encrypt PDF
- Unlock PDF

**From "View & Organize" to "View and read":**
- PDF Viewer → PDF Reader
- Organize Pages (duplicate of Reorder, remove)
- Extract PDF Pages → moves to Edit PDF
- Annotate PDF → moves to Edit PDF  
- Bookmark PDF
- Compare PDFs

**From "Other Tools" to "OCR and accessibility":**
- Extract Text from PDF → OCR Text Recognition
- PDF to Audio → PDF Read Aloud

## Updated Tool Priority System

### Most Used Tools (Popularity 9-10):
- Merge PDF (10)
- PDF to Word (10)  
- Compress PDF (9)
- Sign PDF (9)
- Add Text to PDF (9)
- Fill PDF Form (9)

### High Usage Tools (Popularity 7-8):
- Split PDF (8)
- Password Protect PDF (8)
- Extract PDF Pages (8)
- PDF Dark Mode (8)
- Share PDF Link (8)
- Edit Text in PDF (8)

### Medium Usage Tools (Popularity 5-6):
- Rotate PDF (6)
- Watermark PDF (6)
- Add Images to PDF (7)
- Combine Files to PDF (7)
- Export Form Data (7)

### Lower Usage Tools (Popularity 1-4):
- Crop PDF Pages (5)
- Form Field Recognition (5)
- PDF Page Thumbnails (6)
- Tag PDF Structure (4)
- Flatten PDF (4)

## Tool Sorting Logic
```typescript
const sortTools = (tools: Tool[]) => {
  return tools.sort((a, b) => {
    // First by popularity (most used first)
    if (b.popularity !== a.popularity) {
      return b.popularity - a.popularity;
    }
    // Then alphabetically
    return a.name.localeCompare(b.name);
  });
};