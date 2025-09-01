
"use client";

import { useState, useCallback, useMemo, useRef } from 'react';
import { tools, Tool } from '@/lib/tools';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UploadCloud, File, X, Download, ImageIcon, Sparkles, Zap, PlusCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  getFileAccept, validateFileSize, downloadBlob, mergePdfs, splitPdf, compressPdf, pdfToImages,
  compressImage, resizeImage, convertImage, cropImage, rotateImage, pdfToWord, wordToPdf,
  pdfToExcel, imagesToPdf, createZip, extractZip, generateQRCode, generatePassword,
  convertText, countTextStats, markdownToHtml, htmlToMarkdown, base64Encode, base64Decode,
  urlEncode, urlDecode, enhanceImage
} from '@/lib/tool-functions';
import type { SplitOptions } from '@/lib/tool-functions';
import { Footer } from '@/components/footer';
import { useProgress } from '@/components/progress-provider';
import { ProgressDisplay } from '@/components/progress-display';
import { TextToSpeechComponent } from '@/components/tools/text-to-speech';
import { PasswordGenerator } from '@/components/tools/password-generator';
import { VoiceRecorderComponent } from '@/components/tools/voice-recorder';
import { WebsiteToPdfForm } from '@/components/tools/website-to-pdf-form';
import { SplitPdfOptions } from '@/components/tools/split-pdf-options';
import { CompressPdfOptions } from '@/components/tools/compress-pdf-options';
import { ImageOptions } from '@/components/tools/image-options';
import { UtilityOptions } from '@/components/tools/utility-options';
import { motion } from 'framer-motion';
import { useAccessibility, AccessibleButton } from '@/components/accessibility-provider';

type ImageFormat = "png" | "jpeg" | "webp";
type ToolResult = string | { [key: string]: number | string } | null;


