import { type LucideIcon, FileJson, PenSquare, Calculator, Timer, Image, Code, KeyRound, Type, Palette, Video, GitBranch, Database, TerminalSquare, Combine, Split, FileArchive, FileText, ArrowRightLeft, Minimize2, Crop, FileImage, ImagePlus, AudioWaveform, Scissors, Mic, Minimize, MonitorUp, BookText, StickyNote, BookUser, Regex, Archive, ScanText, QrCode, Camera, Sigma, ListOrdered, FileX, ChevronsRight, Layers, FileScan, Settings2, FileLock, Shield, Fingerprint, Files, RotateCw, PlusSquare, Droplet, Pencil, Lock, ShieldCheck, Milestone, Waypoints, RedoDot, FileSliders, FileDiff } from 'lucide-react';

export interface Tool {
  name: string;
  description: string;
  icon: LucideIcon;
  category: string;
  isStandalone?: boolean;
}

export const tools: Tool[] = [
  // Organize PDF
  { name: 'Merge PDF', description: 'Combine multiple PDF files into one.', icon: Combine, category: 'Organize PDF' },
  { name: 'Split PDF', description: 'Extract pages from a PDF or save each page as a separate file.', icon: Split, category: 'Organize PDF' },
  { name: 'Remove pages', description: 'Delete one or more pages from your PDF file.', icon: FileX, category: 'Organize PDF' },
  { name: 'Extract pages', description: 'Select and export specific pages from a PDF.', icon: ChevronsRight, category: 'Organize PDF' },
  { name: 'Organize PDF', description: 'Sort, add, and delete PDF pages in our editor.', icon: Layers, category: 'Organize PDF' },
  { name: 'Scan to PDF', description: 'Use your camera to scan documents into a PDF.', icon: FileScan, category: 'Organize PDF' },

  // Optimize PDF
  { name: 'Compress PDF', description: 'Reduce the file size of your PDF documents.', icon: FileArchive, category: 'Optimize PDF' },
  { name: 'Repair PDF', description: 'Attempt to fix and recover data from a corrupted PDF.', icon: Settings2, category: 'Optimize PDF' },
  { name: 'OCR PDF', description: 'Make a scanned PDF searchable and selectable.', icon: ScanText, category: 'Optimize PDF' },

  // Convert to PDF
  { name: 'JPG to PDF', description: 'Convert JPG images to a single PDF file.', icon: FileImage, category: 'Convert to PDF' },
  { name: 'WORD to PDF', description: 'Convert Microsoft Word documents to PDF.', icon: FileText, category: 'Convert to PDF' },
  { name: 'POWERPOINT to PDF', description: 'Convert PowerPoint presentations to PDF.', icon: FileText, category: 'Convert to PDF' },
  { name: 'EXCEL to PDF', description: 'Convert Excel spreadsheets to PDF.', icon: FileText, category: 'Convert to PDF' },
  { name: 'HTML to PDF', description: 'Convert webpages to PDF documents.', icon: Code, category: 'Convert to PDF' },

  // Convert from PDF
  { name: 'PDF to JPG', description: 'Extract all images from a PDF or convert each page to JPG.', icon: Image, category: 'Convert from PDF' },
  { name: 'PDF to WORD', description: 'Convert your PDF to an editable Word document.', icon: RedoDot, category: 'Convert from PDF' },
  { name: 'PDF to POWERPOINT', description: 'Convert your PDF to an editable PowerPoint presentation.', icon: RedoDot, category: 'Convert from PDF' },
  { name: 'PDF to EXCEL', description: 'Extract data from PDF tables to an Excel spreadsheet.', icon: RedoDot, category: 'Convert from PDF' },
  { name: 'PDF to PDF/A', description: 'Convert your PDF to the ISO-standardized PDF/A format.', icon: FileSliders, category: 'Convert from PDF' },

  // Edit PDF
  { name: 'Rotate PDF', description: 'Rotate one or all pages in your PDF file.', icon: RotateCw, category: 'Edit PDF' },
  { name: 'Add page numbers', description: 'Insert page numbers into your PDF easily.', icon: ListOrdered, category: 'Edit PDF' },
  { name: 'Add watermark', description: 'Stamp text or an image over your PDF.', icon: Droplet, category: 'Edit PDF' },
  { name: 'Crop PDF', description: 'Trim the margins of your PDF pages.', icon: Crop, category: 'Edit PDF' },
  { name: 'Edit PDF', description: 'Add text, images, and annotations to a PDF.', icon: Pencil, category: 'Edit PDF' },

  // PDF Security
  { name: 'Unlock PDF', description: 'Remove password protection from a PDF file.', icon: Lock, category: 'PDF Security' },
  { name: 'Protect PDF', description: 'Add a password and encrypt your PDF file.', icon: ShieldCheck, category: 'PDF Security' },
  { name: 'Sign PDF', description: 'Create or apply your electronic signature to a PDF.', icon: Milestone, category: 'PDF Security' },
  { name: 'Redact PDF', description: 'Permanently black out sensitive information.', icon: FileLock, category: 'PDF Security' },
  { name: 'Compare PDF', description: 'Show the differences between two PDF files.', icon: FileDiff, category: 'PDF Security' },

  // Image Tools
  { name: 'Image Converter', description: 'Convert images between PNG, JPG, WebP.', icon: ArrowRightLeft, category: 'Image Tools' },
  { name: 'Image Compressor', description: 'Reduce image file sizes.', icon: Minimize2, category: 'Image Tools' },
  { name: 'Image Resizer', description: 'Crop and resize your images.', icon: Crop, category: 'Image Tools' },
  { name: 'Photo Editor', description: 'Make basic adjustments to your photos.', icon: ImagePlus, category: 'Image Tools' },

  // Utility Tools
  { name: 'Password Generator', description: 'Create strong, secure passwords.', icon: KeyRound, category: 'Utility Tools', isStandalone: true },
  { name: 'QR Code Generator', description: 'Create your own QR codes.', icon: QrCode, category: 'Utility Tools' },
  { name: 'QR Code Scanner', description: 'Scan QR codes using your camera.', icon: Camera, category: 'Utility Tools' },
];

export const featuredTools = tools.slice(0, 5);
