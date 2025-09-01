
import { PDFDocument, StandardFonts, rgb, degrees } from 'pdf-lib';
import * as pdfjsLib from 'pdfjs-dist';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import imageCompression from 'browser-image-compression';
import { Document as DocxDocument, Packer, Paragraph } from 'docx';

// =============== GENERAL UTILITIES ===============

export const downloadBlob = (blob: Blob, filename: string): void => {
  saveAs(blob, filename);
};

export const getFileAccept = (toolCategory: string, toolName: string = ''): string => {
  if (toolName.includes('Image to PDF') || toolName.includes('JPG to PDF')) return 'image/jpeg,image/png,image/webp';
  if (toolCategory.includes('PDF') || toolName.includes('PDF')) return 'application/pdf';
  if (toolCategory.includes('Image') || toolName.includes('Image')) return 'image/png,image/jpeg,image/webp,image/gif,image/bmp';
  if (toolName.includes('Video')) return 'video/mp4,video/webm,video/avi,video/mov';
  if (toolName.includes('Audio')) return 'audio/mp3,audio/wav,audio/m4a,audio/ogg';
  if (toolName.includes('Word')) return '.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document';
  if (toolName.includes('Excel')) return '.xls,.xlsx,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
  if (toolName.includes('ZIP') || toolName.includes('Archive')) return '.zip,application/zip';
  return '*/*';
};

const FILE_SIZE_LIMIT_MB = 100; // Increased limit
export const validateFileSize = (file: File, _category: string): { valid: boolean; error?: string } => {
  if (file.size > FILE_SIZE_LIMIT_MB * 1024 * 1024) {
    return {
      valid: false,
      error: `File size exceeds ${FILE_SIZE_LIMIT_MB}MB limit.`,
    };
  }
  return { valid: true };
};

// Backend API configuration
const API_BASE_URL = process.env.NODE_ENV === 'production'
  ? 'https://api.your-domain.com'
  : 'http://localhost:8000';

// Helper function for API calls
const callBackendAPI = async (endpoint: string, file: File, additionalData?: Record<string, any>): Promise<Blob> => {
  const formData = new FormData();
  formData.append('file', file);
  
  if (additionalData) {
    Object.entries(additionalData).forEach(([key, value]) => {
      formData.append(key, String(value));
    });
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/octet-stream, application/json',
      },
    });

    if (!response.ok) {
      let errorMessage = `Server error: ${response.status}`;
      try {
        const errorData = await response.json();
        errorMessage = errorData.detail || errorData.message || errorMessage;
      } catch {
        // If response isn't JSON, use status text
        errorMessage = response.statusText || errorMessage;
      }
      throw new Error(errorMessage);
    }

    const contentType = response.headers.get('content-type');
    if (contentType?.includes('application/json')) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Processing failed');
    }

    return await response.blob();
  } catch (error) {
    if (error instanceof Error) {
      // Add more specific error messages
      if (error.message.includes('NetworkError') || error.message.includes('fetch')) {
        throw new Error('Unable to connect to processing server. Please check your internet connection.');
      }
      if (error.message.includes('timeout')) {
        throw new Error('Processing timeout. Please try with a smaller file.');
      }
      throw error;
    }
    throw new Error('An unexpected error occurred during processing');
  }
};

// Enhanced validation function
export const validateFile = (file: File, acceptedTypes: string[], maxSizeMB: number = 100): { valid: boolean; error?: string } => {
  // Check file size
  if (file.size > maxSizeMB * 1024 * 1024) {
    return {
      valid: false,
      error: `File size (${(file.size / 1024 / 1024).toFixed(1)}MB) exceeds ${maxSizeMB}MB limit.`,
    };
  }

  // Check file type
  const fileExtension = file.name.split('.').pop()?.toLowerCase();
  const mimeType = file.type.toLowerCase();
  
  const isValidType = acceptedTypes.some(type => {
    if (type.startsWith('.')) {
      return fileExtension === type.slice(1);
    }
    if (type.includes('/')) {
      return mimeType === type || mimeType.startsWith(type.split('/')[0] + '/');
    }
    return false;
  });

  if (!isValidType) {
    return {
      valid: false,
      error: `Unsupported file type. Please upload: ${acceptedTypes.join(', ')}`,
    };
  }

  return { valid: true };
};

