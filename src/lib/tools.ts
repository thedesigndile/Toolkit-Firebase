import { type LucideIcon, FileJson, PenSquare, Calculator, Timer, Image, Code, KeyRound, Type, Palette, Video, GitBranch, Database, TerminalSquare, Combine, Split, FileArchive, FileText, ArrowRightLeft, Minimize2, Crop, FileImage, ImagePlus, AudioWaveform, Scissors, Mic, Minimize, MonitorUp, BookText, StickyNote, BookUser, Regex, Archive, ScanText, QrCode, Camera, Sigma, ListOrdered, FileX, ChevronsRight, Layers, FileScan, Settings2, FileLock, Shield, Fingerprint, Files, RotateCw, PlusSquare, Droplet, Pencil, Lock, ShieldCheck, Milestone, Waypoints, RedoDot, FileSliders, FileDiff, Scaling, Paintbrush, Text, SigmaSquare, BrainCircuit, ScanSearch, FileKey, WaypointsIcon, ListTree, Tags, View, ImageDown, Speaker, FileBox, FileVideo } from 'lucide-react';
import {
  MergePdfIcon,
  SplitPdfIcon,
  CompressPdfIcon,
  PdfToWordIcon,
  PdfToPowerpointIcon,
  PdfToExcelIcon,
  WordToPdfIcon,
  PowerpointToPdfIcon,
  ExcelToPdfIcon,
  EditPdfIcon,
  PdfToJpgIcon,
  SignPdfIcon,
  WatermarkIcon,
  RotatePdfIcon,
} from '@/components/tool-icons';

export interface Tool {
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  category: string;
  categoryIcon: LucideIcon;
  isStandalone?: boolean;
}

