"use client";

import { useState, useCallback, useMemo, useRef } from 'react';
import { tools } from '@/lib/tools';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { UploadCloud, File, X, Download, ImageIcon, Sparkles, Zap } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { getFileAccept, pdfToImages, validateFileSize, downloadBlob, checkMemoryLimit } from '@/lib/tool-functions';
import { Footer } from '@/components/footer';
import { useProgress } from '@/components/progress-provider';
import { ProgressDisplay } from '@/components/progress-display';
import { convertPdfToWord } from '@/app/actions';
import { TextToSpeechComponent } from '@/components/tools/text-to-speech';
import { PasswordGenerator } from '@/components/tools/password-generator';
import { VoiceRecorderComponent } from '@/components/tools/voice-recorder';
import { motion, useSpring } from 'framer-motion';
import styled from 'styled-components';
import { ParticleBackground, FloatingElements } from '@/components/particle-background';
import { useAccessibility, AccessibleButton } from '@/components/accessibility-provider';

// Enhanced Styled Components
const AnimatedCard = styled(motion.div)`
  background: linear-gradient(135deg, var(--primary-light), var(--secondary-light));
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  }
`;

const GlassmorphicContainer = styled(motion.div)`
  background: var(--glass-bg);
  backdrop-filter: blur(15px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 2rem;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%);
    animation: shimmer 3s ease-in-out infinite;
  }

  @keyframes shimmer {
    0%, 100% { transform: translateX(-100%); }
    50% { transform: translateX(100%); }
  }
`;

const EnhancedButton = styled(motion.button)`
  background: linear-gradient(135deg, var(--primary-light), var(--secondary-light));
  border: none;
  border-radius: 12px;
  padding: 1rem 2rem;
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
    transition: left 0.5s;
  }

  &:hover::before {
    left: 100%;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
  }

  &:active {
    transform: translateY(0);
  }
`;

const FloatingParticles = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: hidden;

  &::before,
  &::after {
    content: '';
    position: absolute;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.1) 70%, transparent 100%);
    animation: float-particle 8s ease-in-out infinite;
  }

  &::before {
    width: 40px;
    height: 40px;
    top: 20%;
    left: 10%;
    animation-delay: 0s;
  }

  &::after {
    width: 30px;
    height: 30px;
    top: 60%;
    right: 15%;
    animation-delay: 4s;
  }

  @keyframes float-particle {
    0%, 100% {
      transform: translateY(0px) translateX(0px) rotate(0deg);
      opacity: 0.3;
    }
    25% {
      transform: translateY(-20px) translateX(10px) rotate(90deg);
      opacity: 0.6;
    }
    50% {
      transform: translateY(-10px) translateX(-5px) rotate(180deg);
      opacity: 0.4;
    }
    75% {
      transform: translateY(-25px) translateX(15px) rotate(270deg);
      opacity: 0.7;
    }
  }
