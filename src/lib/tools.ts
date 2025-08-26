import { type LucideIcon, PenSquare, Calculator, Timer, Image, Code, KeyRound, FileCog, Type, Palette, Video, GitBranch, Database, TerminalSquare } from 'lucide-react';

export interface Tool {
  name: string;
  description: string;
  icon: LucideIcon;
  category: string;
}

export const tools: Tool[] = [
  { name: 'Notepad Pro', description: 'Advanced offline text editor.', icon: PenSquare, category: 'Productivity' },
  { name: 'CalcMaster', description: 'Powerful scientific calculator.', icon: Calculator, category: 'Utilities' },
  { name: 'Focus Timer', description: 'Pomodoro timer for productivity.', icon: Timer, category: 'Productivity' },
  { name: 'Pixel Perfect', description: 'Lightweight image editor.', icon: Image, category: 'Design' },
  { name: 'Code Snippets', description: 'Manage your code snippets.', icon: Code, category: 'Development' },
  { name: 'PassGen', description: 'Secure password generator.', icon: KeyRound, category: 'Security' },
  { name: 'FileConverter', description: 'Convert files between formats.', icon: FileCog, category: 'Utilities' },
  { name: 'Markdown Editor', description: 'Write in Markdown with live preview.', icon: Type, category: 'Productivity' },
  { name: 'Color Picker', description: 'Select and save color palettes.', icon: Palette, category: 'Design' },
  { name: 'Video Trimmer', description: 'Quickly trim video files.', icon: Video, category: 'Utilities' },
  { name: 'Git Client', description: 'A simple git client.', icon: GitBranch, category: 'Development'},
  { name: 'DB Viewer', description: 'View SQLite databases.', icon: Database, category: 'Development'},
  { name: 'Local Shell', description: 'Access a sandboxed shell.', icon: TerminalSquare, category: 'Development'},
];

export const featuredTools = tools.slice(0, 5);
