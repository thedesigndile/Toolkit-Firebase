
"use client";

import { useState, useCallback, useMemo, useRef } from 'react';
import { tools, Tool } from '@/lib/tools';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UploadCloud, File, X, Download, ImageIcon, Sparkles, Zap, PlusCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { getFileAccept, validateFileSize, downloadBlob, mergePdfs, splitPdf, compressPdf, pdfToImages } from '@/lib/tool-functions';
import { Footer } from '@/components/footer';
import { useProgress } from '@/components/progress-provider';
import { ProgressDisplay } from '@/components/progress-display';
import { TextToSpeechComponent } from '@/components/tools/text-to-speech';
import { PasswordGenerator } from '@/components/tools/password-generator';
import { VoiceRecorderComponent } from '@/components/tools/voice-recorder';
import { WebsiteToPdfForm } from '@/components/tools/website-to-pdf-form';
import { SplitPdfOptions } from '@/components/tools/split-pdf-options';
import { CompressPdfOptions } from '@/components/tools/compress-pdf-options';
import { motion } from 'framer-motion';
import { useAccessibility, AccessibleButton } from '@/components/accessibility-provider';

type ImageFormat = "png" | "jpeg" | "webp";

export function ToolPageClient({ params }: { params: { slug: string } }): JSX.Element | null {
  const { announceToScreenReader, highContrast } = useAccessibility();

  const tool: Tool | undefined = useMemo(() => {
    return tools.find(t => t.name.toLowerCase().replace(/ /g, '-').replace(/&/g, 'and') === params.slug);
  }, [params.slug]);

  const {
    progress, setProgress,
    status, setStatus,
    files, setFiles,
    error, setError,
    processedUrl, setProcessedUrl,
    processedFileName, setProcessedFileName,
    resetState,
  } = useProgress();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const addMoreFilesInputRef = useRef<HTMLInputElement>(null);

  // Tool-specific options state
  const [splitOptions, setSplitOptions] = useState({ mode: 'ranges', ranges: [{ from: 1, to: 1 }], extractMode: 'all', selectedPages: '' });
  const [compressLevel, setCompressLevel] = useState('recommended');
  const [pdfImageFormat, setPdfImageFormat] = useState<ImageFormat>('png');
  const [pdfImageQuality, setPdfImageQuality] = useState(90);
  const [convertedImages, setConvertedImages] = useState<Blob[]>([]);

  const { toast } = useToast();
  const fileAccept = useMemo(() => tool ? getFileAccept(tool.category, tool.name) : '*/*', [tool]);

  if (!tool) {
    notFound();
    return null;
  }

  const Icon = tool.icon;

  const validateAndSetFiles = useCallback((newFiles: File[], isAddingMore: boolean = false) => {
    const validFiles = newFiles.filter(file => {
      const sizeValidation = validateFileSize(file, tool.category);
      if (!sizeValidation.valid) {
        toast({ variant: "destructive", title: "File Too Large", description: sizeValidation.error });
        return false;
      }
      return true;
    });

    if (validFiles.length > 0) {
      setFiles(prevFiles => isAddingMore ? [...prevFiles, ...validFiles] : validFiles);
      announceToScreenReader(`Uploaded ${validFiles.length} file(s).`, 'polite');
    }
  }, [tool.category, setFiles, toast, announceToScreenReader]);

  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>, isAddingMore: boolean = false) => {
    if (event.target.files) {
      validateAndSetFiles(Array.from(event.target.files), isAddingMore);
    }
  }, [validateAndSetFiles]);

  const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (event.dataTransfer.files) {
      validateAndSetFiles(Array.from(event.dataTransfer.files));
    }
  }, [validateAndSetFiles]);

  const removeFile = useCallback((fileName: string) => {
    setFiles(prevFiles => prevFiles.filter(f => f.name !== fileName));
    announceToScreenReader(`Removed file: ${fileName}`, 'polite');
  }, [setFiles, announceToScreenReader]);

  const downloadProcessedFile = useCallback((blob: Blob, filename: string) => {
    try {
      downloadBlob(blob, filename);
    } catch (error) {
      toast({ variant: "destructive", title: "Download Failed", description: "Failed to download the file. Please try again." });
    }
  }, [toast]);

  const handleProcessFiles = async () => {
    if (files.length === 0 || !tool) return;
  
    resetState();
    setStatus('processing');
    setProgress(10); // Initial progress
  
    try {
      let resultBlob: Blob | Blob[];
      let resultFilename = 'download';
  
      switch (tool.processorType) {
        case 'split-pdf':
          resultBlob = await splitPdf(files[0], splitOptions, setProgress);
          resultFilename = `${files[0].name.replace('.pdf', '')}-split.zip`;
          break;
        case 'merge-pdf':
          resultBlob = await mergePdfs(files, setProgress);
          resultFilename = 'merged.pdf';
          break;
        case 'compress-pdf':
          resultBlob = await compressPdf(files[0], compressLevel, setProgress);
          resultFilename = `${files[0].name.replace('.pdf', '')}-compressed.pdf`;
          break;
        case 'pdf-to-image':
          const images = await pdfToImages(files[0], pdfImageFormat, pdfImageQuality / 100, setProgress);
          setConvertedImages(images);
          resultBlob = new Blob(); // Placeholder, direct download handled
          break;
        default:
          // Placeholder for other tools
          await new Promise(resolve => setTimeout(resolve, 1000));
          resultBlob = files[0];
          resultFilename = `processed-${files[0].name}`;
      }
  
      setProgress(100);
      setStatus('complete');
      
      if (tool.processorType !== 'pdf-to-image') {
        const url = URL.createObjectURL(resultBlob as Blob);
        setProcessedUrl(url);
        setProcessedFileName(resultFilename);
      }
  
      toast({ title: "Success!", description: `Your file has been processed.` });
  
    } catch (e: any) {
      setError(e.message || "An unknown error occurred.");
      setStatus('error');
      setProgress(0);
      toast({ variant: "destructive", title: "Processing Failed", description: e.message });
    }
  };

  const renderToolOptions = () => {
    if (files.length === 0 || status !== 'idle' || !tool) return null;
  
    switch (tool.processorType) {
      case 'split-pdf':
        return <SplitPdfOptions options={splitOptions} setOptions={setSplitOptions} totalPages={files[0]?.size ? 100 : 0} />; // Placeholder for total pages
      case 'compress-pdf':
        return <CompressPdfOptions level={compressLevel} setLevel={setCompressLevel} />;
      case 'pdf-to-image':
        return (
          <div className="mt-4">
             {/* PDF to Image options can be added here if needed */}
          </div>
        );
      default:
        return null;
    }
  };

  const renderFileBasedUI = () => {
    const showAddMore = tool.processorType === 'merge-pdf';

    return (
      <>
        {status !== 'idle' ? (
          <ProgressDisplay />
        ) : (
          <Card className="max-w-4xl w-full mx-auto bg-card/80 backdrop-blur-sm border-border/50">
            <CardHeader className="text-center">
              <motion.div className="inline-flex items-center justify-center p-4 bg-primary/10 rounded-full mb-4 mx-auto" whileHover={{ rotate: 360, scale: 1.1 }} transition={{ duration: 0.6 }}>
                <Icon className="h-12 w-12 text-primary" />
              </motion.div>
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">{tool.name}</CardTitle>
              <p className="text-muted-foreground mt-2 text-lg">{tool.description}</p>
            </CardHeader>
            <CardContent>
              {files.length === 0 ? (
                <div
                  className="border-2 border-dashed border-border rounded-xl p-12 text-center cursor-pointer hover:border-primary/50 transition-all duration-300 bg-background/50"
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  tabIndex={0}
                >
                  <UploadCloud className="mx-auto h-16 w-16 text-primary mb-4" />
                  <p className="text-lg font-medium mb-2">Drag & drop files here, or click to select</p>
                  <p className="text-sm text-muted-foreground">Supported formats: {fileAccept.replaceAll('application/', '.')}</p>
                  <input ref={fileInputRef} type="file" className="hidden" onChange={handleFileChange} accept={fileAccept} multiple={showAddMore} />
                </div>
              ) : (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <h3 className="text-xl font-semibold mb-4 text-center">Your Files</h3>
                  <ul className="space-y-3">
                    {files.map((file) => (
                      <li key={`${file.name}-${file.lastModified}`} className="flex items-center justify-between p-3 border rounded-lg bg-background/70">
                        <div className="flex items-center gap-3 overflow-hidden">
                          <File className="h-6 w-6 text-primary flex-shrink-0" />
                          <div className="overflow-hidden">
                            <p className="text-sm font-medium truncate">{file.name}</p>
                            <p className="text-xs text-muted-foreground">({(file.size / 1024 / 1024).toFixed(2)} MB)</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="icon" onClick={() => removeFile(file.name)}>
                          <X className="h-4 w-4" />
                        </Button>
                      </li>
                    ))}
                  </ul>
                  
                  {showAddMore && (
                    <div className="mt-4 text-center">
                      <Button variant="outline" onClick={() => addMoreFilesInputRef.current?.click()}>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Add More Files
                      </Button>
                      <input ref={addMoreFilesInputRef} type="file" className="hidden" onChange={(e) => handleFileChange(e, true)} accept={fileAccept} multiple />
                    </div>
                  )}
                </motion.div>
              )}

              {renderToolOptions()}

              <div className="mt-8 text-center">
                <AccessibleButton
                  onClick={handleProcessFiles}
                  disabled={files.length === 0 || status !== 'idle'}
                  loading={status === 'processing'}
                  variant="primary"
                  size="lg"
                  className="px-8 py-3 text-lg font-semibold"
                >
                  <div className="flex items-center gap-2">
                    <Zap className="h-5 w-5" />
                    {status === 'processing' ? 'Processing...' : tool.name}
                    <Sparkles className="h-4 w-4" />
                  </div>
                </AccessibleButton>
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
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
            {convertedImages.map((blob, index) => (
              <div key={index} className="border rounded-lg p-2">
                <div className="aspect-w-1 aspect-h-1 bg-muted rounded mb-2 flex items-center justify-center">
                  <ImageIcon className="h-8 w-8 text-muted-foreground" />
                </div>
                <p className="text-xs font-medium text-center truncate">Page {index + 1}</p>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full mt-2"
                  onClick={() => downloadProcessedFile(blob, `page-${index + 1}.${pdfImageFormat}`)}
                >
                  <Download className="h-3 w-3 mr-1" />
                  Download
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  };

  const renderToolUI = () => {
    if (!tool) return <p>Tool not found.</p>;

    if (tool.processorType === 'website-to-pdf') {
      return <WebsiteToPdfForm />;
    }

    if (tool.isStandalone) {
        if (tool.name === 'Text to Speech') return <TextToSpeechComponent />;
        if (tool.name === 'Password Generator') return <PasswordGenerator />;
        if (tool.name === 'Voice Recorder') return <VoiceRecorderComponent />;
    }

    if (tool.processorType === 'pdf-to-image' && status === 'complete' && convertedImages.length > 0) {
      return renderPdfToImageResults();
    }

    if (status === 'complete' && processedUrl) {
      return <ProgressDisplay />;
    }

    return renderFileBasedUI();
  };

  return (
    <div className="flex min-h-screen flex-col bg-transparent pt-24">
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