export function ToolPageClient({ params }: { params: { slug: string } }): JSX.Element | null {
  const { announceToScreenReader } = useAccessibility();

  const tool: Tool | undefined = useMemo(() => {
    return tools.find(t => t.name.toLowerCase().replace(/ /g, '-').replace(/&/g, 'and') === params.slug);
  }, [params.slug]);

  const {
    setProgress,
    status, setStatus,
    files, setFiles,
    setError,
    processedUrl, setProcessedUrl,
    setProcessedFileName,
    setCurrentStep,
    setEstimatedTime,
    setProcessingStartTime,
  } = useProgress();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const addMoreFilesInputRef = useRef<HTMLInputElement>(null);

  // Tool-specific options state
  const [splitOptions, setSplitOptions] = useState<SplitOptions>({ mode: 'ranges', ranges: [{ from: 1, to: 1 }], extractMode: 'all', selectedPages: '' });
  const [compressLevel, setCompressLevel] = useState('recommended');
  const [pdfImageFormat] = useState<ImageFormat>('png');
  const [pdfImageQuality, setPdfImageQuality] = useState(90);
  const [convertedImages, setConvertedImages] = useState<Blob[]>([]);
  
  // Advanced image tool options
  const [imageOptions, setImageOptions] = useState({
    quality: 80,
    width: 800,
    height: 600,
    format: 'jpg',
    x: 0,
    y: 0,
    cropWidth: 100,
    cropHeight: 100,
    angle: 90,
    customAngle: 0,
    brightness: 100,
    contrast: 100,
    saturation: 100,
    maintainAspectRatio: true,
  });
  
  // Advanced utility tool options
  const [utilityOptions, setUtilityOptions] = useState({
    // Password generator
    length: 12,
    characterTypes: {
      uppercase: true,
      lowercase: true,
      numbers: true,
      symbols: false,
      similar: false,
      ambiguous: false,
    },
    // QR Code generator
    size: 200,
    errorCorrection: 'M',
    foregroundColor: '#000000',
    backgroundColor: '#ffffff',
    // Text converter
    operation: 'uppercase',
    mode: 'encode',
    // Word counter
    showReadingTime: true,
    showKeywordDensity: false,
  });
  
  // Text input for utility tools
  const [textInput, setTextInput] = useState('');
  const [toolResult, setToolResult] = useState<ToolResult>(null);

  const { toast } = useToast();
  const fileAccept = useMemo(() => tool ? getFileAccept(tool.category, tool.name) : '*/*', [tool]);

  const validateAndSetFiles = useCallback((newFiles: File[], isAddingMore: boolean = false) => {
    if (!tool) return;
    setStatus('uploading');
    setProgress(0);

    const validFiles = newFiles.filter(file => {
      const sizeValidation = validateFileSize(file, tool.category);
      if (!sizeValidation.valid) {
        toast({ variant: "destructive", title: "File Too Large", description: sizeValidation.error });
        return false;
      }
      return true;
    });

    // Simulate upload/preparation time
    setTimeout(() => {
      if (validFiles.length > 0) {
        setFiles(prevFiles => isAddingMore ? [...prevFiles, ...validFiles] : validFiles);
        announceToScreenReader(`Uploaded ${validFiles.length} file(s).`, 'polite');
      }
      setStatus('idle');
    }, 1500); // 1.5 second delay for animation
  }, [tool, setFiles, toast, announceToScreenReader, setStatus, setProgress]);


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
    } catch (err) {
      const error = err as Error
      toast({ variant: "destructive", title: "Download Failed", description: error.message || "Failed to download the file. Please try again." });
    }
  }, [toast]);

  const handleProcessFiles = useCallback(async () => {
    if (!tool) return;
  
    // Check if files are needed for this tool
    const needsFiles = !tool.name.includes('Password Generator') &&
                      !tool.name.includes('QR Code Generator') &&
                      !tool.name.includes('Text Case Converter') &&
                      !tool.name.includes('Character & Word Counter') &&
                      !tool.name.includes('Lorem Ipsum') &&
                      !tool.name.includes('Notepad');
    
    if (needsFiles && files.length === 0) return;
  
    setStatus('processing');
    setProgress(10);
    setError(null);
    setProcessedUrl(null);
    setProcessedFileName('download');
    setProcessingStartTime(Date.now());
    setCurrentStep('Initializing...');
    
    // Estimate processing time based on file size and tool type
    const totalSize = files.reduce((sum, file) => sum + file.size, 0);
    const baseTime = tool.category.includes('PDF') ? 3000 :
                    tool.category.includes('Image') ? 2000 : 1000;
    const sizeMultiplier = Math.max(1, totalSize / (1024 * 1024)); // MB
    setEstimatedTime(baseTime * sizeMultiplier);
  
    try {
      let resultBlob: Blob | Blob[];
      let resultFilename = 'download';
      const baseFilename = files[0]?.name.split('.')[0] || 'processed';
  
      // Handle each tool type
      switch (tool.name) {
        // PDF Tools
        case 'Split PDF':
          setCurrentStep('Loading PDF document...');
          await new Promise(r => setTimeout(r, 200));
          setCurrentStep('Analyzing page structure...');
          await new Promise(r => setTimeout(r, 300));
          setCurrentStep('Splitting pages...');
          resultBlob = await splitPdf(files[0], splitOptions, setProgress);
          resultFilename = `${baseFilename}-split.zip`;
          break;
        case 'Merge PDF':
          setCurrentStep('Loading PDF documents...');
          await new Promise(r => setTimeout(r, 200));
          setCurrentStep('Merging pages...');
          resultBlob = await mergePdfs(files, setProgress);
          resultFilename = 'merged.pdf';
          break;
        case 'Compress PDF':
          setCurrentStep('Analyzing PDF structure...');
          await new Promise(r => setTimeout(r, 200));
          setCurrentStep('Compressing content...');
          resultBlob = await compressPdf(files[0], compressLevel, setProgress);
          resultFilename = `${baseFilename}-compressed.pdf`;
          break;
        case 'PDF to JPG':
        case 'PDF to PNG':
          setCurrentStep('Loading PDF...');
          await new Promise(r => setTimeout(r, 200));
          setCurrentStep('Converting pages to images...');
          const images = await pdfToImages(files[0], tool.name.includes('JPG') ? 'jpeg' : 'png', pdfImageQuality / 100, setProgress);
          setConvertedImages(images);
          resultBlob = new Blob(); // Handled separately
          break;
        case 'PDF to Word':
          setCurrentStep('Extracting text from PDF...');
          resultBlob = await pdfToWord(files[0], setProgress);
          resultFilename = `${baseFilename}.docx`;
          break;
        case 'PDF to Excel':
          setCurrentStep('Extracting data tables...');
          resultBlob = await pdfToExcel(files[0], setProgress);
          resultFilename = `${baseFilename}.xlsx`;
          break;
        case 'Word to PDF':
          setCurrentStep('Converting document layout...');
          resultBlob = await wordToPdf(files[0], setProgress);
          resultFilename = `${baseFilename}.pdf`;
          break;
        case 'JPG to PDF':
        case 'Image to PDF':
          setCurrentStep('Processing images...');
          await new Promise(r => setTimeout(r, 200));
          setCurrentStep('Creating PDF pages...');
          resultBlob = await imagesToPdf(files, setProgress);
          resultFilename = 'images.pdf';
          break;
          
        // Image Tools
        case 'Compress Image':
        case 'Image Compressor':
          resultBlob = await compressImage(files[0], imageOptions.quality, setProgress);
          resultFilename = `${baseFilename}-compressed.${imageOptions.format === 'jpg' ? 'jpg' : 'png'}`;
          break;
        case 'Resize Image':
        case 'Image Resizer':
          resultBlob = await resizeImage(files[0], imageOptions.width, imageOptions.height, setProgress);
          resultFilename = `${baseFilename}-resized.png`;
          break;
        case 'Convert Image':
        case 'Image Converter':
          resultBlob = await convertImage(files[0], imageOptions.format, setProgress);
          resultFilename = `${baseFilename}.${imageOptions.format}`;
          break;
        case 'Crop Image':
          resultBlob = await cropImage(files[0], imageOptions.x, imageOptions.y, imageOptions.cropWidth, imageOptions.cropHeight, setProgress);
          resultFilename = `${baseFilename}-cropped.png`;
          break;
        case 'Rotate Image':
          resultBlob = await rotateImage(files[0], imageOptions.angle, setProgress);
          resultFilename = `${baseFilename}-rotated.png`;
          break;
        case 'Photo Editor':
          resultBlob = await enhanceImage(files[0], {
            brightness: imageOptions.brightness,
            contrast: imageOptions.contrast,
            saturation: imageOptions.saturation
          }, setProgress);
          resultFilename = `${baseFilename}-enhanced.jpg`;
          break;
          
        // Archive Tools
        case 'Create Zip File':
          resultBlob = await createZip(files, setProgress);
          resultFilename = 'archive.zip';
          break;
        case 'Zip File Extractor':
          resultBlob = await extractZip(files[0], setProgress);
          resultFilename = 'extracted.zip';
          break;
          
        // Utility Tools - No file processing needed
        case 'QR Code Generator':
          if (!textInput.trim()) {
            throw new Error('Please enter text for QR code generation');
          }
          resultBlob = await generateQRCode(textInput, utilityOptions.size, setProgress);
          resultFilename = 'qrcode.png';
          break;
        case 'Password Generator':
          const password = generatePassword(utilityOptions.length, utilityOptions.characterTypes);
          setToolResult(password);
          const passwordBlob = new Blob([password], { type: 'text/plain' });
          resultBlob = passwordBlob;
          resultFilename = 'password.txt';
          setProgress(100);
          break;
        case 'Text Case Converter':
          if (!textInput.trim()) {
            throw new Error('Please enter text to convert');
          }
          const convertedText = convertText(textInput, utilityOptions.operation as 'uppercase' | 'lowercase' | 'capitalize' | 'sentencecase' | 'inversecase');
          setToolResult(convertedText);
          const textBlob = new Blob([convertedText], { type: 'text/plain' });
          resultBlob = textBlob;
          resultFilename = 'converted-text.txt';
          setProgress(100);
          break;
        case 'Character & Word Counter':
          if (!textInput.trim()) {
            throw new Error('Please enter text to analyze');
          }
          const stats = countTextStats(textInput);
          setToolResult(stats);
          const statsText = `Text Statistics:
Characters: ${stats.characters}
Characters (no spaces): ${stats.charactersNoSpaces}
Words: ${stats.words}
Sentences: ${stats.sentences}
Paragraphs: ${stats.paragraphs}`;
          const statsBlob = new Blob([statsText], { type: 'text/plain' });
          resultBlob = statsBlob;
          resultFilename = 'text-stats.txt';
          setProgress(100);
          break;
        case 'Markdown <-> HTML':
          if (!textInput.trim()) {
            throw new Error('Please enter markdown or HTML to convert');
          }
          const isHtml = textInput.trim().startsWith('<');
          const converted = isHtml ? htmlToMarkdown(textInput) : markdownToHtml(textInput);
          setToolResult(converted);
          const convertedBlob = new Blob([converted], { type: 'text/plain' });
          resultBlob = convertedBlob;
          resultFilename = isHtml ? 'converted.md' : 'converted.html';
          setProgress(100);
          break;
        case 'Base64 Encoder/Decoder':
          if (!textInput.trim()) {
            throw new Error('Please enter text to encode/decode');
          }
          let processedText: string;
          if (utilityOptions.mode === 'encode') {
            processedText = base64Encode(textInput);
            resultFilename = 'encoded.txt';
          } else {
            try {
              processedText = base64Decode(textInput);
              resultFilename = 'decoded.txt';
            } catch {
              throw new Error('Invalid Base64 input');
            }
          }
          setToolResult(processedText);
          const processedBlob = new Blob([processedText], { type: 'text/plain' });
          resultBlob = processedBlob;
          setProgress(100);
          break;
        case 'URL Encoder/Decoder':
          if (!textInput.trim()) {
            throw new Error('Please enter URL to encode/decode');
          }
          let processedUrlText: string;
          if (utilityOptions.mode === 'encode') {
            processedUrlText = urlEncode(textInput);
            resultFilename = 'encoded-url.txt';
          } else {
            try {
              processedUrlText = urlDecode(textInput);
              resultFilename = 'decoded-url.txt';
            } catch {
              throw new Error('Invalid URL encoding');
            }
          }
          setToolResult(processedUrlText);
          const urlBlob = new Blob([processedUrlText], { type: 'text/plain' });
          resultBlob = urlBlob;
          setProgress(100);
          break;
          
        default:
          // For unimplemented tools, show helpful message
          throw new Error(`${tool.name} functionality is coming soon! This tool is currently under development.`);
      }
  
      setProgress(100);
      setStatus('complete');
      
      if (tool.name !== 'PDF to JPG' && tool.name !== 'PDF to PNG') {
        const url = URL.createObjectURL(resultBlob as Blob);
        setProcessedUrl(url);
        setProcessedFileName(resultFilename);
      }
  
      toast({ title: "Success!", description: `${tool.name} completed successfully!` });
  
    } catch (e: unknown) {
      const error = e as Error;
      setError(error.message || "An unknown error occurred.");
      setStatus('error');
      setProgress(0);
      toast({ variant: "destructive", title: "Processing Failed", description: error.message });
    }
  },[tool, files, setStatus, setProgress, setError, setProcessedUrl, setProcessedFileName, setCurrentStep, setEstimatedTime, setProcessingStartTime, splitOptions, compressLevel, pdfImageQuality, imageOptions, utilityOptions, textInput, toast]);

  if (!tool) {
    notFound();
    return null;
  }

  const Icon = tool.icon;

  const renderToolOptions = () => {
    if (status !== 'idle' || !tool) return null;
    
    // Tools that don't need files
    const noFileTools = ['Password Generator', 'QR Code Generator', 'Text Case Converter',
                         'Character & Word Counter', 'Lorem Ipsum', 'Notepad', 'Markdown <-> HTML',
                         'Base64 Encoder/Decoder', 'URL Encoder/Decoder'];
    
    if (!noFileTools.includes(tool.name) && files.length === 0) return null;
  
    // PDF-specific tools
    if (tool.name === 'Split PDF') {
      return <SplitPdfOptions options={splitOptions} setOptions={setSplitOptions} totalPages={files[0]?.size ? 100 : 0} />;
    }
    if (tool.name === 'Compress PDF') {
      return <CompressPdfOptions level={compressLevel} setLevel={setCompressLevel} />;
    }
    if (tool.name === 'PDF to JPG' || tool.name === 'PDF to PNG') {
      return (
        <div className="mt-4 space-y-4">
          <h3 className="text-lg font-medium text-center">Image Quality</h3>
          <div className="flex items-center space-x-4">
            <label className="text-sm font-medium">Quality: {pdfImageQuality}%</label>
            <input
              type="range"
              min="10"
              max="100"
              value={pdfImageQuality}
              onChange={(e) => setPdfImageQuality(Number(e.target.value))}
              className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer tool-slider"
            />
          </div>
        </div>
      );
    }

    // Image tools
    const imageToolNames = ['Compress Image', 'Image Compressor', 'Resize Image', 'Image Resizer',
                           'Convert Image', 'Image Converter', 'Crop Image', 'Rotate Image', 'Photo Editor'];
    if (imageToolNames.includes(tool.name)) {
      return (
        <ImageOptions
          tool={tool.name}
          options={imageOptions}
          setOptions={setImageOptions}
        />
      );
    }

    // Utility tools
    const utilityToolNames = ['Password Generator', 'QR Code Generator', 'Text Case Converter',
                             'Character & Word Counter', 'Base64 Encoder/Decoder', 'URL Encoder/Decoder'];
    if (utilityToolNames.includes(tool.name)) {
      return (
        <UtilityOptions
          tool={tool.name}
          options={utilityOptions}
          setOptions={setUtilityOptions}
          textInput={textInput}
          setTextInput={setTextInput}
          result={toolResult}
        />
      );
    }

    return null;
  };

  const renderFileBasedUI = () => {
    const showAddMore = tool.processorType === 'merge-pdf';
    
    // Tools that don't need files
    const noFileTools = ['Password Generator', 'QR Code Generator', 'Text Case Converter',
                         'Character & Word Counter', 'Lorem Ipsum', 'Notepad', 'Markdown <-> HTML',
                         'Base64 Encoder/Decoder', 'URL Encoder/Decoder'];
    
    const needsFiles = !noFileTools.includes(tool.name);

    if (status === 'uploading' || status === 'processing' || status === 'error' || (status === 'complete' && processedUrl)) {
      return <ProgressDisplay />;
    }

    return (
          <Card className="max-w-4xl w-full mx-auto bg-card/80 backdrop-blur-sm border-border/50 tool-card">
            <CardHeader className="text-center tool-card-header px-4 sm:px-6">
              <motion.div className="inline-flex items-center justify-center p-3 sm:p-4 bg-primary/10 rounded-full mb-4 mx-auto" whileHover={{ rotate: 360, scale: 1.1 }} transition={{ duration: 0.6 }}>
                <div className="icon-gradient-container">
                    <Icon className="h-10 w-10 sm:h-12 sm:w-12" />
                </div>
              </motion.div>
              <CardTitle className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">{tool.name}</CardTitle>
              <p className="text-muted-foreground mt-2 text-base sm:text-lg px-2">{tool.description}</p>
            </CardHeader>
            <CardContent className="tool-card-content px-4 sm:px-6">
              {needsFiles ? (
                // File upload UI for tools that need files
                files.length === 0 ? (
                  <div
                    className="upload-zone border-2 border-dashed border-border rounded-xl p-6 sm:p-12 text-center cursor-pointer hover:border-primary/50 transition-all duration-300 bg-background/50"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    tabIndex={0}
                  >
                    <UploadCloud className="mx-auto h-12 w-12 sm:h-16 sm:w-16 text-primary mb-4" />
                    <p className="text-base sm:text-lg font-medium mb-2">Drag & drop files here, or click to select</p>
                    <p className="text-xs sm:text-sm text-muted-foreground px-2">Supported formats: {fileAccept.replaceAll('application/', '.')}</p>
                    <input ref={fileInputRef} type="file" className="hidden" onChange={handleFileChange} accept={fileAccept} multiple={showAddMore} />
                  </div>
                ) : (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fade-in">
                    <h3 className="text-lg sm:text-xl font-semibold mb-4 text-center">Your Files</h3>
                    <ul className="space-y-2 sm:space-y-3">
                      {files.map((file) => (
                        <li key={`${file.name}-${file.lastModified}`} className="file-item flex items-center justify-between p-3 sm:p-4 border rounded-lg bg-background/70">
                          <div className="flex items-center gap-2 sm:gap-3 overflow-hidden min-w-0 flex-1">
                            <File className="h-5 w-5 sm:h-6 sm:w-6 text-primary flex-shrink-0" />
                            <div className="overflow-hidden min-w-0 flex-1">
                              <p className="text-xs sm:text-sm font-medium truncate">{file.name}</p>
                              <p className="text-xs text-muted-foreground">({(file.size / 1024 / 1024).toFixed(2)} MB)</p>
                            </div>
                          </div>
                          <Button variant="ghost" size="icon" onClick={() => removeFile(file.name)} className="flex-shrink-0 ml-2">
                            <X className="h-4 w-4" />
                          </Button>
                        </li>
                      ))}
                    </ul>
                    
                    {showAddMore && (
                      <div className="mt-4 text-center">
                        <Button variant="outline" onClick={() => addMoreFilesInputRef.current?.click()} className="w-full sm:w-auto">
                          <PlusCircle className="mr-2 h-4 w-4" />
                          Add More Files
                        </Button>
                        <input ref={addMoreFilesInputRef} type="file" className="hidden" onChange={(e) => handleFileChange(e, true)} accept={fileAccept} multiple />
                      </div>
                    )}
                  </motion.div>
                )
              ) : (
                // No file upload for tools that don't need files
                <div className="text-center py-6">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="inline-flex items-center justify-center p-4 bg-muted/50 rounded-full mb-4"
                  >
                    <Icon className="h-8 w-8 text-primary" />
                  </motion.div>
                  <p className="text-muted-foreground text-sm sm:text-base">Configure your settings below and generate your result.</p>
                </div>
              )}

              {renderToolOptions()}

              <div className="mt-6 sm:mt-8 text-center">
                <AccessibleButton
                  onClick={handleProcessFiles}
                  disabled={needsFiles ? (files.length === 0 || status !== 'idle') : status !== 'idle'}
                  loading={status === 'processing'}
                  variant="primary"
                  size="lg"
                  className="w-full sm:w-auto px-6 sm:px-8 py-3 text-base sm:text-lg font-semibold tool-button-primary"
                >
                  <div className="flex items-center justify-center gap-2">
                    <Zap className="h-4 w-4 sm:h-5 sm:w-5" />
                    <span className="truncate">
                      {needsFiles ? tool.name :
                       tool.name.includes('Generator') ? 'Generate' :
                       tool.name.includes('Counter') ? 'Analyze' : 'Process'}
                    </span>
                    <Sparkles className="h-4 w-4" />
                  </div>
                </AccessibleButton>
              </div>
            </CardContent>
          </Card>
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
    
    return renderFileBasedUI();
  };

  return (
    <div className="flex min-h-screen flex-col bg-transparent pt-16 sm:pt-24">
      <main className="flex-1 relative z-10">
        <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-8">
          <div className="max-w-6xl mx-auto">
            {renderToolUI()}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