`;

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

  const handleProcessFiles = async () => {
    if (files.length === 0) return;

    const file = files[0];

    resetState();
    setStatus('processing');
    setProgress(0);

    const progressIntervalRef = { current: null as NodeJS.Timeout | null };

    // Simulate progress for a better user experience
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
      if (tool.name === 'PDF to Word') {
        const pdfDataUri = await fileToDataUri(file);
        const result = await convertPdfToWord(pdfDataUri);

        if (result.error) throw new Error(result.error);
        if (!result.docx) throw new Error("Conversion returned no data.");

        setProcessedUrl(result.docx);
        setProcessedFileName(`${file.name.replace(/\.pdf$/i, '')}.docx`);
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
        await new Promise(resolve => setTimeout(resolve, 1000));
        throw new Error(`The '${tool.name}' tool is not yet implemented.`);
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
    const scale = useSpring(1);

    return (
      <>
        {status !== 'idle' ? (
          <ProgressDisplay />
        ) : (
          <GlassmorphicContainer
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, type: 'spring' }}
            className="glass neumorphic max-w-4xl w-full mx-auto"
          >
            <FloatingParticles />
            <div className="relative z-10">
              <motion.div
                className="text-center mb-8"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <motion.div
                  className="inline-flex items-center justify-center p-4 bg-accent/10 dark:bg-accent/20 rounded-full mb-4"
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <Icon className="h-12 w-12 text-accent" />
                </motion.div>
                <motion.h2
                  className="text-3xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent"
                  animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                  transition={{ duration: 5, repeat: Infinity }}
                >
                  {tool.name}
                </motion.h2>
                <motion.p
                  className="text-muted-foreground mt-2 text-lg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  {tool.description}
                </motion.p>
              </motion.div>

              <motion.div
                className="border-2 border-dashed border-accent/40 dark:border-accent/50 rounded-xl p-12 text-center cursor-pointer hover:border-accent/60 dark:hover:border-accent/70 transition-all duration-300 hover:shadow-lg hover:shadow-accent/20 focus-within:ring-4 focus-within:ring-accent/20"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    fileInputRef.current?.click();
                  }
                }}
                whileHover={{ scale: 1.02, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
                whileTap={{ scale: 0.98 }}
                style={{ transform: scale.to(s => `scale(${s})`) }}
                onHoverStart={() => scale.set(1.05)}
                onHoverEnd={() => scale.set(1)}
                role="button"
                tabIndex={0}
                aria-label={`Upload files for ${tool?.name}. Supported formats: ${supportedFormats}`}
                aria-describedby="upload-instructions"
              >
                <motion.div
                  animate={reducedMotion ? {} : { y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <UploadCloud className="mx-auto h-16 w-16 text-accent mb-4" aria-hidden="true" />
                </motion.div>
                <motion.p
                  className="text-lg font-medium mb-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  id="upload-instructions"
                >
                  Drag and drop files here, or click to select files
                </motion.p>
                <motion.p
                  className="text-sm text-muted-foreground"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  aria-label={`Supported file formats: ${supportedFormats}`}
                >
                  Supported formats: {supportedFormats}
                </motion.p>
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
              </motion.div>

              {files.length > 0 && (
                <motion.div
                  className="mt-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <motion.h3
                      className="text-xl font-semibold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                    >
                      Uploaded Files ({files.length})
                    </motion.h3>
                    {files.length > 1 && (
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={clearAllFiles}
                          className="glass-button hover:glow-accent"
                        >
                          Clear All
                        </Button>
                      </motion.div>
                    )}
                  </div>
                  <motion.ul
                    className="space-y-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    {files.map((file, index) => (
                      <motion.li
                        key={`${file.name}-${file.lastModified}`}
                        className="flex items-center justify-between p-4 glass-card rounded-lg hover:glow-primary transition-all duration-300"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * index }}
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="flex items-center gap-3">
                          <motion.div
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.5 }}
                          >
                            <File className="h-6 w-6 text-accent" strokeWidth={1.5} />
                          </motion.div>
                          <div>
                            <span className="text-sm font-medium">{file.name}</span>
                            <span className="text-xs text-muted-foreground block">
                              ({(file.size / 1024 / 1024).toFixed(2)} MB)
                            </span>
                          </div>
                        </div>
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeFile(file.name)}
                            className="hover:bg-red-500/20 hover:text-red-500"
                          >
                            <X className="h-4 w-4" strokeWidth={1.5} />
                          </Button>
                        </motion.div>
                      </motion.li>
                    ))}
                  </motion.ul>
                  {files.length > 1 && (
                    <motion.div
                      className="mt-4 text-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6 }}
                    >
                      <p className="text-sm text-muted-foreground bg-yellow-500/10 p-3 rounded-lg">
                        ⚠️ Note: Currently processing only the first file. Multi-file support coming soon.
                      </p>
                    </motion.div>
                  )}
                </motion.div>
              )}

              {renderToolOptions()}

              <motion.div
                className="mt-12 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <AccessibleButton
                  onClick={handleProcessFiles}
                  disabled={files.length === 0 || status !== 'idle'}
                  loading={status === 'processing'}
                  variant="primary"
                  size="lg"
                  className="px-8 py-4 text-lg font-semibold bg-gradient-to-r from-accent to-primary hover:from-accent/90 hover:to-primary/90 text-white rounded-xl shadow-lg hover:shadow-xl glow-accent"
                  ariaLabel={files.length === 0 ? "No files selected. Please upload a file first." : `Process ${files.length} file${files.length > 1 ? 's' : ''} with ${tool?.name}`}
                  ariaDescribedBy="processing-status"
                >
                  <motion.div
                    className="flex items-center gap-2"
                    whileHover={{ gap: 8 }}
                  >
                    <Zap className="h-5 w-5" aria-hidden="true" />
                    {status === 'processing' ? 'Processing...' : 'Process File'}
                    <Sparkles className="h-4 w-4" aria-hidden="true" />
                  </motion.div>
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
              </motion.div>
            </div>
          </GlassmorphicContainer>
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
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-background via-background to-accent/5 pt-24 relative overflow-hidden">
      {/* Advanced Background Effects */}
      <ParticleBackground />
      <FloatingElements />

      {/* Enhanced gradient overlays */}
      <div className="absolute inset-0 bg-gradient-mesh opacity-20"></div>
      <motion.div
        className="absolute top-20 left-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.4, 0.7, 0.4]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />

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
