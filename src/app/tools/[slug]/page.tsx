"use client";

import { useState, useCallback } from 'react';
import { tools } from '@/lib/tools';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UploadCloud, File, X } from 'lucide-react';

export default function ToolPage({ params }: { params: { slug: string } }) {
  const tool = tools.find(t => t.name.toLowerCase().replace(/ /g, '-').replace(/&/g, 'and') === params.slug);
  const [files, setFiles] = useState<File[]>([]);

  if (!tool) {
    notFound();
  }

  const Icon = tool.icon;

  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFiles(prevFiles => [...prevFiles, ...Array.from(event.target.files!)]);
    }
  }, []);

  const handleDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  }, []);
  
  const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (event.dataTransfer.files) {
      setFiles(prevFiles => [...prevFiles, ...Array.from(event.dataTransfer.files)]);
    }
  }, []);

  const removeFile = useCallback((fileName: string) => {
    setFiles(prevFiles => prevFiles.filter(f => f.name !== fileName));
  }, []);


  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-4xl">
        <Card className="mb-8">
            <CardHeader className="text-center">
                <div className="flex justify-center items-center mb-4">
                    <div className="p-4 bg-purple-100 dark:bg-purple-900/20 rounded-full">
                        <Icon className="h-12 w-12 text-purple-600 dark:text-purple-400" />
                    </div>
                </div>
                <CardTitle className="text-4xl font-bold">{tool.name}</CardTitle>
                <p className="text-muted-foreground">{tool.description}</p>
            </CardHeader>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div 
                className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:border-purple-400 dark:hover:border-purple-500 transition-colors"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={() => document.getElementById('file-upload')?.click()}
            >
              <UploadCloud className="mx-auto h-12 w-12 text-muted-foreground" />
              <p className="mt-4 text-sm text-muted-foreground">
                Drag and drop files here, or click to select files
              </p>
              <input 
                id="file-upload" 
                type="file" 
                multiple 
                className="hidden" 
                onChange={handleFileChange} 
              />
            </div>

            {files.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-medium">Uploaded Files:</h3>
                <ul className="mt-2 divide-y divide-border border rounded-md">
                  {files.map(file => (
                    <li key={`${file.name}-${file.lastModified}`} className="flex items-center justify-between p-3">
                      <div className="flex items-center gap-3">
                        <File className="h-5 w-5 text-muted-foreground" />
                        <span className="text-sm font-medium">{file.name}</span>
                      </div>
                      <Button variant="ghost" size="icon" onClick={() => removeFile(file.name)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-8 text-center">
                <Button size="lg" disabled={files.length === 0} className="bg-purple-600 hover:bg-purple-700 text-white">
                    Process Files
                </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
