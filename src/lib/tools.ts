import { type LucideIcon, FileJson, PenSquare, Calculator, Timer, Image, Code, KeyRound, FileCog, Type, Palette, Video, GitBranch, Database, TerminalSquare, Combine, Split, FileArchive, FileText, ArrowRightLeft, Minimize2, Crop, FileImage, ImagePlus, AudioWaveform, Scissors, Mic, Minimize, MonitorUp, BookText, StickyNote, BookUser, Regex, Archive, ScanText, QrCode, Camera, Sigma, ListOrdered, FileX, ChevronsRight, Layers, FileScan, Settings2, FileLock, Shield, Fingerprint, Files, RotateCw, PlusSquare, Droplet, Pencil, Lock, ShieldCheck, Milestone, Waypoints, RedoDot, FileSliders, FileDiff } from 'lucide-react';

export interface Tool {
  name: string;
  description: string;
  icon: LucideIcon;
  category: string;
  isStandalone?: boolean;
}

export const tools: Tool[] = [
  // PDF Tools
  { name: 'Merge PDF', description: 'Combine multiple PDF files into one.', icon: Combine, category: 'PDF Tools' },
  { name: 'Split PDF', description: 'Split a single PDF into multiple files.', icon: Split, category: 'PDF Tools' },
  { name: 'Remove pages', description: 'Delete pages from a PDF file.', icon: FileX, category: 'PDF Tools' },
  { name: 'Extract pages', description: 'Extract specific pages from a PDF.', icon: ChevronsRight, category: 'PDF Tools' },
  { name: 'Organize PDF', description: 'Reorder pages in a PDF document.', icon: Layers, category: 'PDF Tools' },
  { name: 'Scan to PDF', description: 'Scan documents directly to PDF.', icon: FileScan, category: 'PDF Tools' },
  { name: 'Compress PDF', description: 'Reduce the file size of your PDFs.', icon: FileArchive, category: 'PDF Tools' },
  { name: 'Repair PDF', description: 'Fix corrupted or damaged PDF files.', icon: Settings2, category: 'PDF Tools' },
  { name: 'OCR PDF', description: 'Recognize and extract text from scanned PDFs.', icon: ScanText, category: 'PDF Tools' },
  { name: 'JPG to PDF', description: 'Convert JPG images to PDF documents.', icon: FileImage, category: 'PDF Tools' },
  { name: 'WORD to PDF', description: 'Convert Word documents to PDF files.', icon: FileText, category: 'PDF Tools' },
  { name: 'POWERPOINT to PDF', description: 'Save Powerpoint presentations as PDFs.', icon: FileText, category: 'PDF Tools' },
  { name: 'EXCEL to PDF', description: 'Convert Excel spreadsheets to PDFs.', icon: FileText, category: 'PDF Tools' },
  { name: 'HTML to PDF', description: 'Convert web pages to PDF documents.', icon: FileText, category: 'PDF Tools' },
  { name: 'PDF to JPG', description: 'Convert PDF pages to JPG images.', icon: Image, category: 'PDF Tools' },
  { name: 'PDF to WORD', description: 'Convert PDFs to editable Word files.', icon: RedoDot, category: 'PDF Tools' },
  { name: 'PDF to POWERPOINT', description: 'Convert PDFs to Powerpoint slides.', icon: RedoDot, category: 'PDF Tools' },
  { name: 'PDF to EXCEL', description: 'Extract data from PDFs to Excel.', icon: RedoDot, category: 'PDF Tools' },
  { name: 'PDF to PDF/A', description: 'Convert PDFs to the PDF/A format for archiving.', icon: FileSliders, category: 'PDF Tools' },
  { name: 'Rotate PDF', description: 'Rotate pages in a PDF file.', icon: RotateCw, category: 'PDF Tools' },
  { name: 'Add page numbers', description: 'Insert page numbers into your PDF.', icon: ListOrdered, category: 'PDF Tools' },
  { name: 'Add watermark', description: 'Stamp an image or text over your PDF.', icon: Droplet, category: 'PDF Tools' },
  { name: 'Crop PDF', description: 'Trim the margins of PDF pages.', icon: Crop, category: 'PDF Tools' },
  { name: 'Edit PDF', description: 'Modify the content of a PDF.', icon: Pencil, category: 'PDF Tools' },
  { name: 'Unlock PDF', description: 'Remove password protection from a PDF.', icon: Lock, category: 'PDF Tools' },
  { name: 'Protect PDF', description: 'Add a password to protect your PDF.', icon: ShieldCheck, category: 'PDF Tools' },
  { name: 'Sign PDF', description: 'Add your signature to a PDF document.', icon: Milestone, category: 'PDF Tools' },
  { name: 'Redact PDF', description: 'Permanently remove sensitive content.', icon: FileLock, category: 'PDF Tools' },
  { name: 'Compare PDF', description: 'Compare two PDF files for differences.', icon: FileDiff, category: 'PDF Tools' },
  
  // Image Tools
  { name: 'Image Converter', description: 'Convert images between PNG, JPG, WebP.', icon: ArrowRightLeft, category: 'Image Tools' },
  { name: 'Image Compressor', description: 'Reduce image file sizes.', icon: Minimize2, category: 'Image Tools' },
  { name: 'Image Resizer', description: 'Crop and resize your images.', icon: Crop, category: 'Image Tools' },
  { name: 'Image to PDF', description: 'Convert images into a PDF file.', icon: FileImage, category: 'Image Tools' },
  { name: 'Photo Editor', description: 'Make basic adjustments to your photos.', icon: ImagePlus, category: 'Image Tools' },

  // Audio Tools
  { name: 'Audio Converter', description: 'Convert between MP3, WAV, and OGG.', icon: AudioWaveform, category: 'Audio Tools' },
  { name: 'Audio Cutter', description: 'Trim and join audio files.', icon: Scissors, category: 'Audio Tools' },
  { name: 'Voice Recorder', description: 'Record audio directly from your mic.', icon: Mic, category: 'Audio Tools' },

  // Video Tools
  { name: 'Video Converter', description: 'Convert video files between formats.', icon: Video, category: 'Video Tools' },
  { name: 'Video Compressor', description: 'Reduce the file size of your videos.', icon: Minimize, category: 'Video Tools' },
  { name: 'Video Trimmer', description: 'Cut and join video clips.', icon: Scissors, category: 'Video Tools' },
  { name: 'Screen Recorder', description: 'Record your screen offline.', icon: MonitorUp, category: 'Video Tools' },

  // Text & Writing Tools
  { name: 'Text Editor', description: 'A simple offline text editor.', icon: PenSquare, category: 'Text & Writing Tools' },
  { name: 'Markdown Editor', description: 'Write in Markdown with a live preview.', icon: Type, category: 'Text & Writing Tools' },
  { name: 'Notes App', description: 'Organize your thoughts and ideas.', icon: StickyNote, category: 'Text & Writing Tools' },
  { name: 'Offline Diary', description: 'Keep a private, offline journal.', icon: BookUser, category: 'Text & Writing Tools' },

  // Coding & Dev Tools
  { name: 'Code Editor', description: 'Lightweight editor for HTML, CSS, JS.', icon: Code, category: 'Coding & Dev Tools' },
  { name: 'JSON Formatter', description: 'View and format JSON files.', icon: FileJson, category: 'Coding & Dev Tools' },
  { name: 'Regex Tester', description: 'Test your regular expressions.', icon: Regex, category: 'Coding & Dev Tools' },

  // Utility Tools
  { name: 'Zip/Unzip Tool', description: 'Manage your compressed files.', icon: Archive, category: 'Utility Tools' },
  { name: 'OCR Tool', description: 'Extract text from images.', icon: ScanText, category: 'Utility Tools' },
  { name: 'QR Code Generator', description: 'Create your own QR codes.', icon: QrCode, category: 'Utility Tools' },
  { name: 'QR Code Scanner', description: 'Scan QR codes using your camera.', icon: Camera, category: 'Utility Tools' },
  { name: 'Calculator', description: 'Calculator with unit conversions.', icon: Calculator, category: 'Utility Tools' },
  { name: 'Password Generator', description: 'Create strong, secure passwords.', icon: KeyRound, category: 'Utility Tools', isStandalone: true },
];

export const featuredTools = tools.slice(0, 5);