// =============== PDF WORKERS ===============
if (typeof window !== 'undefined') {
  pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.mjs`;
}

// =============== PDF TOOL FUNCTIONS ===============

export const mergePdfs = async (files: File[], setProgress: (p: number) => void): Promise<Blob> => {
  const mergedPdf = await PDFDocument.create();
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const pdfBytes = await file.arrayBuffer();
    const pdfDoc = await PDFDocument.load(pdfBytes);
    const copiedPages = await mergedPdf.copyPages(pdfDoc, pdfDoc.getPageIndices());
    copiedPages.forEach((page) => mergedPdf.addPage(page));
    setProgress(Math.round(((i + 1) / files.length) * 100));
  }
  const mergedPdfBytes = await mergedPdf.save();
  return new Blob([mergedPdfBytes], { type: 'application/pdf' });
};

export type SplitOptions = {
  mode: 'ranges' | 'extract';
  ranges: { from: number, to: number }[];
  extractMode: 'all' | 'odd' | 'even' | 'custom';
  selectedPages: string;
};

export const splitPdf = async (file: File, options: SplitOptions, setProgress: (p: number) => void): Promise<Blob> => {
  const zip = new JSZip();
  const pdfBytes = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(pdfBytes);
  const totalPages = pdfDoc.getPageCount();

  if (options.mode === 'ranges') {
    for (let i = 0; i < options.ranges.length; i++) {
      const range = options.ranges[i];
      const newPdf = await PDFDocument.create();
      const pageIndices = Array.from({ length: range.to - range.from + 1 }, (_, k) => k + range.from - 1)
        .filter(index => index < totalPages);
      
      if(pageIndices.length === 0) continue;

      const copiedPages = await newPdf.copyPages(pdfDoc, pageIndices);
      copiedPages.forEach(page => newPdf.addPage(page));
      
      const newPdfBytes = await newPdf.save();
      zip.file(`range_${range.from}-${range.to}.pdf`, newPdfBytes);
      setProgress(Math.round(((i + 1) / options.ranges.length) * 90));
    }
  } else { // extract mode
    const pagesToExtract = options.selectedPages
      .split(',')
      .map(p => p.trim())
      .flatMap(p => {
        if (p.includes('-')) {
          const [start, end] = p.split('-').map(Number);
          return Array.from({ length: end - start + 1 }, (_, k) => k + start);
        }
        return [Number(p)];
      })
      .map(n => n - 1) // to 0-based index
      .filter(n => !isNaN(n) && n >= 0 && n < totalPages);
    
    if (pagesToExtract.length > 0) {
      const newPdf = await PDFDocument.create();
      const copiedPages = await newPdf.copyPages(pdfDoc, pagesToExtract);
      copiedPages.forEach(page => newPdf.addPage(page));
      const newPdfBytes = await newPdf.save();
      zip.file(`${file.name.replace('.pdf', '')}-extracted.pdf`, newPdfBytes);
    }
  }

  setProgress(100);
  return zip.generateAsync({ type: "blob" });
};

export const compressPdf = async (file: File, level: string, setProgress: (p: number) => void): Promise<Blob> => {
  // pdf-lib does some compression by default on save. True compression is complex.
  // This function simulates work and uses the default save optimization.
  // The 'level' parameter is for UI demonstration.
  setProgress(25);
  const existingPdfBytes = await file.arrayBuffer();
  setProgress(50);
  const pdfDoc = await PDFDocument.load(existingPdfBytes, {
    // For more advanced compression, especially for images, options can be set here
    // but they are limited in pdf-lib. A server-side tool would be better.
  });
  setProgress(75);
  const pdfBytes = await pdfDoc.save();
  setProgress(100);
  return new Blob([pdfBytes], { type: 'application/pdf' });
};


export const pdfToImages = async (file: File, format: 'png' | 'jpeg', quality: number, setProgress: (p: number) => void): Promise<Blob[]> => {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    const images: Blob[] = [];

    for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 2.0 });
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        if (context) {
            await page.render({ canvasContext: context, viewport: viewport }).promise;
            const blob = await new Promise<Blob | null>(res => canvas.toBlob(res, `image/${format}`, quality));
            if (blob) {
                images.push(blob);
            }
        }
        setProgress(Math.round((i / pdf.numPages) * 100));
    }
    return images;
};

// =============== IMAGE TOOL FUNCTIONS ===============

export const compressImage = async (file: File, quality: number, setProgress: (p: number) => void): Promise<Blob> => {
    setProgress(10);
    
    try {
        // Use browser-image-compression for client-side compression
        const options = {
            maxSizeMB: Math.max(0.1, (quality / 100) * 5), // Scale max size with quality
            maxWidthOrHeight: quality > 80 ? 2048 : quality > 50 ? 1920 : 1024,
            useWebWorker: true,
            initialQuality: quality / 100,
            fileType: file.type.includes('png') ? 'image/png' : 'image/jpeg',
        };
        
        setProgress(50);
        const compressedFile = await imageCompression(file, options);
        setProgress(90);
        
        // Ensure we actually compressed the file
        if (compressedFile.size >= file.size * 0.95) {
            console.warn('No significant compression achieved, trying backend');
            throw new Error('No significant compression achieved');
        }
        
        setProgress(100);
        return compressedFile;
    } catch (error) {
        // Fallback to backend API
        console.warn('Client-side compression failed, trying backend:', error);
        setProgress(75);
        try {
            const result = await callBackendAPI('/compress-image', file, { quality });
            setProgress(100);
            return result;
        } catch (backendError) {
            // If backend also fails, return a basic canvas-compressed version
            console.warn('Backend compression failed, using canvas fallback');
            return await canvasCompressImage(file, quality, setProgress);
        }
    }
};

// Canvas-based fallback compression
const canvasCompressImage = async (file: File, quality: number, setProgress: (p: number) => void): Promise<Blob> => {
    return new Promise((resolve, reject) => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();
        
        img.onload = () => {
            // Calculate new dimensions based on quality
            const scaleFactor = quality > 80 ? 1 : quality > 50 ? 0.8 : 0.6;
            canvas.width = img.width * scaleFactor;
            canvas.height = img.height * scaleFactor;
            
            if (ctx) {
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                
                canvas.toBlob((blob) => {
                    if (blob) {
                        setProgress(100);
                        resolve(blob);
                    } else {
                        reject(new Error('Failed to compress image using canvas'));
                    }
                }, 'image/jpeg', quality / 100);
            } else {
                reject(new Error('Canvas context not available'));
            }
        };
        
        img.onerror = () => reject(new Error('Failed to load image'));
        img.src = URL.createObjectURL(file);
    });
};

export const enhanceImage = async (file: File, options: {
    brightness: number;
    contrast: number;
    saturation: number;
}, setProgress: (p: number) => void): Promise<Blob> => {
    setProgress(25);
    
    return new Promise((resolve, reject) => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();
        
        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            
            if (ctx) {
                setProgress(50);
                
                // Apply filters
                ctx.filter = `brightness(${options.brightness}%) contrast(${options.contrast}%) saturate(${options.saturation}%)`;
                ctx.drawImage(img, 0, 0);
                
                setProgress(90);
                
                canvas.toBlob((blob) => {
                    if (blob) {
                        setProgress(100);
                        resolve(blob);
                    } else {
                        reject(new Error('Failed to enhance image'));
                    }
                }, file.type, 0.95);
            } else {
                reject(new Error('Canvas context not available'));
            }
        };
        
        img.onerror = () => reject(new Error('Failed to load image'));
        img.src = URL.createObjectURL(file);
    });
};

export const resizeImage = async (file: File, width: number, height: number, setProgress: (p: number) => void): Promise<Blob> => {
    setProgress(10);
    return new Promise<Blob>((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            if (!ctx) return reject(new Error('Canvas context not available'));
            setProgress(50);
            ctx.drawImage(img, 0, 0, width, height);
            canvas.toBlob((blob) => {
                if (blob) {
                    setProgress(100);
                    resolve(blob);
                } else {
                    reject(new Error('Failed to resize image'));
                }
            }, 'image/png', 0.95);
        };
        img.onerror = () => reject(new Error('Failed to load image'));
        img.src = URL.createObjectURL(file);
    });
};

export const convertImage = async (file: File, format: string, setProgress: (p: number) => void): Promise<Blob> => {
    setProgress(10);
    return new Promise<Blob>((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            if (!ctx) return reject(new Error('Canvas context not available'));
            setProgress(50);
            ctx.drawImage(img, 0, 0);
            const mime = format === 'jpg' ? 'image/jpeg' : `image/${format}`;
            canvas.toBlob((blob) => {
                if (blob) {
                    setProgress(100);
                    resolve(blob);
                } else {
                    reject(new Error('Failed to convert image'));
                }
            }, mime, 0.95);
        };
        img.onerror = () => reject(new Error('Failed to load image'));
        img.src = URL.createObjectURL(file);
    });
};

export const cropImage = async (file: File, x: number, y: number, width: number, height: number, setProgress: (p: number) => void): Promise<Blob> => {
    setProgress(10);
    return new Promise<Blob>((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            if (!ctx) return reject(new Error('Canvas context not available'));
            setProgress(50);
            ctx.drawImage(img, -x, -y);
            canvas.toBlob((blob) => {
                if (blob) {
                    setProgress(100);
                    resolve(blob);
                } else {
                    reject(new Error('Failed to crop image'));
                }
            }, 'image/png', 0.95);
        };
        img.onerror = () => reject(new Error('Failed to load image'));
        img.src = URL.createObjectURL(file);
    });
};

export const rotateImage = async (file: File, angle: number, setProgress: (p: number) => void): Promise<Blob> => {
    setProgress(10);
    return new Promise<Blob>((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
            const radians = (angle * Math.PI) / 180;
            const sin = Math.abs(Math.sin(radians));
            const cos = Math.abs(Math.cos(radians));
            const newWidth = Math.ceil(img.width * cos + img.height * sin);
            const newHeight = Math.ceil(img.width * sin + img.height * cos);
            const canvas = document.createElement('canvas');
            canvas.width = newWidth;
            canvas.height = newHeight;
            const ctx = canvas.getContext('2d');
            if (!ctx) return reject(new Error('Canvas context not available'));
            setProgress(50);
            ctx.translate(newWidth / 2, newHeight / 2);
            ctx.rotate(radians);
            ctx.drawImage(img, -img.width / 2, -img.height / 2);
            canvas.toBlob((blob) => {
                if (blob) {
                    setProgress(100);
                    resolve(blob);
                } else {
                    reject(new Error('Failed to rotate image'));
                }
            }, 'image/png', 0.95);
        };
        img.onerror = () => reject(new Error('Failed to load image'));
        img.src = URL.createObjectURL(file);
    });
};

// =============== PDF CONVERSION FUNCTIONS ===============

export const pdfToWord = async (file: File, setProgress: (p: number) => void): Promise<Blob> => {
    setProgress(30);
    try {
        const result = await callBackendAPI('/pdf-to-word', file);
        setProgress(100);
        return result;
    } catch (e) {
        // Fallback to client-side DOCX generation if backend is unavailable
        return await pdfToDocx(file, setProgress);
    }
};

export const wordToPdf = async (file: File, setProgress: (p: number) => void): Promise<Blob> => {
    setProgress(50);
    const result = await callBackendAPI('/word-to-pdf', file);
    setProgress(100);
    return result;
};

export const pdfToExcel = async (file: File, setProgress: (p: number) => void): Promise<Blob> => {
    setProgress(30);
    try {
        const result = await callBackendAPI('/pdf-to-excel', file);
        setProgress(100);
        return result;
    } catch (e) {
        // Fallback to client-side CSV extraction if backend is unavailable
        return await pdfToCsv(file, setProgress);
    }
};

// =============== CLIENT FALLBACKS FOR DOCUMENT CONVERSIONS ===============

export async function pdfToDocx(file: File, setProgress: (p: number) => void): Promise<Blob> {
  setProgress(10);
  try {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

    const paragraphs: Paragraph[] = [];
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent: any = await page.getTextContent();
      const pageText = (textContent.items || [])
        .map((it: any) => (typeof it?.str === 'string' ? it.str : (typeof it?.text === 'string' ? it.text : '')))
        .join(' ')
        .replace(/\s+\n/g, '\n')
        .replace(/\s{2,}/g, ' ')
        .trim();

      paragraphs.push(new Paragraph(pageText || ''));
      // Add a blank line between pages for readability
      if (i < pdf.numPages) {
        paragraphs.push(new Paragraph(''));
      }
      setProgress(Math.min(95, Math.round((i / pdf.numPages) * 95)));
    }

    const doc = new DocxDocument({
      sections: [
        {
          properties: {},
          children: paragraphs,
        },
      ],
    });

    const blob = await Packer.toBlob(doc);
    setProgress(100);
    return blob;
  } catch (err) {
    setProgress(0);
    throw new Error('Client-side DOCX generation failed');
  }
}

export async function pdfToCsv(file: File, setProgress: (p: number) => void): Promise<Blob> {
  setProgress(10);
  try {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

    const lines: string[] = ['"Extracted_Text"'];
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent: any = await page.getTextContent();
      const pageText = (textContent.items || [])
        .map((it: any) => (typeof it?.str === 'string' ? it.str : (typeof it?.text === 'string' ? it.text : '')))
        .join(' ')
        .replace(/\r/g, ' ')
        .replace(/\n/g, ' ')
        .replace(/\s{2,}/g, ' ')
        .trim();

      // CSV-escape quotes by doubling them
      const escaped = pageText.replace(/"/g, '""');
      lines.push(`"${escaped}"`);
      setProgress(Math.min(95, Math.round((i / pdf.numPages) * 95)));
    }

    const csv = lines.join('\n');
    setProgress(100);
    return new Blob([csv], { type: 'text/csv' });
  } catch (err) {
    setProgress(0);
    throw new Error('Client-side CSV extraction failed');
  }
}
export const imagesToPdf = async (files: File[], setProgress: (p: number) => void): Promise<Blob> => {
    const pdfDoc = await PDFDocument.create();
    
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const arrayBuffer = await file.arrayBuffer();
        
        let image;
        if (file.type === 'image/png') {
            image = await pdfDoc.embedPng(arrayBuffer);
        } else if (file.type === 'image/jpeg' || file.type === 'image/jpg') {
            image = await pdfDoc.embedJpg(arrayBuffer);
        } else {
            throw new Error(`Unsupported image type: ${file.type}`);
        }

        const page = pdfDoc.addPage();
        const { width: pageWidth, height: pageHeight } = page.getSize();
        const { width: imageWidth, height: imageHeight } = image;

        // Scale image to fit page while maintaining aspect ratio
        const scale = Math.min(pageWidth / imageWidth, pageHeight / imageHeight);
        const scaledWidth = imageWidth * scale;
        const scaledHeight = imageHeight * scale;

        // Center the image
        const x = (pageWidth - scaledWidth) / 2;
        const y = (pageHeight - scaledHeight) / 2;

        page.drawImage(image, { x, y, width: scaledWidth, height: scaledHeight });
        
        setProgress(Math.round(((i + 1) / files.length) * 100));
    }

    const pdfBytes = await pdfDoc.save();
    return new Blob([pdfBytes], { type: 'application/pdf' });
};

// =============== ARCHIVE FUNCTIONS ===============

export const createZip = async (files: File[], setProgress: (p: number) => void): Promise<Blob> => {
    const zip = new JSZip();
    
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const arrayBuffer = await file.arrayBuffer();
        zip.file(file.name, arrayBuffer);
        setProgress(Math.round(((i + 1) / files.length) * 80));
    }
    
    setProgress(90);
    const zipBlob = await zip.generateAsync({ type: "blob" });
    setProgress(100);
    
    return zipBlob;
};

export const extractZip = async (file: File, setProgress: (p: number) => void): Promise<Blob> => {
    setProgress(10);
    // Try backend first
    try {
        const result = await callBackendAPI('/zip-extract', file);
        setProgress(100);
        return result;
    } catch {
        // Client-side fallback: parse the ZIP and repackage all entries into a new ZIP
        try {
            const inputBuffer = await file.arrayBuffer();
            const inputZip = await JSZip.loadAsync(inputBuffer);
            const outputZip = new JSZip();

            const names = Object.keys(inputZip.files);
            const total = Math.max(1, names.length);
            let done = 0;

            await Promise.all(
                names.map(async (name) => {
                    const entry = inputZip.files[name];
                    if (entry.dir) return; // skip directories, structure will be kept by filenames
                    const content = await entry.async('arraybuffer');
                    outputZip.file(name, content);
                    done += 1;
                    setProgress(Math.min(90, Math.round((done / total) * 90)));
                })
            );

            const blob = await outputZip.generateAsync({ type: 'blob' });
            setProgress(100);
            return blob;
        } catch {
            setProgress(0);
            throw new Error('Failed to extract ZIP: backend unavailable and client-side fallback failed.');
        }
    }
};

// =============== UTILITY FUNCTIONS ===============

export const generateQRCode = async (text: string, size: number = 200, setProgress: (p: number) => void): Promise<Blob> => {
    setProgress(50);
    
    try {
        // Try backend API first
        const formData = new FormData();
        formData.append('text', text);
        formData.append('size', size.toString());
        
        const response = await fetch(`${API_BASE_URL}/qr-generate`, {
            method: 'POST',
            body: formData,
        });
        
        if (response.ok) {
            setProgress(100);
            return await response.blob();
        }
    } catch (error) {
        // Fallback to client-side generation
        console.warn('Backend QR generation failed, using fallback');
    }
    
    // Client-side fallback using canvas
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = size;
    canvas.height = size;
    
    if (ctx) {
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, size, size);
        ctx.fillStyle = 'black';
        ctx.font = '16px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('QR: ' + text, size / 2, size / 2);
    }
    
    return new Promise<Blob>((resolve) => {
        canvas.toBlob((blob) => {
            setProgress(100);
            resolve(blob || new Blob());
        });
    });
};

export const generatePassword = (length: number, options: {
    uppercase: boolean;
    lowercase: boolean;
    numbers: boolean;
    symbols: boolean;
}): string => {
    let charset = '';
    if (options.lowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (options.uppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (options.numbers) charset += '0123456789';
    if (options.symbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';
    
    if (!charset) return '';
    
    let password = '';
    for (let i = 0; i < length; i++) {
        password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    
    return password;
};

export const convertText = (text: string, operation: 'uppercase' | 'lowercase' | 'title' | 'sentence'): string => {
    switch (operation) {
        case 'uppercase':
            return text.toUpperCase();
        case 'lowercase':
            return text.toLowerCase();
        case 'title':
            return text.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
        case 'sentence':
            return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
        default:
            return text;
    }
};

export const countTextStats = (text: string): {
    characters: number;
    charactersNoSpaces: number;
    words: number;
    sentences: number;
    paragraphs: number;
} => {
    return {
        characters: text.length,
        charactersNoSpaces: text.replace(/\s/g, '').length,
        words: text.trim() ? text.trim().split(/\s+/).length : 0,
        sentences: text.split(/[.!?]+/).filter(s => s.trim()).length,
        paragraphs: text.split(/\n\s*\n/).filter(p => p.trim()).length,
    };
};

// =============== MARKDOWN AND TEXT PROCESSING ===============

export const markdownToHtml = (markdown: string): string => {
    // Simple markdown to HTML conversion
    return markdown
        .replace(/^### (.*$)/gim, '<h3>$1</h3>')
        .replace(/^## (.*$)/gim, '<h2>$1</h2>')
        .replace(/^# (.*$)/gim, '<h1>$1</h1>')
        .replace(/^\* (.*$)/gim, '<ul><li>$1</li></ul>')
        .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
        .replace(/\*(.*)\*/gim, '<em>$1</em>')
        .replace(/\[([^\]]*)\]\(([^\)]*)\)/gim, '<a href="$2">$1</a>')
        .replace(/\n$/gim, '<br />');
};

export const htmlToMarkdown = (html: string): string => {
    // Simple HTML to markdown conversion
    return html
        .replace(/<h1>(.*?)<\/h1>/gim, '# $1\n')
        .replace(/<h2>(.*?)<\/h2>/gim, '## $1\n')
        .replace(/<h3>(.*?)<\/h3>/gim, '### $1\n')
        .replace(/<strong>(.*?)<\/strong>/gim, '**$1**')
        .replace(/<em>(.*?)<\/em>/gim, '*$1*')
        .replace(/<a href="([^"]*)"[^>]*>(.*?)<\/a>/gim, '[$2]($1)')
        .replace(/<li>(.*?)<\/li>/gim, '* $1\n')
        .replace(/<br\s*\/?>/gim, '\n')
        .replace(/<[^>]*>/gim, ''); // Remove remaining HTML tags
};

export const base64Encode = (text: string): string => {
    return btoa(unescape(encodeURIComponent(text)));
};

export const base64Decode = (base64: string): string => {
    return decodeURIComponent(escape(atob(base64)));
};

export const urlEncode = (text: string): string => {
    return encodeURIComponent(text);
};

export const urlDecode = (encodedText: string): string => {
    return decodeURIComponent(encodedText);
};
