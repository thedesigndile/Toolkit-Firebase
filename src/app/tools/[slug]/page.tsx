
"use client";

import { useState, useCallback, useEffect, useMemo, useRef } from 'react';
import { tools } from '@/lib/tools';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UploadCloud, File, X, Loader2, Download, CheckCircle, RotateCcw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { convertImage, resizeImage, compressImage, compressPdf, getFileAccept } from '@/lib/tool-functions';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Header } from '@/components/header';
import { PasswordGenerator } from '@/components/tools/password-generator';

type ImageFormat = "png" | "jpeg" | "webp";
type CompressionLevel = "low" | "medium" | "high";

export default function ToolPage({ params }: { params: { slug: string } }) {
  const tool = useMemo(() => tools.find(t => t.name.toLowerCase().replace(/ /g, '-').replace(/&/g, 'and') === params.slug), [params.slug]);
  
  const [files, setFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedUrl, setProcessedUrl] = useState<string | null>(null);
  const [processedFileName, setProcessedFileName] = useState<string>('download');
  const [error, setError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Tool-specific options state
  const [imageFormat, setImageFormat] = useState<ImageFormat>('png');
  const [resizeOptions, setResizeOptions] = useState({ width: '1920', height: '1080', keepAspectRatio: true });
  const [compressionLevel, setCompressionLevel] = useState<CompressionLevel>('medium');

  const { toast } = useToast();
  
  const fileAccept = useMemo(() => tool ? getFileAccept(tool.category) : '*/*', [tool]);

  useEffect(() => {
    return () => {
      if (processedUrl) {
        URL.revokeObjectURL(processedUrl);
      }
    };
  }, [processedUrl]);

  if (!tool) {
    notFound();
  }

  const Icon = tool.icon;
  
  const validateFiles = (newFiles: File[]): File[] => {
    if (fileAccept === '*/*') return newFiles;
    const acceptedTypes = fileAccept.split(',');
    return newFiles.filter(file => {
      const isValid = acceptedTypes.some(type => {
        if (type.endsWith('/*')) {
          return file.type.startsWith(type.slice(0, -2));
        }
        return file.type === type;
      });
      if (!isValid) {
        toast({
            variant: "destructive",
            title: "Invalid File Type",
            description: `File "${file.name}" was rejected. Please upload one of the following types: ${fileAccept}`,
        });
      }
      return isValid;
    });
  }

  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const validFiles = validateFiles(Array.from(event.target.files));
      if(validFiles.length > 0) {
        setFiles(prevFiles => [...prevFiles, ...validFiles]);
        setProcessedUrl(null);
        setError(null);
      }
    }
  }, [fileAccept, toast]);

  const handleDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  }, []);
  
  const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (event.dataTransfer.files) {
      const validFiles = validateFiles(Array.from(event.dataTransfer.files));
       if(validFiles.length > 0) {
        setFiles(prevFiles => [...prevFiles, ...validFiles]);
        setProcessedUrl(null);
        setError(null);
      }
    }
  }, [fileAccept, toast]);

  const removeFile = useCallback((fileName: string) => {
    setFiles(prevFiles => prevFiles.filter(f => f.name !== fileName));
  }, []);
  
  const resetState = useCallback(() => {
    setFiles([]);
    setIsProcessing(false);
    setError(null);
    if (processedUrl) {
      URL.revokeObjectURL(processedUrl);
    }
    setProcessedUrl(null);
    if(fileInputRef.current) {
        fileInputRef.current.value = "";
    }
  }, [processedUrl]);


  const handleProcessFiles = async () => {
    if (files.length === 0) return;

    setIsProcessing(true);
    setError(null);
    if(processedUrl) {
      URL.revokeObjectURL(processedUrl);
      setProcessedUrl(null);
    }

    try {
        let resultBlob: Blob;
        let resultName: string;
        const file = files[0]; // For now, most tools process one file at a time.

        switch (tool.name) {
            case 'Image Converter':
                resultBlob = await convertImage(file, imageFormat);
                resultName = `converted-${file.name.split('.')[0]}.${imageFormat}`;
                break;
            case 'Image Resizer':
                resultBlob = await resizeImage(file, parseInt(resizeOptions.width), parseInt(resizeOptions.height), resizeOptions.keepAspectRatio);
                resultName = `resized-${file.name}`;
                break;
            case 'Image Compressor':
                resultBlob = await compressImage(file, compressionLevel);
                resultName = `compressed-${file.name}`;
                break;
            case 'PDF Compressor':
                resultBlob = await compressPdf(file, compressionLevel);
                resultName = `compressed-${file.name}`;
                break;
            default:
                // Placeholder for other tools
                await new Promise(resolve => setTimeout(resolve, 1000));
                resultBlob = new Blob([`Processed ${file.name} with ${tool.name}`], { type: 'text/plain' });
                resultName = `processed-${file.name}.txt`;
                break;
        }

        const url = URL.createObjectURL(resultBlob);
        setProcessedUrl(url);
        setProcessedFileName(resultName);

        toast({
            title: "Success!",
            description: `Your file has been processed with the ${tool.name} tool.`,
        });

    } catch (e: any) {
        const errorMessage = e.message || "An unknown error occurred during processing.";
        setError(errorMessage);
        toast({
            variant: "destructive",
            title: "Processing Failed",
            description: errorMessage,
        });
    } finally {
        setIsProcessing(false);
    }
  };
  
  const renderToolOptions = () => {
    if (files.length === 0 || isProcessing || processedUrl) return null;

    let optionsComponent = null;

    switch (tool.name) {
      case 'Image Converter':
        optionsComponent = (
          <div className="space-y-4">
            <Label htmlFor="format-select">Output Format</Label>
            <Select value={imageFormat} onValueChange={(value: ImageFormat) => setImageFormat(value)}>
              <SelectTrigger id="format-select">
                <SelectValue placeholder="Select a format" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="png">PNG</SelectItem>
                <SelectItem value="jpeg">JPG</SelectItem>
                <SelectItem value="webp">WebP</SelectItem>
              </SelectContent>
            </Select>
          </div>
        );
        break;
      
      case 'Image Resizer':
        optionsComponent = (
          <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                      <Label htmlFor="width">Width</Label>
                      <Input id="width" type="number" value={resizeOptions.width} onChange={e => setResizeOptions({...resizeOptions, width: e.target.value})} placeholder="e.g., 1920" />
                  </div>
                  <div className="space-y-2">
                      <Label htmlFor="height">Height</Label>
                      <Input id="height" type="number" value={resizeOptions.height} onChange={e => setResizeOptions({...resizeOptions, height: e.target.value})} placeholder="e.g., 1080" />
                  </div>
              </div>
              <div className="flex items-center space-x-2">
                  <Checkbox id="aspect-ratio" checked={resizeOptions.keepAspectRatio} onCheckedChange={checked => setResizeOptions({...resizeOptions, keepAspectRatio: !!checked})} />
                  <Label htmlFor="aspect-ratio">Keep aspect ratio</Label>
              </div>
          </div>
        );
        break;

      case 'PDF Compressor':
      case 'Image Compressor':
        optionsComponent = (
          <div className="space-y-2">
            <Label>Compression Level</Label>
            <RadioGroup value={compressionLevel} onValueChange={(value: CompressionLevel) => setCompressionLevel(value)} className="flex space-x-4">
              <div className="flex items-center space-x-2">
                  <RadioGroupItem value="low" id="low" />
                  <Label htmlFor="low">Low</Label>
              </div>
              <div className="flex items-center space-x-2">
                  <RadioGroupItem value="medium" id="medium" />
                  <Label htmlFor="medium">Medium</Label>
              </div>
              <div className="flex items-center space-x-2">
                  <RadioGroupItem value="high" id="high" />
                  <Label htmlFor="high">High</Label>
              </div>
            </RadioGroup>
          </div>
        );
        break;
      
      default:
        return null;
    }

    return (
        <div className="mt-6">
            <h3 className="text-lg font-medium mb-4">Tool Options</h3>
            <Card>
                <CardContent className="pt-6">
                    {optionsComponent}
                </CardContent>
            </Card>
        </div>
    )
  };

  const renderFileBasedUI = () => (
    <>
        {processedUrl ? (
        <Card>
            <CardContent className="pt-6 text-center">
            <div className="flex justify-center items-center mb-4">
                <div className="p-4 bg-green-100 dark:bg-green-900/20 rounded-full">
                    <CheckCircle className="h-12 w-12 text-green-600 dark:text-green-400" />
                </div>
            </div>
            <h3 className="text-2xl font-bold">Processing Complete!</h3>
            <p className="text-muted-foreground mt-2 mb-6">Your file is ready for download.</p>
            <div className="flex justify-center gap-4">
                <Button size="lg" asChild>
                <a href={processedUrl} download={processedFileName}>
                    <Download className="mr-2 h-4 w-4" />
                    Download File
                </a>
                </Button>
                <Button size="lg" variant="outline" onClick={resetState}>
                <RotateCcw className="mr-2 h-4 w-4" />
                Process Another
                </Button>
            </div>
            </CardContent>
        </Card>
        ) : (
        <Card>
            <CardContent className="pt-6">
            <div 
                className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:border-primary/40 dark:hover:border-primary/50 transition-colors"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
            >
                <UploadCloud className="mx-auto h-12 w-12 text-muted-foreground" />
                <p className="mt-4 text-sm text-muted-foreground">
                Drag and drop files here, or click to select files
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                    Supported: {fileAccept.replaceAll('image/', '.').replaceAll('application/', '.')}
                </p>
                <input 
                ref={fileInputRef}
                id="file-upload" 
                type="file" 
                multiple={!['Image Converter', 'Image Resizer', 'Image Compressor', 'PDF Compressor'].includes(tool.name)}
                className="hidden" 
                onChange={handleFileChange}
                disabled={isProcessing}
                accept={fileAccept}
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
                        <Button variant="ghost" size="icon" onClick={() => removeFile(file.name)} disabled={isProcessing}>
                        <X className="h-4 w-4" />
                        </Button>
                    </li>
                    ))}
                </ul>
                </div>
            )}
            
            {renderToolOptions()}

            <div className="mt-8 text-center">
                <Button size="lg" disabled={files.length === 0 || isProcessing} onClick={handleProcessFiles}>
                    {isProcessing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {isProcessing ? "Processing..." : `Process ${files.length > 0 ? files.length : ''} File(s)`}
                </Button>
            </div>
            </CardContent>
        </Card>
        )}
    </>
  );

  const renderToolUI = () => {
    if (tool.isStandalone) {
        switch (tool.name) {
            case 'Password Generator':
                return <PasswordGenerator />;
            default:
                return <p>This tool is not yet implemented.</p>;
        }
    }
    return renderFileBasedUI();
  }


  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-background p-4 flex items-center justify-center">
        <div className="w-full max-w-4xl">
          <Card className="mb-8">
              <CardHeader className="text-center">
                  <div className="flex justify-center items-center mb-4">
                      <div className="p-4 bg-primary/10 dark:bg-primary/20 rounded-full">
                          <Icon className="h-12 w-12 text-primary" />
                      </div>
                  </div>
                  <CardTitle className="text-4xl font-bold">{tool.name}</CardTitle>
                  <p className="text-muted-foreground">{tool.description}</p>
              </CardHeader>
          </Card>
          
          {error && (
              <Alert variant="destructive" className="mb-4">
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
              </Alert>
          )}

          {renderToolUI()}
        </div>
      </main>
      <footer className="py-8 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Offline Toolkit. All Rights Reserved.
      </footer>
    </div>
  );
}

    
