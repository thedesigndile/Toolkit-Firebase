import { type LucideIcon, FileJson, PenSquare, Calculator, Timer, Image, Code, KeyRound, FileCog, Type, Palette, Video, GitBranch, Database, TerminalSquare, Combine, Split, FileArchive, FileText, ArrowRightLeft, Minimize2, Crop, FileImage, ImagePlus, AudioWaveform, Scissors, Mic, Minimize, MonitorUp, BookText, StickyNote, BookUser, Regex, Archive, ScanText, QrCode, Camera, Sigma, ListOrdered } from 'lucide-react';

export interface Tool {
  name: string;
  description: string;
  icon: LucideIcon;
  category: string;
  isStandalone?: boolean;
}

export const tools: Tool[] = [
  // Document & PDF Tools
  { name: 'PDF Merger', description: 'Combine multiple PDF files into one.', icon: Combine, category: 'Document & PDF Tools' },
  { name: 'PDF Splitter', description: 'Split a single PDF into multiple files.', icon: Split, category: 'Document & PDF Tools' },
  { name: 'PDF Compressor', description: 'Reduce the file size of your PDFs.', icon: FileArchive, category: 'Document & PDF Tools' },
  { name: 'PDF to Word', description: 'Convert PDF files to editable Word documents.', icon: FileText, category: 'Document & PDF Tools' },
  { name: 'Word to PDF', description: 'Convert Word documents to PDF files.', icon: FileText, category: 'Document & PDF Tools' },
  { name: 'PDF Page Numbering', description: 'Add page numbers to your PDF files.', icon: ListOrdered, category: 'Document & PDF Tools' },

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
