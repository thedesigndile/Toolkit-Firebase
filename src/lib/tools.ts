import { type LucideIcon, FileJson, PenSquare, Calculator, Timer, Image, Code, KeyRound, Type, Palette, Video, GitBranch, Database, TerminalSquare, Combine, Split, FileArchive, FileText, ArrowRightLeft, Minimize2, Crop, FileImage, ImagePlus, AudioWaveform, Scissors, Mic, Minimize, MonitorUp, BookText, StickyNote, BookUser, Regex, Archive, ScanText, QrCode, Camera, Sigma, ListOrdered, FileX, ChevronsRight, Layers, FileScan, Settings2, FileLock, Shield, Fingerprint, Files, RotateCw, PlusSquare, Droplet, Pencil, Lock, ShieldCheck, Milestone, Waypoints, RedoDot, FileSliders, FileDiff, Scaling, Paintbrush, Text, SigmaSquare, BrainCircuit, ScanSearch, FileKey, WaypointsIcon, ListTree, Tags, View, ImageDown, Speaker, FileBox, FileVideo, Package, PackageOpen, Braces, Binary, GanttChartSquare, Clipboard, Share2, Link as LinkIconLucide, Images, Trash2, EyeOff, Sparkles, Wand2, Replace, Link, Book, Unlink, FileSignature, ALargeSmall, Columns, Pilcrow, GanttChart, CaseSensitive, Hash, Clock, WrapText, Eraser, FileCheck, CircleDot, ShieldQuestion, Bot, SquareCode, FileTerminal, Download, UploadCloud, Blend, ImageMinus, Workflow, Bookmark, BookmarkPlus, Rows, Columns3, ScanLine, RotateCcw, BoxSelect, EraserIcon, ImageUp, SparklesIcon, PaletteIcon, PaintBucket, ReplaceIcon, StarIcon, Frame, PenTool, GitCompareArrows, UnfoldVertical, MessageSquare, Repeat, BarChart, SlidersHorizontal, Settings, FileCog, FileInput, FileOutput, Shapes, BadgePercent, Heading, List, WorkflowIcon } from 'lucide-react';
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
  LinkIcon,
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
  { name: 'Delete Duplicate Pages', description: 'Auto-detect & remove identical pages.', icon: Trash2, category: 'Organize PDF', categoryIcon: Layers },
  { name: 'Extract Pages', description: 'Select and export specific pages from a PDF.', icon: ChevronsRight, category: 'Organize PDF', categoryIcon: Layers },
  { name: 'Reorder Pages', description: 'Sort pages of your PDF file with drag & drop.', icon: Waypoints, category: 'Organize PDF', categoryIcon: Layers },
  { name: 'Scan to PDF', description: 'Use your camera to scan documents into a PDF.', icon: FileScan, category: 'Organize PDF', categoryIcon: Layers },
  { name: 'Combine PDFs and Images', description: 'Mix and match PDFs and image files into one PDF.', icon: Files, category: 'Organize PDF', categoryIcon: Layers },
  { name: 'PDF Page Size Changer', description: 'Change page formats to A4, Letter, etc.', icon: Scaling, category: 'Organize PDF', categoryIcon: Layers },
  { name: 'Page Margin Editor', description: 'Add, remove, or adjust page margins.', icon: Rows, category: 'Organize PDF', categoryIcon: Layers },
  { name: 'PDF Page Duplicator', description: 'Duplicate one or more pages in a PDF.', icon: Repeat, category: 'Organize PDF', categoryIcon: Layers },

  // Edit PDF
  { name: 'Rotate PDF', description: 'Rotate one or all pages in your PDF file.', icon: RotatePdfIcon, category: 'Edit PDF', categoryIcon: Pencil },
  { name: 'Add Page Numbers', description: 'Insert page numbers into your PDF easily.', icon: ListOrdered, category: 'Edit PDF', categoryIcon: Pencil },
  { name: 'Add Watermark', description: 'Stamp text or an image over your PDF.', icon: WatermarkIcon, category: 'Edit PDF', categoryIcon: Pencil },
  { name: 'Crop PDF', description: 'Trim the margins of your PDF pages.', icon: Crop, category: 'Edit PDF', categoryIcon: Pencil },
  { name: 'Draw/Annotate PDF', description: 'Draw, highlight, and add notes to a PDF.', icon: Paintbrush, category: 'Edit PDF', categoryIcon: Pencil },
  { name: 'Insert Text, Shapes, Images', description: 'Add new content to your PDF files.', icon: PlusSquare, category: 'Edit PDF', categoryIcon: Pencil },
  { name: 'Fill & Edit PDF Forms', description: 'Edit and fill out AcroForms and XFA forms.', icon: EditPdfIcon, category: 'Edit PDF', categoryIcon: Pencil },
  { name: 'Find & Replace Text', description: 'Search for and replace text in a PDF.', icon: Replace, category: 'Edit PDF', categoryIcon: Pencil },
  { name: 'Hyperlink Manager', description: 'Add, edit, or remove links in a PDF.', icon: Link, category: 'Edit PDF', categoryIcon: Pencil },
  { name: 'Stamp Date/Time/Filename', description: 'Add dynamic stamps to your document.', icon: Clock, category: 'Edit PDF', categoryIcon: Pencil },
  { name: 'Header/Footer Master', description: 'Add repeating headers and footers.', icon: Columns3, category: 'Edit PDF', categoryIcon: Pencil },
  { name: 'Bates Numbering', description: 'Add legal numbering to documents.', icon: Pilcrow, category: 'Edit PDF', categoryIcon: Pencil },
  { name: 'Form Field Creator', description: 'Add interactive form fields to your PDF.', icon: FileInput, category: 'Edit PDF', categoryIcon: Pencil },
  { name: 'Form Data Import/Export', description: 'Import or export form data as FDF/JSON.', icon: FileCog, category: 'Edit PDF', categoryIcon: Pencil },
  { name: 'Outline Generator from Headings', description: 'Create bookmarks from document structure.', icon: ListTree, category: 'Edit PDF', categoryIcon: Pencil },


  // Optimize PDF
  { name: 'Compress PDF', description: 'Reduce the file size of your PDF documents.', icon: CompressPdfIcon, category: 'Optimize PDF', categoryIcon: Settings2 },
  { name: 'Repair PDF', description: 'Attempt to fix and recover data from a corrupted PDF.', icon: Settings2, category: 'Optimize PDF', categoryIcon: Settings2 },
  { name: 'OCR PDF', description: 'Extract selectable text from scanned PDFs.', icon: ScanText, category: 'Optimize PDF', categoryIcon: Settings2 },
  { name: 'Flatten PDF', description: 'Make PDF forms and annotations un-editable.', icon: FileSliders, category: 'Optimize PDF', categoryIcon: Settings2 },
  { name: 'Extract Images from PDF', description: 'Save all embedded images from a PDF.', icon: Images, category: 'Optimize PDF', categoryIcon: Settings2 },
  { name: 'Deskew PDF', description: 'Straighten scanned pages that are tilted.', icon: RotateCcw, category: 'Optimize PDF', categoryIcon: Settings2 },
  { name: 'Detect & Remove Blank Pages', description: 'Automatically find and delete empty pages.', icon: EyeOff, category: 'Optimize PDF', categoryIcon: Settings2 },
  { name: 'Background Remover (PDF)', description: 'Remove backgrounds from scanned pages.', icon: Eraser, category: 'Optimize PDF', categoryIcon: Settings2 },

  // Convert PDF
  { name: 'PDF to Word', description: 'Convert your PDF to an editable Word document.', icon: PdfToWordIcon, category: 'Convert PDF', categoryIcon: ArrowRightLeft },
  { name: 'Word to PDF', description: 'Convert Microsoft Word documents to PDF.', icon: WordToPdfIcon, category: 'Convert PDF', categoryIcon: ArrowRightLeft },
  { name: 'PDF to JPG', description: 'Convert each PDF page into a JPG image.', icon: PdfToJpgIcon, category: 'Convert PDF', categoryIcon: ArrowRightLeft },
  { name: 'JPG to PDF', description: 'Convert JPG images to a single PDF file.', icon: FileImage, category: 'Convert PDF', categoryIcon: ArrowRightLeft },
  { name: 'PDF to PowerPoint', description: 'Convert your PDF to a presentation.', icon: PdfToPowerpointIcon, category: 'Convert PDF', categoryIcon: ArrowRightLeft },
  { name: 'PDF to Excel', description: 'Extract data from PDF tables to an Excel sheet.', icon: PdfToExcelIcon, category: 'Convert PDF', categoryIcon: ArrowRightLeft },
  { name: 'PowerPoint to PDF', description: 'Convert PowerPoint presentations to PDF.', icon: PowerpointToPdfIcon, category: 'Convert PDF', categoryIcon: ArrowRightLeft },
  { name: 'Excel to PDF', description: 'Convert Excel spreadsheets to PDF.', icon: ExcelToPdfIcon, category: 'Convert PDF', categoryIcon: ArrowRightLeft },
  { name: 'PDF to PNG', description: 'Convert each PDF page into a PNG image.', icon: Image, category: 'Convert PDF', categoryIcon: ArrowRightLeft },
  { name: 'PNG to PDF', description: 'Convert PNG images to a single PDF file.', icon: FileImage, category: 'Convert PDF', categoryIcon: ArrowRightLeft },
  { name: 'HTML to PDF', description: 'Convert webpages to PDF documents.', icon: Code, category: 'Convert PDF', categoryIcon: ArrowRightLeft },
  { name: 'PDF to HTML', description: 'Convert your PDF to a web page.', icon: Code, category: 'Convert PDF', categoryIcon: ArrowRightLeft },
  { name: 'TXT/Markdown to PDF', description: 'Convert plain text or Markdown to PDF.', icon: Text, category: 'Convert PDF', categoryIcon: ArrowRightLeft },
  { name: 'PDF to TXT/Markdown', description: 'Extract text from your PDF.', icon: Text, category: 'Convert PDF', categoryIcon: ArrowRightLeft },
  { name: 'EPUB to PDF', description: 'Convert EPUB e-books to PDF format.', icon: BookText, category: 'Convert PDF', categoryIcon: ArrowRightLeft },
  { name: 'PDF to EPUB', description: 'Convert your PDF to the EPUB e-book format.', icon: BookText, category: 'Convert PDF', categoryIcon: ArrowRightLeft },
  { name: 'PDF to PDF/A', description: 'Convert your PDF to the ISO-standardized PDF/A format.', icon: Archive, category: 'Convert PDF', categoryIcon: ArrowRightLeft },

  // PDF Security
  { name: 'Unlock PDF', description: 'Remove password protection from a PDF file.', icon: Lock, category: 'PDF Security', categoryIcon: Shield },
  { name: 'Protect PDF', description: 'Add a password and encrypt your PDF file.', icon: ShieldCheck, category: 'PDF Security', categoryIcon: Shield },
  { name: 'Sign PDF', description: 'Create or apply your electronic signature to a PDF.', icon: SignPdfIcon, category: 'PDF Security', categoryIcon: Shield },
  { name: 'Redact PDF', description: 'Permanently black out sensitive information.', icon: FileLock, category: 'PDF Security', categoryIcon: Shield },
  { name: 'Compare PDFs', description: 'Show the differences between two PDF files.', icon: FileDiff, category: 'PDF Security', categoryIcon: Shield },
  { name: 'Metadata Cleaner', description: 'Remove hidden data and personal information.', icon: FileKey, category: 'PDF Security', categoryIcon: Shield },
  { name: 'Permissions Editor', description: 'Set flags for printing, copying, etc.', icon: SlidersHorizontal, category: 'PDF Security', categoryIcon: Shield },
  { name: 'Invisible Watermark', description: 'Embed a hidden steganographic watermark.', icon: Droplet, category: 'PDF Security', categoryIcon: Shield },
  { name: 'Digital Signature Validator', description: 'View certificate info of a signature.', icon: FileCheck, category: 'PDF Security', categoryIcon: Shield },
  { name: 'Remove JavaScript from PDF', description: 'Sanitize a PDF by removing scripts.', icon: ShieldQuestion, category: 'PDF Security', categoryIcon: Shield },
  { name: 'PDF/A Validator', description: 'Check a file for PDF/A compliance.', icon: BadgePercent, category: 'PDF Security', categoryIcon: Shield },


  // Image Tools
  { name: 'Image Converter', description: 'Convert images between PNG, JPG, WebP.', icon: ArrowRightLeft, category: 'Image Tools', categoryIcon: Image },
  { name: 'Image Compressor', description: 'Reduce image file sizes.', icon: Minimize2, category: 'Image Tools', categoryIcon: Image },
  { name: 'Image Resizer', description: 'Crop and resize your images.', icon: Crop, category: 'Image Tools', categoryIcon: Image },
  { name: 'Image Upscaler', description: 'Increase image resolution with AI.', icon: Scaling, category: 'Image Tools', categoryIcon: Image },
  { name: 'Photo Editor', description: 'Make basic adjustments to your photos.', icon: ImagePlus, category: 'Image Tools', categoryIcon: Image },
  { name: 'Background Remover', description: 'Automatically remove the background from an image.', icon: Droplet, category: 'Image Tools', categoryIcon: Image },
  { name: 'Color Palette Generator', description: 'Extract a color scheme from an image.', icon: Palette, category: 'Image Tools', categoryIcon: Image },
  { name: 'Meme Generator', description: 'Create memes from your own images or templates.', icon: Share2, category: 'Image Tools', categoryIcon: Image },
  { name: 'SVG to PNG/JPG/WebP', description: 'Convert SVG vectors to raster images.', icon: Shapes, category: 'Image Tools', categoryIcon: Image },
  { name: 'HEIC to JPG/PNG', description: 'Convert Apple HEIC photos.', icon: ArrowRightLeft, category: 'Image Tools', categoryIcon: Image },
  { name: 'BMP/TIFF to PNG/JPG', description: 'Convert legacy image formats.', icon: ArrowRightLeft, category: 'Image Tools', categoryIcon: Image },
  { name: 'ICO <-> PNG', description: 'Convert between icon and PNG formats.', icon: ArrowRightLeft, category: 'Image Tools', categoryIcon: Image },
  { name: 'Animated WEBP ↔ GIF', description: 'Convert between animated formats.', icon: Repeat, category: 'Image Tools', categoryIcon: Image },
  { name: 'SVG Optimizer', description: 'Reduce SVG file size with SVGO.', icon: Minimize2, category: 'Image Tools', categoryIcon: Image },
  { name: 'Smart Sharpen / DeNoise', description: 'Enhance photos with WASM filters.', icon: Wand2, category: 'Image Tools', categoryIcon: Image },
  { name: 'Color Replace', description: 'Replace a color with another.', icon: PaintBucket, category: 'Image Tools', categoryIcon: Image },
  { name: 'EXIF Viewer/Editor', description: 'View, edit, or strip photo metadata.', icon: Tags, category: 'Image Tools', categoryIcon: Image },
  { name: 'Watermark Image', description: 'Add a text or logo watermark.', icon: WatermarkIcon, category: 'Image Tools', categoryIcon: Image },
  { name: 'Sprite Sheet Maker', description: 'Combine images into a sprite sheet.', icon: GanttChartSquare, category: 'Image Tools', categoryIcon: Image },
  { name: 'Favicon Generator', description: 'Create favicons for all platforms.', icon: StarIcon, category: 'Image Tools', categoryIcon: Image },
  { name: 'Mockup Frame Fitter', description: 'Fit your image into a device frame.', icon: Frame, category: 'Image Tools', categoryIcon: Image },
  { name: 'Auto-Crop to Content', description: 'Automatically trim whitespace.', icon: Crop, category: 'Image Tools', categoryIcon: Image },
  { name: 'Perspective Fix', description: 'Correct perspective distortion in photos.', icon: BoxSelect, category: 'Image Tools', categoryIcon: Image },

  // Video Tools
  { name: 'Video Compressor', description: 'Reduce video file sizes without losing quality.', icon: FileVideo, category: 'Video Tools', categoryIcon: Video },
  { name: 'Trim Video', description: 'Cut out a portion from the beginning or end.', icon: Scissors, category: 'Video Tools', categoryIcon: Video },
  { name: 'Video to GIF', description: 'Convert a video clip into an animated GIF.', icon: RedoDot, category: 'Video Tools', categoryIcon: Video },
  { name: 'Video Converter', description: 'Convert videos between formats like MP4, WebM, AVI.', icon: FileVideo, category: 'Video Tools', categoryIcon: Video },
  { name: 'Merge Videos', description: 'Combine multiple video clips into one.', icon: Combine, category: 'Video Tools', categoryIcon: Video },
  { name: 'Extract Audio from Video', description: 'Rip the audio track from a video file.', icon: AudioWaveform, category: 'Video Tools', categoryIcon: Video },
  { name: 'Screen Recorder', description: 'Record your screen, with or without your camera.', icon: MonitorUp, category: 'Video Tools', categoryIcon: Video },
  { name: 'Change Resolution/Bitrate', description: 'Adjust video quality and size.', icon: Settings, category: 'Video Tools', categoryIcon: Video },
  { name: 'Rotate/Flip Video', description: 'Rotate or flip video orientation.', icon: RotateCw, category: 'Video Tools', categoryIcon: Video },
  { name: 'Add Subtitles (burn-in)', description: 'Permanently add subtitles to a video.', icon: MessageSquare, category: 'Video Tools', categoryIcon: Video },


  // Audio Tools
  { name: 'Audio Compressor', description: 'Reduce the file size of audio files.', icon: Minimize, category: 'Audio Tools', categoryIcon: AudioWaveform },
  { name: 'Audio Converter', description: 'Convert audio between MP3, WAV, M4A, etc.', icon: AudioWaveform, category: 'Audio Tools', categoryIcon: AudioWaveform },
  { name: 'Trim Audio', description: 'Cut a section from an audio file.', icon: Scissors, category: 'Audio Tools', categoryIcon: AudioWaveform },
  { name: 'Merge Audio', description: 'Join multiple audio tracks into one.', icon: Combine, category: 'Audio Tools', categoryIcon: AudioWaveform },
  { name: 'Voice Recorder', description: 'Record audio directly from your microphone.', icon: Mic, category: 'Audio Tools', categoryIcon: AudioWaveform },
  { name: 'Text to Speech', description: 'Convert text into natural-sounding speech with AI.', icon: Speaker, category: 'Audio Tools', categoryIcon: AudioWaveform },
  { name: 'Normalize Audio Loudness', description: 'Adjust audio to a standard volume level.', icon: BarChart, category: 'Audio Tools', categoryIcon: AudioWaveform },

  // Utility Tools
  { name: 'Password Generator', description: 'Create strong, secure passwords.', icon: KeyRound, category: 'Utility Tools', categoryIcon: TerminalSquare, isStandalone: true },
  { name: 'QR Code Generator', description: 'Create your own QR codes.', icon: QrCode, category: 'Utility Tools', categoryIcon: TerminalSquare },
  { name: 'QR Code Scanner', description: 'Scan QR codes using your camera.', icon: Camera, category: 'Utility Tools', categoryIcon: TerminalSquare },
  { name: 'Text Case Converter', description: 'Change text to uppercase, lowercase, title case, etc.', icon: Type, category: 'Utility Tools', categoryIcon: TerminalSquare },
  { name: 'Character & Word Counter', description: 'Count characters, words, sentences, and paragraphs.', icon: Sigma, category: 'Utility Tools', categoryIcon: TerminalSquare },
  { name: 'Regex Tester', description: 'Test your regular expressions in real-time.', icon: Regex, category: 'Utility Tools', categoryIcon: TerminalSquare },
  { name: 'Unit Converter', description: 'Convert between various units of measurement.', icon: Calculator, category: 'Utility Tools', categoryIcon: TerminalSquare },
  { name: 'Lorem Ipsum Generator', description: 'Generate placeholder text for your designs.', icon: FileText, category: 'Utility Tools', categoryIcon: TerminalSquare },
  { name: 'Stopwatch & Timer', description: 'Measure time with a simple stopwatch or set a timer.', icon: Timer, category: 'Utility Tools', categoryIcon: TerminalSquare, isStandalone: true },
  { name: 'JSON Formatter & Validator', description: 'Beautify and validate your JSON data.', icon: FileJson, category: 'Utility Tools', categoryIcon: TerminalSquare },
  { name: 'Text Compare', description: 'Find the differences between two text files.', icon: FileDiff, category: 'Utility Tools', categoryIcon: TerminalSquare },
  { name: 'MD5 / SHA-256 Generator', description: 'Calculate file hashes using various algorithms.', icon: Fingerprint, category: 'Utility Tools', categoryIcon: TerminalSquare },
  { name: 'Base64 Encoder/Decoder', description: 'Encode to or decode from Base64.', icon: Binary, category: 'Utility Tools', categoryIcon: TerminalSquare },
  { name: 'URL Encoder/Decoder', description: 'Encode or decode URLs for safe transmission.', icon: LinkIcon, category: 'Utility Tools', categoryIcon: TerminalSquare },
  { name: 'Notepad', description: 'A simple online notepad for quick notes.', icon: StickyNote, category: 'Utility Tools', categoryIcon: TerminalSquare, isStandalone: true },
  { name: 'Clipboard History', description: 'Keep track of your clipboard history.', icon: Clipboard, category: 'Utility Tools', categoryIcon: TerminalSquare, isStandalone: true },
  { name: 'Project Planner', description: 'Outline projects with tasks and timelines.', icon: GanttChartSquare, category: 'Utility Tools', categoryIcon: TerminalSquare, isStandalone: true },
  { name: 'Minify/Beautify (HTML/CSS/JS)', description: 'Optimize your web code for production.', icon: FileCog, category: 'Utility Tools', categoryIcon: TerminalSquare },
  { name: 'UUID/ULID Generator', description: 'Generate unique identifiers.', icon: Hash, category: 'Utility Tools', categoryIcon: TerminalSquare },
  { name: 'Timestamp Converter', description: 'Convert between UNIX and human-readable time.', icon: Clock, category: 'Utility Tools', categoryIcon: TerminalSquare },
  { name: 'YAML <-> JSON', description: 'Convert between YAML and JSON formats.', icon: UnfoldVertical, category: 'Utility Tools', categoryIcon: TerminalSquare },

  // Converters
  { name: 'Markdown <-> HTML', description: 'Convert between Markdown and HTML.', icon: GitCompareArrows, category: 'Converters', categoryIcon: ArrowRightLeft },
  { name: 'CSV <-> JSON', description: 'Convert between CSV and JSON formats.', icon: GitCompareArrows, category: 'Converters', categoryIcon: ArrowRightLeft },
  { name: 'CSV Column Split/Merge', description: 'Manipulate columns in a CSV file.', icon: Columns, category: 'Converters', categoryIcon: ArrowRightLeft },


  // Archive Tools
  { name: 'Zip File Extractor', description: 'Unzip files from a compressed archive.', icon: PackageOpen, category: 'Archive Tools', categoryIcon: Package },
  { name: 'Create Zip File', description: 'Compress multiple files into a single ZIP archive.', icon: Package, category: 'Archive Tools', categoryIcon: Package },
  { name: 'PDF/ZIP Split by Size', description: 'Split large archives into smaller chunks.', icon: Split, category: 'Archive Tools', categoryIcon: Package },
];