export const tools: Tool[] = [
  // Organize PDF
  { name: 'Merge PDF', description: 'Combine multiple PDF files into one.', icon: MergePdfIcon, category: 'Organize PDF', categoryIcon: Layers },
  { name: 'Split PDF', description: 'Extract pages from a PDF file.', icon: SplitPdfIcon, category: 'Organize PDF', categoryIcon: Layers },
  { name: 'Remove Pages', description: 'Delete one or more pages from your PDF file.', icon: FileX, category: 'Organize PDF', categoryIcon: Layers },
  { name: 'Extract Pages', description: 'Select and export specific pages from a PDF.', icon: ChevronsRight, category: 'Organize PDF', categoryIcon: Layers },
  { name: 'Reorder Pages', description: 'Sort pages of your PDF file with drag & drop.', icon: Waypoints, category: 'Organize PDF', categoryIcon: Layers },
  { name: 'Scan to PDF', description: 'Use your camera to scan documents into a PDF.', icon: FileScan, category: 'Organize PDF', categoryIcon: Layers },
  { name: 'Combine PDFs and Images', description: 'Mix and match PDFs and image files into one PDF.', icon: Files, category: 'Organize PDF', categoryIcon: Layers },

  // Optimize PDF
  { name: 'Compress PDF', description: 'Reduce the file size of your PDF documents.', icon: CompressPdfIcon, category: 'Optimize PDF', categoryIcon: Settings2 },
  { name: 'Repair PDF', description: 'Attempt to fix and recover data from a corrupted PDF.', icon: Settings2, category: 'Optimize PDF', categoryIcon: Settings2 },
  { name: 'OCR PDF', description: 'Extract selectable text from scanned PDFs.', icon: ScanText, category: 'Optimize PDF', categoryIcon: Settings2 },
  { name: 'Flatten PDF', description: 'Make PDF forms and annotations un-editable.', icon: FileSliders, category: 'Optimize PDF', categoryIcon: Settings2 },
  
  // Convert PDF
  { name: 'PDF to Word', description: 'Convert your PDF to an editable Word document.', icon: PdfToWordIcon, category: 'Convert PDF', categoryIcon: ArrowRightLeft },
  { name: 'Word to PDF', description: 'Convert Microsoft Word documents to PDF.', icon: WordToPdfIcon, category: 'Convert PDF', categoryIcon: ArrowRightLeft },
  { name: 'PDF to JPG', description: 'Convert each PDF page into a JPG image.', icon: PdfToJpgIcon, category: 'Convert PDF', categoryIcon: ArrowRightLeft },
  { name: 'JPG to PDF', description: 'Convert JPG images to a single PDF file.', icon: PdfToJpgIcon, category: 'Convert PDF', categoryIcon: ArrowRightLeft },
  { name: 'PNG to PDF', description: 'Convert PNG images to a single PDF file.', icon: FileImage, category: 'Convert PDF', categoryIcon: ArrowRightLeft },
  { name: 'PowerPoint to PDF', description: 'Convert PowerPoint presentations to PDF.', icon: PowerpointToPdfIcon, category: 'Convert PDF', categoryIcon: ArrowRightLeft },
  { name: 'Excel to PDF', description: 'Convert Excel spreadsheets to PDF.', icon: ExcelToPdfIcon, category: 'Convert PDF', categoryIcon: ArrowRightLeft },
  { name: 'HTML to PDF', description: 'Convert webpages to PDF documents.', icon: Code, category: 'Convert PDF', categoryIcon: ArrowRightLeft },
  { name: 'TXT/Markdown to PDF', description: 'Convert plain text or Markdown to PDF.', icon: Text, category: 'Convert PDF', categoryIcon: ArrowRightLeft },
  { name: 'EPUB to PDF', description: 'Convert EPUB e-books to PDF format.', icon: BookText, category: 'Convert PDF', categoryIcon: ArrowRightLeft },
  { name: 'PDF to PNG', description: 'Convert each PDF page into a PNG image.', icon: Image, category: 'Convert PDF', categoryIcon: ArrowRightLeft },
  { name: 'PDF to PowerPoint', description: 'Convert your PDF to a presentation.', icon: PdfToPowerpointIcon, category: 'Convert PDF', categoryIcon: ArrowRightLeft },
  { name: 'PDF to Excel', description: 'Extract data from PDF tables to an Excel sheet.', icon: PdfToExcelIcon, category: 'Convert PDF', categoryIcon: ArrowRightLeft },
  { name: 'PDF to HTML', description: 'Convert your PDF to a web page.', icon: Code, category: 'Convert PDF', categoryIcon: ArrowRightLeft },
  { name: 'PDF to TXT/Markdown', description: 'Extract text from your PDF.', icon: Text, category: 'Convert PDF', categoryIcon: ArrowRightLeft },
  { name: 'PDF to PDF/A', description: 'Convert your PDF to the ISO-standardized PDF/A format.', icon: Archive, category: 'Convert PDF', categoryIcon: ArrowRightLeft },
  { name: 'PDF to EPUB', description: 'Convert your PDF to the EPUB e-book format.', icon: BookText, category: 'Convert PDF', categoryIcon: ArrowRightLeft },

  // Edit PDF
  { name: 'Rotate PDF', description: 'Rotate one or all pages in your PDF file.', icon: RotatePdfIcon, category: 'Edit PDF', categoryIcon: Pencil },
  { name: 'Add Page Numbers', description: 'Insert page numbers into your PDF easily.', icon: ListOrdered, category: 'Edit PDF', categoryIcon: Pencil },
  { name: 'Add Watermark', description: 'Stamp text or an image over your PDF.', icon: WatermarkIcon, category: 'Edit PDF', categoryIcon: Pencil },
  { name: 'Crop PDF', description: 'Trim the margins of your PDF pages.', icon: Crop, category: 'Edit PDF', categoryIcon: Pencil },
  { name: 'Draw/Annotate PDF', description: 'Draw, highlight, and add notes to a PDF.', icon: Paintbrush, category: 'Edit PDF', categoryIcon: Pencil },
  { name: 'Insert Text, Shapes, Images', description: 'Add new content to your PDF files.', icon: PlusSquare, category: 'Edit PDF', categoryIcon: Pencil },
  { name: 'Fill & Edit PDF Forms', description: 'Edit and fill out AcroForms and XFA forms.', icon: EditPdfIcon, category: 'Edit PDF', categoryIcon: Pencil },

  // PDF Security
  { name: 'Unlock PDF', description: 'Remove password protection from a PDF file.', icon: Lock, category: 'PDF Security', categoryIcon: Shield },
  { name: 'Protect PDF', description: 'Add a password and encrypt your PDF file.', icon: ShieldCheck, category: 'PDF Security', categoryIcon: Shield },
  { name: 'Sign PDF', description: 'Create or apply your electronic signature to a PDF.', icon: SignPdfIcon, category: 'PDF Security', categoryIcon: Shield },
  { name: 'Redact PDF', description: 'Permanently black out sensitive information.', icon: FileLock, category: 'PDF Security', categoryIcon: Shield },
  { name: 'Compare PDFs', description: 'Show the differences between two PDF files.', icon: FileDiff, category: 'PDF Security', categoryIcon: Shield },
  { name: 'Metadata Cleaner', description: 'Remove hidden data and personal information.', icon: FileKey, category: 'PDF Security', categoryIcon: Shield },

  // Extra Tools
  { name: 'PDF Translator', description: 'Translate text in a PDF using offline models.', icon: BrainCircuit, category: 'Extra Tools', categoryIcon: SigmaSquare },
  { name: 'PDF Split by Bookmarks', description: 'Split a single PDF into multiple files by bookmarks.', icon: ListTree, category: 'Extra Tools', categoryIcon: SigmaSquare },
  { name: 'Batch PDF Processor', description: 'Apply an action to multiple PDF files at once.', icon: WaypointsIcon, category: 'Extra Tools', categoryIcon: SigmaSquare },
  { name: 'PDF Metadata Editor', description: 'Edit title, author, subject, and keywords.', icon: Tags, category: 'Extra Tools', categoryIcon: SigmaSquare },
  { name: 'Dark Mode PDF Viewer', description: 'View PDFs in dark mode with search.', icon: View, category: 'Extra Tools', categoryIcon: SigmaSquare },
  { name: 'PDF to Image Slideshow', description: 'Convert PDF pages into a slideshow.', icon: ImageDown, category: 'Extra Tools', categoryIcon: SigmaSquare },
  { name: 'Extract Attachments from PDF', description: 'Extract embedded files from a PDF.', icon: FileBox, category: 'Extra Tools', categoryIcon: SigmaSquare },
  { name: 'PDF Page Label Editor', description: 'Add custom page labels like "i, ii, 1, 2".', icon: BookUser, category: 'Extra Tools', categoryIcon: SigmaSquare },
  { name: 'PDF Stamp Tool', description: 'Add stamps like "Approved" or "Confidential".', icon: StickyNote, category: 'Extra Tools', categoryIcon: SigmaSquare },
  
  // Image Tools
  { name: 'Image Converter', description: 'Convert images between PNG, JPG, WebP.', icon: ArrowRightLeft, category: 'Image Tools', categoryIcon: Image },
  { name: 'Image Compressor', description: 'Reduce image file sizes.', icon: Minimize2, category: 'Image Tools', categoryIcon: Image },
  { name: 'Image Resizer', description: 'Crop and resize your images.', icon: Crop, category: 'Image Tools', categoryIcon: Image },
  { name: 'Image Upscaler', description: 'Increase image resolution with AI.', icon: Scaling, category: 'Image Tools', categoryIcon: Image },
  { name: 'Photo Editor', description: 'Make basic adjustments to your photos.', icon: ImagePlus, category: 'Image Tools', categoryIcon: Image },

  // Video Tools
  { name: 'Video Compressor', description: 'Reduce video file sizes without losing quality.', icon: FileVideo, category: 'Video Tools', categoryIcon: Video },


  // Utility Tools
  { name: 'Password Generator', description: 'Create strong, secure passwords.', icon: KeyRound, category: 'Utility Tools', categoryIcon: TerminalSquare, isStandalone: true },
  { name: 'QR Code Generator', description: 'Create your own QR codes.', icon: QrCode, category: 'Utility Tools', categoryIcon: TerminalSquare },
  { name: 'QR Code Scanner', description: 'Scan QR codes using your camera.', icon: Camera, category: 'Utility Tools', categoryIcon: TerminalSquare },
];
