
import { type LucideIcon, FileJson, PenSquare, Calculator, Timer, Image, Code, KeyRound, Type, Palette, Video, GitBranch, Database, TerminalSquare, Combine, Split, FileArchive, FileText, ArrowRightLeft, Minimize2, Crop, FileImage, ImagePlus, AudioWaveform, Scissors, Mic, Minimize, MonitorUp, BookText, StickyNote, BookUser, Regex, Archive, ScanText, QrCode, Camera, Sigma, ListOrdered, FileX, ChevronsRight, Layers, FileScan, Settings2, FileLock, Shield, Fingerprint, Files, RotateCw, PlusSquare, Droplet, Pencil, Lock, ShieldCheck, Milestone, Waypoints, RedoDot, FileSliders, FileDiff, Scaling, Paintbrush, Text, SigmaSquare, BrainCircuit, ScanSearch, FileKey, WaypointsIcon, ListTree, Tags, View, ImageDown, Speaker, FileBox, FileVideo, Package, PackageOpen, Braces, Binary, GanttChartSquare, Clipboard, Share2, Link as LinkIconLucide, Images, Trash2, EyeOff, Sparkles, Wand2, Replace, Unlink, FileSignature, ALargeSmall, Columns, Pilcrow, GanttChart, CaseSensitive, Hash, Clock, WrapText, Eraser, FileCheck, CircleDot, ShieldQuestion, Bot, SquareCode, FileTerminal, Download, UploadCloud, Blend, ImageMinus, Workflow, Bookmark, BookmarkPlus, Rows, Columns3, ScanLine, RotateCcw, BoxSelect, EraserIcon, ImageUp, SparklesIcon, PaletteIcon, PaintBucket, ReplaceIcon, StarIcon, Frame, PenTool, GitCompareArrows, UnfoldVertical, MessageSquare, Repeat, BarChart, SlidersHorizontal, Settings, FileCog, FileInput, FileOutput, Shapes, BadgePercent, Heading, List, WorkflowIcon, BookOpen, Globe, Rocket, FileSpreadsheet, Presentation, Grid3x3, Moon, Eye } from 'lucide-react';

type ToolProcessorType = 
  | 'merge-pdf'
  | 'split-pdf'
  | 'compress-pdf'
  | 'pdf-to-image'
  | 'image-to-pdf'
  | 'website-to-pdf'
  | 'standalone'
  | 'generic';

export interface Tool {
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  category: string;
  categoryIcon: LucideIcon;
  processorType: ToolProcessorType;
  isStandalone?: boolean;
  isNew?: boolean;
}

