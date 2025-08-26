import { type LucideIcon, FileJson, PenSquare, Calculator, Timer, Image, Code, KeyRound, Type, Palette, Video, GitBranch, Database, TerminalSquare, Combine, Split, FileArchive, FileText, ArrowRightLeft, Minimize2, Crop, FileImage, ImagePlus, AudioWaveform, Scissors, Mic, Minimize, MonitorUp, BookText, StickyNote, BookUser, Regex, Archive, ScanText, QrCode, Camera, Sigma, ListOrdered, FileX, ChevronsRight, Layers, FileScan, Settings2, FileLock, Shield, Fingerprint, Files, RotateCw, PlusSquare, Droplet, Pencil, Lock, ShieldCheck, Milestone, Waypoints, RedoDot, FileSliders, FileDiff } from 'lucide-react';

export interface Tool {
  name: string;
  description: string;
  icon: LucideIcon;
  category: string;
  categoryIcon: LucideIcon;
  isStandalone?: boolean;
}

export const tools: Tool[] = [
  // Organize PDF
  { name: 'Merge PDF', description: 'Combine multiple PDF files into one.', icon: Combine, category: 'Organize PDF', categoryIcon: Layers },
  { name: 'Split PDF', description: 'Extract pages from a PDF or save each page as a separate file.', icon: Split, category: 'Organize PDF', categoryIcon: Layers },
  { name: 'Remove pages', description: 'Delete one or more pages from your PDF file.', icon: FileX, category: 'Organize PDF', categoryIcon: Layers },
  { name: 'Extract pages', description: 'Select and export specific pages from a PDF.', icon: ChevronsRight, category: 'Organize PDF', categoryIcon: Layers },
  { name: 'Organize PDF', description: 'Sort, add, and delete PDF pages in our editor.', icon: Layers, category: 'Organize PDF', categoryIcon: Layers },
  { name: 'Scan to PDF', description: 'Use your camera to scan documents into a PDF.', icon: FileScan, category: 'Organize PDF', categoryIcon: Layers },

  // Optimize PDF
  { name: 'Compress PDF', description: 'Reduce the file size of your PDF documents.', icon: FileArchive, category: 'Optimize PDF', categoryIcon: Settings2 },
  { name: 'Repair PDF', description: 'Attempt to fix and recover data from a corrupted PDF.', icon: Settings2, category: 'Optimize PDF', categoryIcon: Settings2 },
  { name: 'OCR PDF', description: 'Make a scanned PDF searchable and selectable.', icon: ScanText, category: 'Optimize PDF', categoryIcon: Settings2 },

  // Convert to PDF
  { name: 'JPG to PDF', description: 'Convert JPG images to a single PDF file.', icon: FileImage, category: 'Convert to PDF', categoryIcon: ArrowRightLeft },
  { name: 'WORD to PDF', description: 'Convert Microsoft Word documents to PDF.', icon: FileText, category: 'Convert to PDF', categoryIcon: ArrowRightLeft },
  { name: 'POWERPOINT to PDF', description: 'Convert PowerPoint presentations to PDF.', icon: FileText, category: 'Convert to PDF', categoryIcon: ArrowRightLeft },
  { name: 'EXCEL to PDF', description: 'Convert Excel spreadsheets to PDF.', icon: FileText, category: 'Convert to PDF', categoryIcon: ArrowRightLeft },
  { name: 'HTML to PDF', description: 'Convert webpages to PDF documents.', icon: Code, category: 'Convert to PDF', categoryIcon: ArrowRightLeft },

  // Convert from PDF
  { name: 'PDF to JPG', description: 'Extract all images from a PDF or convert each page to JPG.', icon: Image, category: 'Convert from PDF', categoryIcon: ArrowRightLeft },
  { name: 'PDF to WORD', description: 'Convert your PDF to an editable Word document.', icon: RedoDot, category: 'Convert from PDF', categoryIcon: ArrowRightLeft },
  { name: 'PDF to POWERPOINT', description: 'Convert your PDF to an editable PowerPoint presentation.', icon: RedoDot, category: 'Convert from PDF', categoryIcon: ArrowRightLeft },
  { name: 'PDF to EXCEL', description: 'Extract data from PDF tables to an Excel spreadsheet.', icon: RedoDot, category: 'Convert from PDF', categoryIcon: ArrowRightLeft },
  { name: 'PDF to PDF/A', description: 'Convert your PDF to the ISO-standardized PDF/A format.', icon: FileSliders, category: 'Convert from PDF', categoryIcon: ArrowRightLeft },

  // Edit PDF
  { name: 'Rotate PDF', description: 'Rotate one or all pages in your PDF file.', icon: RotateCw, category: 'Edit PDF', categoryIcon: Pencil },
  { name: 'Add page numbers', description: 'Insert page numbers into your PDF easily.', icon: ListOrdered, category: 'Edit PDF', categoryIcon: Pencil },
  { name: 'Add watermark', description: 'Stamp text or an image over your PDF.', icon: Droplet, category: 'Edit PDF', categoryIcon: Pencil },
  { name: 'Crop PDF', description: 'Trim the margins of your PDF pages.', icon: Crop, category: 'Edit PDF', categoryIcon: Pencil },
  { name: 'Edit PDF', description: 'Add text, images, and annotations to a PDF.', icon: Pencil, category: 'Edit PDF', categoryIcon: Pencil },

  // PDF Security
  { name: 'Unlock PDF', description: 'Remove password protection from a PDF file.', icon: Lock, category: 'PDF Security', categoryIcon: Shield },
  { name: 'Protect PDF', description: 'Add a password and encrypt your PDF file.', icon: ShieldCheck, category: 'PDF Security', categoryIcon: Shield },
  { name: 'Sign PDF', description: 'Create or apply your electronic signature to a PDF.', icon: Milestone, category: 'PDF Security', categoryIcon: Shield },
  { name: 'Redact PDF', description: 'Permanently black out sensitive information.', icon: FileLock, category: 'PDF Security', categoryIcon: Shield },
  { name: 'Compare PDF', description: 'Show the differences between two PDF files.', icon: FileDiff, category: 'PDF Security', categoryIcon: Shield },

  // Image Tools
  { name: 'Image Converter', description: 'Convert images between PNG, JPG, WebP.', icon: ArrowRightLeft, category: 'Image Tools', categoryIcon: Image },
  { name: 'Image Compressor', description: 'Reduce image file sizes.', icon: Minimize2, category: 'Image Tools', categoryIcon: Image },
  { name: 'Image Resizer', description: 'Crop and resize your images.', icon: Crop, category: 'Image Tools', categoryIcon: Image },
  { name: 'Photo Editor', description: 'Make basic adjustments to your photos.', icon: ImagePlus, category: 'Image Tools', categoryIcon: Image },

  // Utility Tools
  { name: 'Password Generator', description: 'Create strong, secure passwords.', icon: KeyRound, category: 'Utility Tools', categoryIcon: TerminalSquare, isStandalone: true },
  { name: 'QR Code Generator', description: 'Create your own QR codes.', icon: QrCode, category: 'Utility Tools', categoryIcon: TerminalSquare },
  { name: 'QR Code Scanner', description: 'Scan QR codes using your camera.', icon: Camera, category: 'Utility Tools', categoryIcon: TerminalSquare },
];

export const featuredTools = tools.slice(0, 5);
