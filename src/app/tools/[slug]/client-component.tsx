"use client";

import { useState, useCallback, useMemo, useRef } from 'react';
import { tools } from '@/lib/tools';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { UploadCloud, File, X, Download, ImageIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { getFileAccept, pdfToImages, validateFileSize, downloadBlob, checkMemoryLimit } from '@/lib/tool-functions';
import { Footer } from '@/components/footer';
import { useProgress } from '@/components/progress-provider';
import { ProgressDisplay } from '@/components/progress-display';

type ImageFormat = "png" | "jpeg" | "webp";

export function ToolPageClient({ params }: { params: { slug: string } }): JSX.Element | null | undefined {
  // All hooks must be called before any early returns
  const tool = useMemo(() => {
    const foundTool = tools.find(t => t.name.toLowerCase().replace(/ /g, '-').replace(/&/g, 'and') === params.slug);
    return foundTool;
  }, [params.slug]);

  const {
    setProgress,
    status, setStatus,
    files, setFiles,
    setError,
    resetState,
  } = useProgress();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [pdfImageFormat, setPdfImageFormat] = useState<ImageFormat>('png');
  const [pdfImageQuality, setPdfImageQuality] = useState(90);
  const [convertedImages, setConvertedImages] = useState<Blob[]>([]);

  const { toast } = useToast();
  const fileAccept = useMemo(() => tool ? getFileAccept(tool.category, tool.name) : '*/*', [tool]);

  // Early return after all hooks are called
  if (!tool) {
    notFound();
    return null;
  }

  const Icon = tool.icon;

  const validateFiles = useCallback((newFiles: File[]): File[] => {
    if (fileAccept === '*/*') return newFiles;
    const acceptedTypes = fileAccept.split(',').map(t => t.trim());
    return newFiles.filter(file => {
      // Check file type
      const isValidType = acceptedTypes.some(type => {
        if (type.endsWith('/*')) {
          return file.type.startsWith(type.slice(0, -1));
        }
        return file.type === type;
      });

      if (!isValidType) {
        toast({
          variant: "destructive",
          title: "Invalid File Type",
          description: `File "${file.name}" was rejected. Please upload one of the following types: ${fileAccept}`,
        });
        return false;
      }

      // Check file size
      const sizeValidation = validateFileSize(file, tool.category);
      if (!sizeValidation.valid) {
        toast({
          variant: "destructive",
          title: "File Too Large",
          description: sizeValidation.error,
        });
        return false;
      }

      return true;
    });
  }, [fileAccept, toast, tool]);

  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const validFiles = validateFiles(Array.from(event.target.files));
      if (validFiles.length > 0) {
        setFiles(validFiles);
      }
    }
  }, [validateFiles, setFiles]);

  const handleDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  }, []);

  const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (event.dataTransfer.files) {
      const validFiles = validateFiles(Array.from(event.dataTransfer.files));
      if (validFiles.length > 0) {
        setFiles(validFiles);
      }
    }
  }, [validateFiles, setFiles]);

  const removeFile = useCallback((fileName: string) => {
    setFiles(prevFiles => prevFiles.filter(f => f.name !== fileName));
  }, [setFiles]);

  const clearAllFiles = useCallback(() => {
    setFiles([]);
  }, [setFiles]);

  const downloadImage = useCallback((blob: Blob, filename: string) => {
    try {
      downloadBlob(blob, filename);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Download Failed",
        description: "Failed to download the image. Please try again.",
      });
    }
  }, [toast]);

  const downloadAllImages = useCallback(() => {
    convertedImages.forEach((blob, index) => {
      const filename = `page-${index + 1}.${pdfImageFormat}`;
      downloadImage(blob, filename);
    });
    toast({
      title: "Download Started",
      description: `Downloading ${convertedImages.length} images...`,
    });
  }, [convertedImages, pdfImageFormat, downloadImage, toast]);

  const handleProcessFiles = async () => {
    if (files.length === 0) return;

    // For now, process only the first file for single-file tools
    // TODO: Implement multi-file processing for tools like Merge PDF
    const file = files[0];

    // Check memory limits before processing
    if (!checkMemoryLimit(file.size, tool.name)) {
      toast({
        variant: "destructive",
        title: "File Too Large",
        description: "This file is too large to process in your browser. Please try a smaller file.",
      });
      return;
    }

    resetState();
    setStatus('processing');
    setProgress(0);

    const progressIntervalRef = { current: null as NodeJS.Timeout | null };

    progressIntervalRef.current = setInterval(() => {
      setProgress(prev => {
        if (prev >= 95) {
          if (progressIntervalRef.current) {
            clearInterval(progressIntervalRef.current);
            progressIntervalRef.current = null;
          }
          return 95;
        }
        return prev + 5;
      });
    }, 200);

    try {
      if (tool.name === 'PDF to JPG') {
        // Check if we're in browser environment
        if (typeof window === 'undefined') {
          throw new Error('PDF processing is only available in browser environment.');
        }

        const format = pdfImageFormat === 'webp' ? 'png' : pdfImageFormat;
        const images = await pdfToImages(file, format as 'png' | 'jpeg', pdfImageQuality / 100);
        setConvertedImages(images);
        setProgress(100);
        setStatus('complete');

        if (progressIntervalRef.current) {
          clearInterval(progressIntervalRef.current);
          progressIntervalRef.current = null;
        }

        toast({
          title: "Success!",
          description: `PDF converted to ${images.length} ${format.toUpperCase()} images.`,
        });
        return;
      }

      // Handle other tools here if needed
      await new Promise(resolve => setTimeout(resolve, 1000));
      throw new Error(`The '${tool.name}' tool is not yet implemented.`);

    } catch (e: any) {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
        progressIntervalRef.current = null;
      }
      const errorMessage = e.message || "An unknown error occurred during processing.";
      setError(errorMessage);
      setStatus('error');
      setProgress(0);
      toast({
        variant: "destructive",
        title: "Processing Failed",
        description: errorMessage,
      });
    }
  };

  const renderToolOptions = () => {
    if (files.length === 0 || status !== 'idle') return null;

    if (tool.name === 'PDF to JPG') {
      return (
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-4 text-center">Tool Options</h3>
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="pdf-format-select">Output Format</Label>
                  <Select value={pdfImageFormat} onValueChange={(value: ImageFormat) => setPdfImageFormat(value)}>
                    <SelectTrigger id="pdf-format-select">
                      <SelectValue placeholder="Select a format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="png">PNG</SelectItem>
                      <SelectItem value="jpeg">JPG</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="pdf-quality-slider">Image Quality</Label>
                    <span className="text-sm font-medium text-muted-foreground">{pdfImageQuality}%</span>
                  </div>
                  <Slider
                    id="pdf-quality-slider"
                    min={10}
                    max={100}
                    step={5}
                    value={[pdfImageQuality]}
                    onValueChange={(value) => setPdfImageQuality(value[0])}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      );
    }

    return null;
  };

  const supportedFormats = useMemo(() =>
    fileAccept.replaceAll('image/', '.').replaceAll('application/', '.'),
    [fileAccept]
  );

  const renderFileBasedUI = () => {

    return (
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
                <UploadCloud className="mx-auto h-12 w-12 text-muted-foreground" />
                <p className="mt-4 text-sm text-muted-foreground">
                  Drag and drop files here, or click to select files
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Supported: {supportedFormats}
                </p>
                <input
                  ref={fileInputRef}
                  id="file-upload"
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                  accept={fileAccept}
                  multiple
                />
              </div>

              {files.length > 0 && (
                <div className="mt-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-medium">
                      Uploaded Files ({files.length}):
                    </h3>
                    {files.length > 1 && (
                      <Button variant="outline" size="sm" onClick={clearAllFiles}>
                        Clear All
                      </Button>
                    )}
                  </div>
                  <ul className="divide-y divide-border border rounded-md">
                    {files.map(file => (
                      <li key={`${file.name}-${file.lastModified}`} className="flex items-center justify-between p-3">
                        <div className="flex items-center gap-3">
                          <File className="h-5 w-5 text-muted-foreground" strokeWidth={1.5} />
                          <span className="text-sm font-medium">{file.name}</span>
                          <span className="text-xs text-muted-foreground">
                            ({(file.size / 1024 / 1024).toFixed(2)} MB)
                          </span>
                        </div>
                        <Button variant="ghost" size="icon" onClick={() => removeFile(file.name)}>
                          <X className="h-4 w-4" strokeWidth={1.5} />
                        </Button>
                      </li>
                    ))}
                  </ul>
                  {files.length > 1 && (
                    <div className="mt-4 text-center">
                      <p className="text-sm text-muted-foreground">
                        Note: Currently processing only the first file. Multi-file support coming soon.
                      </p>
                    </div>
                  )}
                </div>
              )}

              {renderToolOptions()}

              <div className="mt-8 text-center">
                <Button
                  size="lg"
                  className="bg-accent hover:bg-accent/90 text-accent-foreground"
                  disabled={files.length === 0 || status !== 'idle'}
                  onClick={handleProcessFiles}
                >
                  Process File
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </>
    );
  };

  const renderPdfToImageResults = () => {
    if (convertedImages.length === 0) return null;

    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center mb-6">
            <h3 className="text-lg font-medium mb-2">Conversion Complete!</h3>
            <p className="text-muted-foreground">
              Your PDF has been converted to {convertedImages.length} {pdfImageFormat.toUpperCase()} images.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {convertedImages.map((blob, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="aspect-video bg-muted rounded mb-2 flex items-center justify-center">
                  <ImageIcon className="h-8 w-8 text-muted-foreground" />
                </div>
                <p className="text-sm font-medium text-center">Page {index + 1}</p>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full mt-2"
                  onClick={() => downloadImage(blob, `page-${index + 1}.${pdfImageFormat}`)}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground"
              onClick={downloadAllImages}
            >
              <Download className="h-5 w-5 mr-2" />
              Download All Images
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  const renderToolUI = () => {
    if (!tool) return <p>Tool not found.</p>;

    if (tool.name === 'PDF to JPG' && convertedImages.length > 0) {
      return renderPdfToImageResults();
    }

    return renderFileBasedUI();
  };

  return (
    <div className="flex min-h-screen flex-col bg-background pt-24">
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center p-4 bg-accent/10 dark:bg-accent/20 rounded-full mb-4">
                <Icon className="h-12 w-12 text-accent" />
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