export const tools: Tool[] = [
  // Convert PDF
  { name: 'PDF to Word', description: 'Convert your PDF to an editable Word document.', icon: FileText, category: 'Convert PDF', categoryIcon: ArrowRightLeft, processorType: 'generic' },
  { name: 'PDF to Excel', description: 'Extract data from PDF tables to an Excel sheet.', icon: FileSpreadsheet, category: 'Convert PDF', categoryIcon: ArrowRightLeft, processorType: 'generic' },
  { name: 'PDF to PowerPoint', description: 'Convert your PDF to a presentation.', icon: Presentation, category: 'Convert PDF', categoryIcon: ArrowRightLeft, processorType: 'generic' },
  { name: 'PDF to JPG', description: 'Convert each PDF page into a JPG image.', icon: FileImage, category: 'Convert PDF', categoryIcon: ArrowRightLeft, processorType: 'pdf-to-image' },
  { name: 'PDF to PNG', description: 'Convert PDF pages to PNG images.', icon: FileImage, category: 'Convert PDF', categoryIcon: ArrowRightLeft, processorType: 'pdf-to-image' },
  { name: 'JPG to PDF', description: 'Convert JPG images to a single PDF file.', icon: ImageUp, category: 'Convert PDF', categoryIcon: ArrowRightLeft, processorType: 'image-to-pdf' },
  { name: 'Word to PDF', description: 'Convert Microsoft Word documents to PDF.', icon: FileText, category: 'Convert PDF', categoryIcon: ArrowRightLeft, processorType: 'generic' },
  { name: 'Excel to PDF', description: 'Convert Excel spreadsheets to PDF.', icon: FileSpreadsheet, category: 'Convert PDF', categoryIcon: ArrowRightLeft, processorType: 'generic' },
  { name: 'PPT to PDF', description: 'Convert PowerPoint presentations to PDF.', icon: Presentation, category: 'Convert PDF', categoryIcon: ArrowRightLeft, processorType: 'generic' },
  { name: 'PDF to HTML', description: 'Convert PDFs to HTML format.', icon: Code, category: 'Convert PDF', categoryIcon: ArrowRightLeft, processorType: 'generic' },

  // Edit PDF
  { name: 'Merge PDF', description: 'Combine multiple PDF files into one.', icon: Combine, category: 'Edit PDF', categoryIcon: Pencil, processorType: 'merge-pdf' },
  { name: 'Split PDF', description: 'Extract pages from a PDF file.', icon: Split, category: 'Edit PDF', categoryIcon: Pencil, processorType: 'split-pdf' },
  { name: 'Compress PDF', description: 'Reduce the file size of your PDF documents.', icon: Minimize, category: 'Edit PDF', categoryIcon: Pencil, processorType: 'compress-pdf' },
  { name: 'Delete PDF Pages', description: 'Delete one or more pages from your PDF file.', icon: Trash2, category: 'Edit PDF', categoryIcon: Pencil, processorType: 'generic' },
  { name: 'Rotate PDF', description: 'Rotate one or all pages in your PDF file.', icon: RotateCw, category: 'Edit PDF', categoryIcon: Pencil, processorType: 'generic' },
  { name: 'Reorder PDF Pages', description: 'Sort pages of your PDF file with drag & drop.', icon: Waypoints, category: 'Edit PDF', categoryIcon: Pencil, processorType: 'generic' },
  { name: 'Add PDF Pages', description: 'Insert page numbers into your PDF easily.', icon: PlusSquare, category: 'Edit PDF', categoryIcon: Pencil, processorType: 'generic' },
  { name: 'Extract Text from PDF', description: 'Extract selectable text from scanned PDFs.', icon: ScanText, category: 'Edit PDF', categoryIcon: Pencil, processorType: 'generic' },

  // Protect & Secure
  { name: 'Password Protect PDF', description: 'Add a password and encrypt your PDF file.', icon: ShieldCheck, category: 'Protect & Secure', categoryIcon: Shield, processorType: 'generic' },
  { name: 'Unlock PDF', description: 'Remove password protection from a PDF file.', icon: Lock, category: 'Protect & Secure', categoryIcon: Shield, processorType: 'generic' },
  { name: 'Watermark PDF', description: 'Stamp text or an image over your PDF.', icon: Droplet, category: 'Protect & Secure', categoryIcon: Shield, processorType: 'generic' },
  { name: 'Sign PDF', description: 'Create or apply your electronic signature to a PDF.', icon: PenTool, category: 'Protect & Secure', categoryIcon: Shield, processorType: 'generic' },
  { name: 'Encrypt PDF', description: 'Add encryption to secure your PDF.', icon: ShieldCheck, category: 'Protect & Secure', categoryIcon: Shield, processorType: 'generic' },
  { name: 'Redact PDF', description: 'Permanently black out sensitive information.', icon: FileLock, category: 'Protect & Secure', categoryIcon: Shield, processorType: 'generic' },

  // View & Organize
  { name: 'PDF Viewer', description: 'View and navigate PDF documents online.', icon: Eye, category: 'View & Organize', categoryIcon: Layers, processorType: 'generic' },
  { name: 'Organize Pages', description: 'Sort and organize PDF pages.', icon: Waypoints, category: 'View & Organize', categoryIcon: Layers, processorType: 'generic' },
  { name: 'Extract PDF Pages', description: 'Select and export specific pages from a PDF.', icon: ChevronsRight, category: 'View & Organize', categoryIcon: Layers, processorType: 'generic' },
  { name: 'Annotate PDF', description: 'Draw, highlight, and add notes to a PDF.', icon: Paintbrush, category: 'View & Organize', categoryIcon: Layers, processorType: 'generic' },
  { name: 'Bookmark PDF', description: 'Add bookmarks to navigate PDF sections.', icon: Bookmark, category: 'View & Organize', categoryIcon: Layers, processorType: 'generic' },
  { name: 'Compare PDFs', description: 'Compare two PDF files for differences.', icon: FileDiff, category: 'View & Organize', categoryIcon: Layers, processorType: 'generic' },

  // Image Tools
  { name: 'Resize Image', description: 'Crop and resize your images.', icon: Scaling, category: 'Image Tools', categoryIcon: Image, processorType: 'generic' },
  { name: 'Crop Image', description: 'Trim the edges of your images.', icon: Crop, category: 'Image Tools', categoryIcon: Image, processorType: 'generic' },
  { name: 'Convert Image', description: 'Convert images between PNG, JPG, WebP.', icon: Repeat, category: 'Image Tools', categoryIcon: Image, processorType: 'generic' },
  { name: 'Compress Image', description: 'Reduce image file sizes.', icon: Minimize2, category: 'Image Tools', categoryIcon: Image, processorType: 'generic' },
  { name: 'Rotate Image', description: 'Rotate images by 90, 180, or 270 degrees.', icon: RotateCw, category: 'Image Tools', categoryIcon: Image, processorType: 'generic' },
  { name: 'Flip Image', description: 'Flip images horizontally or vertically.', icon: GitCompareArrows, category: 'Image Tools', categoryIcon: Image, processorType: 'generic' },
  { name: 'Add Filters to Image', description: 'Apply filters and effects to images.', icon: Wand2, category: 'Image Tools', categoryIcon: Image, processorType: 'generic' },

  // Other Tools
  { name: 'Text to PDF', description: 'Convert text files to PDF.', icon: ALargeSmall, category: 'Other Tools', categoryIcon: Settings2, processorType: 'generic' },
  { name: 'HTML to PDF', description: 'Convert HTML content to PDF.', icon: Code, category: 'Other Tools', categoryIcon: Settings2, processorType: 'generic' },
  { name: 'Website to PDF', description: 'Convert any webpage into a PDF file.', icon: Globe, category: 'Other Tools', categoryIcon: Settings2, processorType: 'website-to-pdf', isStandalone: true },
  { name: 'OCR (Image to Text)', description: 'Extract text from images using OCR.', icon: ScanSearch, category: 'Other Tools', categoryIcon: Settings2, processorType: 'generic' },
  { name: 'PDF to Audio', description: 'Convert PDF text to audio.', icon: Speaker, category: 'Other Tools', categoryIcon: Settings2, processorType: 'generic' },
  { name: 'Merge Images', description: 'Combine multiple images into one.', icon: Images, category: 'Other Tools', categoryIcon: Settings2, processorType: 'generic' },
  { name: 'Split Images', description: 'Split a single image into multiple parts.', icon: Scissors, category: 'Other Tools', categoryIcon: Settings2, processorType: 'generic' },

  // Advanced Features
  { name: 'Batch Process PDFs', description: 'Process multiple PDFs at once.', icon: Workflow, category: 'Advanced Features', categoryIcon: Rocket, processorType: 'generic' },
  { name: 'API Integration', description: 'Integrate with external APIs.', icon: LinkIconLucide, category: 'Advanced Features', categoryIcon: Rocket, processorType: 'generic' },
  { name: 'Custom Templates', description: 'Create and use custom PDF templates.', icon: FileSliders, category: 'Advanced Features', categoryIcon: Rocket, processorType: 'generic' },
  { name: 'Collaboration Tools', description: 'Collaborate on PDF editing.', icon: Share2, category: 'Advanced Features', categoryIcon: Rocket, processorType: 'generic' },
  
  // Image Tools
  { name: 'Image Converter', description: 'Convert images between PNG, JPG, WebP.', icon: Repeat, category: 'Image Tools', categoryIcon: Image, processorType: 'generic' },
  { name: 'Image Compressor', description: 'Reduce image file sizes.', icon: Minimize2, category: 'Image Tools', categoryIcon: Image, processorType: 'generic' },
  { name: 'Image Resizer', description: 'Crop and resize your images.', icon: Scaling, category: 'Image Tools', categoryIcon: Image, processorType: 'generic' },
  { name: 'Photo Editor', description: 'Make basic adjustments to your photos.', icon: ImagePlus, category: 'Image Tools', categoryIcon: Image, processorType: 'generic' },
  { name: 'Background Remover', description: 'Automatically remove the background.', icon: Eraser, category: 'Image Tools', categoryIcon: Image, processorType: 'generic', isNew: true },
  { name: 'Color Palette Generator', description: 'Extract a color scheme from an image.', icon: Palette, category: 'Image Tools', categoryIcon: Image, processorType: 'generic' },

  // Video Tools
  { name: 'Video Compressor', description: 'Reduce video file sizes without losing quality.', icon: FileVideo, category: 'Video Tools', categoryIcon: Video, processorType: 'generic' },
  { name: 'Trim Video', description: 'Cut out a portion from the beginning or end.', icon: Scissors, category: 'Video Tools', categoryIcon: Video, processorType: 'generic' },
  { name: 'Video to GIF', description: 'Convert a video clip into an animated GIF.', icon: RedoDot, category: 'Video Tools', categoryIcon: Video, processorType: 'generic' },
  { name: 'Video Converter', description: 'Convert videos between formats like MP4, WebM.', icon: FileVideo, category: 'Video Tools', categoryIcon: Video, processorType: 'generic' },
  { name: 'Merge Videos', description: 'Combine multiple video clips into one.', icon: Combine, category: 'Video Tools', categoryIcon: Video, processorType: 'generic' },
  { name: 'Extract Audio from Video', description: 'Rip the audio track from a video file.', icon: AudioWaveform, category: 'Video Tools', categoryIcon: Video, processorType: 'generic' },

  // Audio Tools
  { name: 'Audio Compressor', description: 'Reduce the file size of audio files.', icon: Minimize, category: 'Audio Tools', categoryIcon: AudioWaveform, processorType: 'generic' },
  { name: 'Audio Converter', description: 'Convert audio between MP3, WAV, M4A, etc.', icon: AudioWaveform, category: 'Audio Tools', categoryIcon: AudioWaveform, processorType: 'generic' },
  { name: 'Trim Audio', description: 'Cut a section from an audio file.', icon: Scissors, category: 'Audio Tools', categoryIcon: AudioWaveform, processorType: 'generic' },
  { name: 'Merge Audio', description: 'Join multiple audio tracks into one.', icon: Combine, category: 'Audio Tools', categoryIcon: AudioWaveform, processorType: 'generic' },
  { name: 'Voice Recorder', description: 'Record audio directly from your microphone.', icon: Mic, category: 'Audio Tools', categoryIcon: AudioWaveform, processorType: 'standalone', isStandalone: true, isNew: true },
  { name: 'Text to Speech', description: 'Convert text into natural-sounding speech.', icon: Speaker, category: 'Audio Tools', categoryIcon: AudioWaveform, processorType: 'standalone', isStandalone: true, isNew: true },

  // Utility Tools
  { name: 'Password Generator', description: 'Create strong, secure passwords.', icon: KeyRound, category: 'Utility Tools', categoryIcon: TerminalSquare, processorType: 'standalone', isStandalone: true },
  { name: 'QR Code Generator', description: 'Create your own QR codes.', icon: QrCode, category: 'Utility Tools', categoryIcon: TerminalSquare, processorType: 'standalone', isStandalone: true },
  { name: 'QR Code Scanner', description: 'Scan QR codes using your camera.', icon: Camera, category: 'Utility Tools', categoryIcon: TerminalSquare, processorType: 'generic' },
  { name: 'Text Case Converter', description: 'Change text to uppercase, lowercase, title case.', icon: Type, category: 'Utility Tools', categoryIcon: TerminalSquare, processorType: 'standalone', isStandalone: true },
  { name: 'Character & Word Counter', description: 'Count characters, words, sentences.', icon: Sigma, category: 'Utility Tools', categoryIcon: TerminalSquare, processorType: 'standalone', isStandalone: true },
  { name: 'Regex Tester', description: 'Test your regular expressions in real-time.', icon: Regex, category: 'Utility Tools', categoryIcon: TerminalSquare, processorType: 'generic' },
  { name: 'Unit Converter', description: 'Convert between various units of measurement.', icon: Calculator, category: 'Utility Tools', categoryIcon: TerminalSquare, processorType: 'generic' },
  { name: 'Lorem Ipsum Generator', description: 'Generate placeholder text for your designs.', icon: BookText, category: 'Utility Tools', categoryIcon: TerminalSquare, processorType: 'generic' },
  { name: 'Stopwatch & Timer', description: 'Measure time or set a timer.', icon: Timer, category: 'Utility Tools', categoryIcon: TerminalSquare, processorType: 'standalone', isStandalone: true },
  { name: 'JSON Formatter & Validator', description: 'Beautify and validate your JSON data.', icon: FileJson, category: 'Utility Tools', categoryIcon: TerminalSquare, processorType: 'generic' },
  { name: 'Text Compare', description: 'Find the differences between two text files.', icon: FileDiff, category: 'Utility Tools', categoryIcon: TerminalSquare, processorType: 'generic' },
  { name: 'Base64 Encoder/Decoder', description: 'Encode to or decode from Base64.', icon: Binary, category: 'Utility Tools', categoryIcon: TerminalSquare, processorType: 'standalone', isStandalone: true },
  { name: 'URL Encoder/Decoder', description: 'Encode or decode URLs for safe transmission.', icon: LinkIconLucide, category: 'Utility Tools', categoryIcon: TerminalSquare, processorType: 'standalone', isStandalone: true },
  { name: 'Notepad', description: 'A simple online notepad for quick notes.', icon: StickyNote, category: 'Utility Tools', categoryIcon: TerminalSquare, processorType: 'standalone', isStandalone: true, isNew: true },

  // Converters
  { name: 'Markdown <-> HTML', description: 'Convert between Markdown and HTML.', icon: GitCompareArrows, category: 'Converters', categoryIcon: Repeat, processorType: 'standalone', isStandalone: true },
  { name: 'CSV <-> JSON', description: 'Convert between CSV and JSON formats.', icon: GitCompareArrows, category: 'Converters', categoryIcon: Repeat, processorType: 'generic' },
  { name: 'YAML <-> JSON', description: 'Convert between YAML and JSON formats.', icon: UnfoldVertical, category: 'Converters', categoryIcon: Repeat, processorType: 'generic' },

  // Archive Tools
  { name: 'Zip File Extractor', description: 'Unzip files from a compressed archive.', icon: PackageOpen, category: 'Archive Tools', categoryIcon: Package, processorType: 'generic' },
  { name: 'Create Zip File', description: 'Compress multiple files into a single ZIP archive.', icon: Package, category: 'Archive Tools', categoryIcon: Package, processorType: 'generic' },
  { name: 'PDF/ZIP Split by Size', description: 'Split large archives into smaller chunks.', icon: Split, category: 'Archive Tools', categoryIcon: Package, processorType: 'generic' },
];
