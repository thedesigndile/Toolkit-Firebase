
"use client";

import { useState, useCallback, useEffect, useMemo, useRef } from 'react';
import { tools } from '@/lib/tools';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UploadCloud, File, X, Loader2, Download, CheckCircle, RotateCcw, Settings2, HelpCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { convertImage, resizeImage, compressImage, compressPdf, getFileAccept, mergePdfs } from '@/lib/tool-functions';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { PasswordGenerator } from '@/components/tools/password-generator';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Slider } from '@/components/ui/slider';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Footer } from '@/components/footer';
import { ProgressProvider, useProgress } from '@/components/progress-provider';
import { ProgressDisplay } from '@/components/progress-display';

type ImageFormat = "png" | "jpeg" | "webp";

function ToolPageClient({ params }: { params: { slug: string } }) {
  const tool = useMemo(() => tools.find(t => t.name.toLowerCase().replace(/ /g, '-').replace(/&/g, 'and') === params.slug), [params.slug]);
  
  const { 
    progress, setProgress, 
    status, setStatus, 
    processedUrl, setProcessedUrl,
    processedFileName, setProcessedFileName,
    files, setFiles,
    error, setError,
    resetState,
  } = useProgress();

  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Tool-specific options state
  const [imageFormat, setImageFormat] = useState<ImageFormat>('png');
  const [resizeOptions, setResizeOptions] = useState({ width: '1920', height: '1080', keepAspectRatio: true });
  const [compressionQuality, setCompressionQuality] = useState(80);
  const [targetSize, setTargetSize] = useState('');
  const [originalFileSize, setOriginalFileSize] = useState<string | null>(null);
  const [estimatedFileSize, setEstimatedFileSize] = useState<string | null>(null);


  const { toast } = useToast();
  
  const fileAccept = useMemo(() => tool ? getFileAccept(tool.category) : '*/*', [tool]);

  useEffect(() => {
    // This effect runs when the component unmounts.
    // It's a cleanup function to release the object URL and prevent memory leaks.
    return () => {
      if (processedUrl) {
        URL.revokeObjectURL(processedUrl);
      }
    };
  }, [processedUrl]);

  useEffect(() => {
    if (files.length > 0 && (tool?.name === 'Image Compressor' || tool?.name === 'PDF Compressor')) {
      const totalSize = files.reduce((acc, file) => acc + file.size, 0);
      setOriginalFileSize((totalSize / 1024 / 1024).toFixed(2) + ' MB');

      // Simple estimation logic
      const qualityRatio = compressionQuality / 100;
      const estimated = totalSize * qualityRatio * 0.5; // Further adjust based on typical compression results
      setEstimatedFileSize((estimated / 1024 / 1024).toFixed(2) + ' MB');

    } else {
      setOriginalFileSize(null);
      setEstimatedFileSize(null);
    }
  }, [files, compressionQuality, tool]);


  if (!tool) {
    notFound();
  }

  const Icon = tool.icon;
  
  const validateFiles = (newFiles: File[]): File[] => {
    if (fileAccept === '*/*') return newFiles;
    const acceptedTypes = fileAccept.split(',').map(t => t.trim());
    return newFiles.filter(file => {
      const isValid = acceptedTypes.some(type => {
        if (type.endsWith('/*')) {
          return file.type.startsWith(type.slice(0, -1));
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
      }
    }
  }, [fileAccept, toast, setFiles]);

  const handleDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  }, []);
  
  const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (event.dataTransfer.files) {
      const validFiles = validateFiles(Array.from(event.dataTransfer.files));
       if(validFiles.length > 0) {
        setFiles(prevFiles => [...prevFiles, ...validFiles]);
      }
    }
  }, [fileAccept, toast, setFiles]);

  const removeFile = useCallback((fileName: string) => {
    setFiles(prevFiles => prevFiles.filter(f => f.name !== fileName));
  }, [setFiles]);

  const handleProcessFiles = async () => {
    if (files.length === 0) return;
    
    setStatus('processing');
    setProgress(0);
    setError(null);
    if(processedUrl) {
      URL.revokeObjectURL(processedUrl);
      setProcessedUrl(null);
    }

    const progressInterval = setInterval(() => {
        setProgress(prev => {
            if (prev >= 95) {
                clearInterval(progressInterval);
                return 95;
            }
            return prev + 5;
        });
    }, 200);

    try {
        let resultBlob: Blob;
        let resultName: string;
        const file = files[0]; 

        switch (tool.name) {
            case 'Image Converter':
                if (files.length > 1) throw new Error("Image Converter only supports one file at a time.");
                resultBlob = await convertImage(file, imageFormat);
                resultName = `converted-${file.name.split('.')[0]}.${imageFormat}`;
                break;
            case 'Image Resizer':
                 if (files.length > 1) throw new Error("Image Resizer only supports one file at a time.");
                resultBlob = await resizeImage(file, parseInt(resizeOptions.width), parseInt(resizeOptions.height), resizeOptions.keepAspectRatio);
                resultName = `resized-${file.name}`;
                break;
            case 'Image Compressor':
                 if (files.length > 1) throw new Error("Image Compressor only supports one file at a time.");
                const quality = compressionQuality / 100;
                resultBlob = await compressImage(file, quality);
                resultName = `compressed-${file.name}`;
                break;
            case 'PDF Compressor':
                 if (files.length > 1) throw new Error("PDF Compressor only supports one file at a time.");
                 const pdfQuality = compressionQuality / 100;
                resultBlob = await compressPdf(file, pdfQuality);
                resultName = `compressed-${file.name}`;
                break;
             case 'Merge PDF':
                resultBlob = await mergePdfs(files);
                resultName = `merged-document.pdf`;
                break;
            default:
                 // This case handles tools that are listed but don't have client-side logic implemented yet.
                 // It simulates a process and then throws a clear error for the user.
                await new Promise(resolve => setTimeout(resolve, 1000));
                throw new Error(`The '${tool.name}' tool is not yet implemented.`);
        }
        
        clearInterval(progressInterval);
        setProgress(100);
        
        const url = URL.createObjectURL(resultBlob);
        setProcessedUrl(url);
        setProcessedFileName(resultName);
        setStatus('complete');

        toast({
            title: "Success!",
            description: `Your file(s) have been processed with the ${tool.name} tool.`,
        });

    } catch (e: any) {
        clearInterval(progressInterval);
        const errorMessage = e.message || "An unknown error occurred during processing.";
        setError(errorMessage);
        setStatus('error');
        toast({
            variant: "destructive",
            title: "Processing Failed",
            description: errorMessage,
        });
    }
  };
  
  const renderToolOptions = () => {
    if (files.length === 0 || status !== 'idle' || processedUrl) return null;

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
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="quality-slider">Quality</Label>
                <span className="text-sm font-medium text-muted-foreground">{compressionQuality}%</span>
              </div>
              <Slider
                id="quality-slider"
                min={0}
                max={100}
                step={1}
                value={[compressionQuality]}
                onValueChange={(value) => setCompressionQuality(value[0])}
              />
            </div>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  <div className="flex items-center gap-2">
                    <Settings2 className="h-4 w-4" strokeWidth={1.5} />
                    Advanced Options
                  </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <Label htmlFor="target-size">Target size (KB)</Label>
                    <Input id="target-size" type="number" value={targetSize} onChange={e => setTargetSize(e.target.value)} placeholder="e.g., 500" />
                  </div>
                   <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>Original Size:</span>
                    <span>{originalFileSize ?? 'N/A'}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>Estimated New Size:</span>
                    <span>{estimatedFileSize ?? 'N/A'}</span>
                  </div>
                   <div className="flex items-center space-x-2">
                      <Checkbox id="preview" />
                      <Label htmlFor="preview">Show preview before saving</Label>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        );
        break;
      
      default:
        return null;
    }

    if (!optionsComponent) return null;

    return (
        <div className="mt-6">
            <h3 className="text-lg font-medium mb-4 text-center">Tool Options</h3>
            <Card>
                <CardContent className="pt-6">
                    {optionsComponent}
                </CardContent>
            </Card>
        </div>
    )
  };

  const isMultiFileTool = ['Merge PDF'].includes(tool.name);

  const renderFileBasedUI = () => (
    <>
       {status !== 'idle' ? (
           <ProgressDisplay />
        ) : (
        <Card>
            <CardContent className="pt-6">
            <div 
                className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:border-accent/40 dark:hover:border-accent/50 transition-colors"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
            >
                <UploadCloud className="mx-auto h-12 w-12 text-muted-foreground" strokeWidth={1.5} />
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
                multiple={isMultiFileTool}
                className="hidden" 
                onChange={handleFileChange}
                accept={fileAccept}
                />
            </div>

            {files.length > 0 && (
                <div className="mt-6">
                <h3 className="text-lg font-medium text-center">Uploaded Files:</h3>
                <ul className="mt-2 divide-y divide-border border rounded-md">
                    {files.map(file => (
                    <li key={`${file.name}-${file.lastModified}`} className="flex items-center justify-between p-3">
                        <div className="flex items-center gap-3">
                        <File className="h-5 w-5 text-muted-foreground" strokeWidth={1.5} />
                        <span className="text-sm font-medium">{file.name}</span>
                        </div>
                        <Button variant="ghost" size="icon" onClick={() => removeFile(file.name)}>
                        <X className="h-4 w-4" strokeWidth={1.5} />
                        </Button>
                    </li>
                    ))}
                </ul>
                </div>
            )}
            
            {renderToolOptions()}

            <div className="mt-8 text-center">
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground" disabled={files.length === 0} onClick={handleProcessFiles}>
                    {`Process ${files.length > 0 ? files.length : ''} File(s)`}
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
    <div className="flex min-h-screen flex-col bg-background pt-24">
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center p-4 bg-accent/10 dark:bg-accent/20 rounded-full mb-4">
                        <Icon className="h-12 w-12 text-accent" strokeWidth={1.5} />
                    </div>
                    <h1 className="text-4xl font-semibold">{tool.name}</h1>
                    <p className="text-muted-foreground mt-2 text-lg">{tool.description}</p>
                </div>
                
                {renderToolUI()}
            </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}


export default function ToolPage({ params }: { params: { slug: string } }) {
  return (
    <ProgressProvider>
      <ToolPageClient params={params} />
    </ProgressProvider>
  )
}

    