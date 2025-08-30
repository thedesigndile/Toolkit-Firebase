
"use client";

import { useState, useCallback, useMemo, useRef } from 'react';
import { tools } from '@/lib/tools';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UploadCloud, File, X, Download, ImageIcon, Sparkles, Zap } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { getFileAccept, pdfToImages, validateFileSize, downloadBlob, checkMemoryLimit } from '@/lib/tool-functions';
import { Footer } from '@/components/footer';
import { useProgress } from '@/components/progress-provider';
import { ProgressDisplay } from '@/components/progress-display';
import { TextToSpeechComponent } from '@/components/tools/text-to-speech';
import { PasswordGenerator } from '@/components/tools/password-generator';
import { VoiceRecorderComponent } from '@/components/tools/voice-recorder';
import { motion } from 'framer-motion';
import { useAccessibility, AccessibleButton } from '@/components/accessibility-provider';
import * as pdfjsLib from 'pdfjs-dist';
import { Document, Packer, Paragraph } from 'docx';
import { saveAs } from 'file-saver';

type ImageFormat = "png" | "jpeg" | "webp";

// Helper to convert file to data URI
const fileToDataUri = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export function ToolPageClient({ params }: { params: { slug: string } }): JSX.Element | null | undefined {
  // All hooks must be called before any early returns
  const { announceToScreenReader, reducedMotion } = useAccessibility();

  const tool = useMemo(() => {
    const foundTool = tools.find(t => t.name.toLowerCase().replace(/ /g, '-').replace(/&/g, 'and') === params.slug);
    return foundTool;
  }, [params.slug]);

  const {
    progress,
    setProgress,
    status, setStatus,
    files, setFiles,
    error, setError,
    processedUrl, setProcessedUrl,
    processedFileName, setProcessedFileName,
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
        announceToScreenReader(
          `Successfully uploaded ${validFiles.length} file${validFiles.length > 1 ? 's' : ''}: ${validFiles.map(f => f.name).join(', ')}`,
          'polite'
        );
      } else {
        announceToScreenReader('No valid files were uploaded. Please check the file format and try again.', 'assertive');
      }
    }
  }, [validateFiles, setFiles, announceToScreenReader]);

  const handleDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  }, []);

  const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (event.dataTransfer.files) {
      const validFiles = validateFiles(Array.from(event.dataTransfer.files));
      if (validFiles.length > 0) {
        setFiles(validFiles);
        announceToScreenReader(
          `Successfully uploaded ${validFiles.length} file${validFiles.length > 1 ? 's' : ''} via drag and drop: ${validFiles.map(f => f.name).join(', ')}`,
          'polite'
        );
      } else {
        announceToScreenReader('No valid files were dropped. Please check the file format and try again.', 'assertive');
      }
    }
  }, [validateFiles, setFiles, announceToScreenReader]);

  const removeFile = useCallback((fileName: string) => {
    setFiles(prevFiles => prevFiles.filter(f => f.name !== fileName));
    announceToScreenReader(`Removed file: ${fileName}`, 'polite');
  }, [setFiles, announceToScreenReader]);

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

  const handlePdfToWord = async (file: File) => {
      if (typeof window === 'undefined') {
        throw new Error('PDF processing is only available in the browser.');
      }
      if (!checkMemoryLimit(file.size, tool.name)) {
        throw new Error('This file is too large to process in your browser. Please try a smaller file.');
      }

      pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.mjs`;
      
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      const numPages = pdf.numPages;
      const paragraphs: Paragraph[] = [];
      
      for (let i = 1; i <= numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map(item => ('str' in item ? item.str : '')).join(' ');
        paragraphs.push(new Paragraph({ text: pageText }));
        setProgress(Math.round((i / numPages) * 100));
      }

      const doc = new Document({
        sections: [
          {
            children: paragraphs,
          },
        ],
      });
      
      const blob = await Packer.toBlob(doc);
      saveAs(blob, `${file.name.replace(/\.pdf$/i, '')}.docx`);
  };

  const handleProcessFiles = async () => {
    if (files.length === 0 || !tool) return;

    const file = files[0];

    resetState();
    setStatus('processing');
    setProgress(0);

    const progressIntervalRef = { current: null as NodeJS.Timeout | null };

    // Simulate progress for a better user experience
    if (tool.name !== 'PDF to Word') { // pdf to word has its own progress
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
    }
    
    try {
      if (tool.name === 'PDF to Word') {
        await handlePdfToWord(file);
      } else if (tool.name === 'PDF to JPG') {
        // Check if we're in browser environment
        if (typeof window === 'undefined') {
          throw new Error('PDF processing is only available in browser environment.');
        }
        if (!checkMemoryLimit(file.size, tool.name)) {
            throw new Error("This file is too large to process in your browser. Please try a smaller file.");
        }
        const format = pdfImageFormat === 'webp' ? 'png' : pdfImageFormat;
        const images = await pdfToImages(file, format as 'png' | 'jpeg', pdfImageQuality / 100);
        setConvertedImages(images);
      } else {
        // Fallback for other tools until they are implemented
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate processing
        setProcessedUrl(URL.createObjectURL(file)); // Simulate a result
        setProcessedFileName(`processed-${file.name}`);
      }

      // If we reach here, processing was successful for all tool types handled
      setProgress(100);
      setStatus('complete');
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
        progressIntervalRef.current = null;
      }
      toast({
        title: "Success!",
        description: `Your file has been processed successfully.`,
      });

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
    if (files.length === 0 || status !== 'idle' || !tool) return null;

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
          <Card className="max-w-4xl w-full mx-auto">
            <CardHeader className="text-center">
              <motion.div
                className="inline-flex items-center justify-center p-4 bg-primary/10 rounded-full mb-4 mx-auto"
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
              >
                <Icon className="h-12 w-12 text-primary" />
              </motion.div>
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                {tool.name}
              </CardTitle>
              <p className="text-muted-foreground mt-2 text-lg">
                {tool.description}
              </p>
            </CardHeader>
            <CardContent>
              <div
                className="border-2 border-dashed border-border rounded-xl p-12 text-center cursor-pointer hover:border-primary/50 transition-all duration-300 focus-within:ring-4 focus-within:ring-primary/20"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    fileInputRef.current?.click();
                  }
                }}
                role="button"
                tabIndex={0}
                aria-label={`Upload files for ${tool?.name}. Supported formats: ${supportedFormats}`}
                aria-describedby="upload-instructions"
              >
                <motion.div
                  animate={reducedMotion ? {} : { y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <UploadCloud className="mx-auto h-16 w-16 text-primary mb-4" aria-hidden="true" />
                </motion.div>
                <p className="text-lg font-medium mb-2" id="upload-instructions">
                  Drag and drop files here, or click to select files
                </p>
                <p className="text-sm text-muted-foreground" aria-label={`Supported file formats: ${supportedFormats}`}>
                  Supported formats: {supportedFormats}
                </p>
                <input
                  ref={fileInputRef}
                  id="file-upload"
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                  accept={fileAccept}
                  multiple
                  aria-label="File upload input"
                />
              </div>

              {files.length > 0 && (
                <motion.div
                  className="mt-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold">
                      Uploaded Files ({files.length})
                    </h3>
                    {files.length > 1 && (
                      <Button
                          variant="outline"
                          size="sm"
                          onClick={clearAllFiles}
                        >
                          Clear All
                      </Button>
                    )}
                  </div>
                  <ul className="space-y-2">
                    {files.map((file, index) => (
                      <motion.li
                        key={`${file.name}-${file.lastModified}`}
                        className="flex items-center justify-between p-3 border rounded-lg"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * index }}
                      >
                        <div className="flex items-center gap-3">
                          <File className="h-6 w-6 text-primary" strokeWidth={1.5} />
                          <div>
                            <span className="text-sm font-medium">{file.name}</span>
                            <span className="text-xs text-muted-foreground block">
                              ({(file.size / 1024 / 1024).toFixed(2)} MB)
                            </span>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeFile(file.name)}
                          className="hover:bg-destructive/20 hover:text-destructive"
                        >
                          <X className="h-4 w-4" strokeWidth={1.5} />
                        </Button>
                      </motion.li>
                    ))}
                  </ul>
                  {files.length > 1 && (
                    <div className="mt-4 text-center">
                      <p className="text-sm text-muted-foreground bg-yellow-500/10 p-3 rounded-lg">
                        ⚠️ Note: Currently processing only the first file. Multi-file support coming soon.
                      </p>
                    </div>
                  )}
                </motion.div>
              )}

              {renderToolOptions()}

              <div className="mt-12 text-center">
                <AccessibleButton
                  onClick={handleProcessFiles}
                  disabled={files.length === 0 || status !== 'idle'}
                  loading={status === 'processing'}
                  variant="primary"
                  size="lg"
                  className="px-8 py-3 text-lg font-semibold"
                  ariaLabel={files.length === 0 ? "No files selected. Please upload a file first." : `Process ${files.length} file${files.length > 1 ? 's' : ''} with ${tool?.name}`}
                  ariaDescribedBy="processing-status"
                >
                  <div className="flex items-center gap-2">
                    <Zap className="h-5 w-5" aria-hidden="true" />
                    {status === 'processing' ? 'Processing...' : 'Process File'}
                    <Sparkles className="h-4 w-4" aria-hidden="true" />
                  </div>
                </AccessibleButton>

                {/* Status announcement for screen readers */}
                <div
                  id="processing-status"
                  className="sr-only"
                  aria-live="polite"
                  aria-atomic="true"
                >
                  {status === 'processing' && "Processing your files, please wait..."}
                  {status === 'complete' && "File processing completed successfully"}
                  {status === 'error' && `Error: ${error}`}
                </div>
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
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
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

    // Handle standalone tools that don't need file upload
    if (tool.isStandalone) {
      if (tool.name === 'Text to Speech') {
        return <TextToSpeechComponent />;
      }
      if (tool.name === 'Password Generator') {
        return <PasswordGenerator />;
      }
      if (tool.name === 'Voice Recorder') {
        return <VoiceRecorderComponent />;
      }
      // Add other standalone tools here
    }

    if (tool.name === 'PDF to JPG' && status === 'complete' && convertedImages.length > 0) {
      return renderPdfToImageResults();
    }

    if (status === 'complete' && processedUrl) {
      return <ProgressDisplay />;
    }

    return renderFileBasedUI();
  };

  return (
    <div className="flex min-h-screen flex-col bg-background pt-24">
      <main className="flex-1 relative z-10">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            {renderToolUI()}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
