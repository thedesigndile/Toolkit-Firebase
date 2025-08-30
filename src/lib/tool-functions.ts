

import imageCompression from 'browser-image-compression';
import { PDFDocument, rgb } from 'pdf-lib';
import * as pdfjsLib from 'pdfjs-dist';


// =============== IMAGE TOOLS ===============

export async function convertImage(file: File, format: 'png' | 'jpeg' | 'webp') {
  let imageBitmap: ImageBitmap | null = null;
  let canvas: HTMLCanvasElement | null = null;

  try {
    // Validate file before processing
    if (!file.type.startsWith('image/')) {
      throw new Error('Invalid file type. Please provide a valid image file.');
    }

    // Create image bitmap with timeout
    const bitmapPromise = createImageBitmap(file);
    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('Image processing timeout')), 30000)
    );

    imageBitmap = await Promise.race([bitmapPromise, timeoutPromise]);

    // Check for excessively large images
    const maxDimension = 4096;
    if (imageBitmap.width > maxDimension || imageBitmap.height > maxDimension) {
      throw new Error(`Image dimensions too large. Maximum allowed: ${maxDimension}x${maxDimension}px`);
    }

    canvas = document.createElement('canvas');
    canvas.width = imageBitmap.width;
    canvas.height = imageBitmap.height;

    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Failed to get canvas context');

    ctx.drawImage(imageBitmap, 0, 0);

    const blob = await new Promise<Blob>((resolve, reject) => {
      const timeout = setTimeout(() => reject(new Error('Canvas conversion timeout')), 10000);

      if (!canvas) {
        clearTimeout(timeout);
        reject(new Error('Canvas not available'));
        return;
      }

      canvas.toBlob((blob) => {
        clearTimeout(timeout);
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error('Failed to convert image'));
        }
      }, `image/${format}`, 0.9);
    });

    return blob;
  } finally {
    // Clean up resources
    if (imageBitmap) {
      imageBitmap.close();
    }
    if (canvas && canvas.parentNode) {
      canvas.parentNode.removeChild(canvas);
    }
  }
}

export async function resizeImage(file: File, width: number, height: number, keepAspectRatio: boolean) {
    const imageBitmap = await createImageBitmap(file);
    const canvas = document.createElement('canvas');
    let targetWidth = width;
    let targetHeight = height;

    if (keepAspectRatio) {
        const ratio = Math.min(width / imageBitmap.width, height / imageBitmap.height);
        targetWidth = Math.round(imageBitmap.width * ratio);
        targetHeight = Math.round(imageBitmap.height * ratio);
    }

    canvas.width = targetWidth;
    canvas.height = targetHeight;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Failed to get canvas context');
    ctx.drawImage(imageBitmap, 0, 0, targetWidth, targetHeight);

    const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, file.type));
    if (!blob) throw new Error('Failed to resize image');
    return blob;
}


export async function compressImage(file: File, quality: number) {
    let options = {
      maxSizeMB: 2, // Set a high initial limit, quality is the main driver
      initialQuality: quality,
      useWebWorker: true,
    };
    
    const compressedFile = await imageCompression(file, options);
    return compressedFile;
}

export async function imageToPdf(file: File): Promise<Blob> {
    const pdfDoc = await PDFDocument.create();
    const imageBytes = await file.arrayBuffer();
    
    let image;
    if (file.type === 'image/jpeg' || file.type === 'image/jpg') {
        image = await pdfDoc.embedJpg(imageBytes);
    } else if (file.type === 'image/png') {
        image = await pdfDoc.embedPng(imageBytes);
    } else {
        throw new Error('Unsupported image type. Please use JPG or PNG.');
    }

    const page = pdfDoc.addPage([image.width, image.height]);
    page.drawImage(image, {
        x: 0,
        y: 0,
        width: image.width,
        height: image.height,
    });

    const pdfBytes = await pdfDoc.save();
    return new Blob([pdfBytes], { type: 'application/pdf' });
}


// =============== PDF TOOLS ===============

export async function compressPdf(file: File, quality: number) {
  const existingPdfBytes = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(existingPdfBytes, { 
      // pdf-lib's save method does some optimization, but for quality-based
      // compression, especially for images within PDFs, a more complex server-side
      // library like ghostscript would be needed. This is a placeholder.
  });

  // Placeholder for quality-based compression
  console.log("PDF compression quality set to:", quality);

  const pdfBytes = await pdfDoc.save();
  return new Blob([pdfBytes], { type: 'application/pdf' });
}

export async function mergePdfs(files: File[]): Promise<Blob> {
    const mergedPdf = await PDFDocument.create();
    for (const file of files) {
        const pdfBytes = await file.arrayBuffer();
        const pdfDoc = await PDFDocument.load(pdfBytes);
        const copiedPages = await mergedPdf.copyPages(pdfDoc, pdfDoc.getPageIndices());
        copiedPages.forEach((page) => {
            mergedPdf.addPage(page);
        });
    }
    const mergedPdfBytes = await mergedPdf.save();
    return new Blob([mergedPdfBytes], { type: 'application/pdf' });
}

export async function pdfToImages(file: File, format: 'png' | 'jpeg' = 'png', quality: number = 0.9): Promise<Blob[]> {
    // Validate file type
    if (file.type !== 'application/pdf') {
        throw new Error('Invalid file type. Please provide a PDF file.');
    }

    // Check file size (50MB limit for PDFs)
    if (file.size > 50 * 1024 * 1024) {
        throw new Error('PDF file too large. Maximum size: 50MB');
    }

    // Initialize PDF.js worker
    if (typeof window !== 'undefined' && !pdfjsLib.GlobalWorkerOptions.workerSrc) {
        pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.mjs`;
    }

    const arrayBuffer = await file.arrayBuffer();

    // Set a timeout for PDF loading
    const pdfLoadPromise = pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('PDF loading timeout')), 30000)
    );

    const pdf = await Promise.race([pdfLoadPromise, timeoutPromise]);

    // Limit number of pages to prevent memory issues
    const maxPages = 100;
    if (pdf.numPages > maxPages) {
      throw new Error(`PDF has too many pages (${pdf.numPages}). Maximum allowed: ${maxPages} pages`);
    }

    const images: Blob[] = [];
    const canvases: HTMLCanvasElement[] = [];

    try {
      for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
        const page = await pdf.getPage(pageNum);

        // Set up canvas for rendering with memory considerations
        const scale = Math.min(2.0, 4096 / Math.max(page.getViewport({ scale: 1 }).width, page.getViewport({ scale: 1 }).height));
        const viewport = page.getViewport({ scale });

        // Check if viewport dimensions are reasonable
        if (viewport.width > 4096 || viewport.height > 4096) {
          throw new Error(`Page ${pageNum} dimensions too large. Maximum allowed: 4096x4096px`);
        }

        const canvas = document.createElement('canvas');
        canvases.push(canvas);

        const context = canvas.getContext('2d');
        if (!context) throw new Error('Failed to get canvas context');

        canvas.height = viewport.height;
        canvas.width = viewport.width;

        // Render PDF page to canvas with timeout
        const renderContext = {
          canvasContext: context,
          viewport: viewport,
          canvas: canvas
        };

        const renderPromise = page.render(renderContext).promise;
        const renderTimeout = new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error(`Page ${pageNum} rendering timeout`)), 20000)
        );

        await Promise.race([renderPromise, renderTimeout]);

        // Convert canvas to blob with timeout
        const blob = await new Promise<Blob>((resolve, reject) => {
          const blobTimeout = setTimeout(() => reject(new Error(`Page ${pageNum} blob conversion timeout`)), 10000);

          canvas.toBlob((blob) => {
            clearTimeout(blobTimeout);
            if (blob) {
              resolve(blob);
            } else {
              reject(new Error(`Failed to convert page ${pageNum} to image`));
            }
          }, `image/${format}`, quality);
        });

        images.push(blob);

        // Clean up memory periodically
        if (pageNum % 10 === 0) {
          // Allow garbage collection
          await new Promise(resolve => setTimeout(resolve, 100));
        }
      }

      return images;
    } finally {
      // Clean up canvases
      canvases.forEach(canvas => {
        if (canvas.parentNode) {
          canvas.parentNode.removeChild(canvas);
        }
      });

      // Clean up PDF document
      if (pdf && typeof pdf.cleanup === 'function') {
        pdf.cleanup();
      }
    }
}

export function getFileAccept(toolCategory: string, toolName: string = '') {
    if (toolName === 'Image to PDF') {
        return 'image/jpeg,image/png';
    }

    switch(toolCategory) {
        case 'Image Tools':
            return 'image/png,image/jpeg,image/webp';
        case 'PDF Tools':
        case 'Organize PDF':
        case 'Optimize PDF':
        case 'Convert to PDF':
        case 'Convert from PDF':
        case 'Edit PDF':
        case 'PDF Security':
        case 'Extra Tools':
        case 'Convert PDF':
            return 'application/pdf';
        case 'Audio Tools':
            return 'audio/mpeg,audio/wav,audio/ogg';
        case 'Video Tools':
            return 'video/mp4,video/webm,video/ogg';
        default:
            return '*/*';
    }
}

// File size validation utilities
export const FILE_SIZE_LIMITS = {
    IMAGE: 10 * 1024 * 1024, // 10MB for images
    PDF: 50 * 1024 * 1024,   // 50MB for PDFs
    AUDIO: 100 * 1024 * 1024, // 100MB for audio
    VIDEO: 500 * 1024 * 1024, // 500MB for video
    GENERAL: 100 * 1024 * 1024 // 100MB general limit
} as const;

export function validateFileSize(file: File, category: string): { valid: boolean; error?: string } {
    let limit = FILE_SIZE_LIMITS.GENERAL;

    if (category.includes('Image') || file.type.startsWith('image/')) {
        limit = FILE_SIZE_LIMITS.IMAGE;
    } else if (category.includes('PDF') || file.type === 'application/pdf') {
        limit = FILE_SIZE_LIMITS.PDF;
    } else if (category.includes('Audio') || file.type.startsWith('audio/')) {
        limit = FILE_SIZE_LIMITS.AUDIO;
    } else if (category.includes('Video') || file.type.startsWith('video/')) {
        limit = FILE_SIZE_LIMITS.VIDEO;
    }

    if (file.size > limit) {
        const limitMB = Math.round(limit / (1024 * 1024));
        const fileSizeMB = Math.round(file.size / (1024 * 1024));
        return {
            valid: false,
            error: `File size (${fileSizeMB}MB) exceeds the limit of ${limitMB}MB for this tool.`
        };
    }

    return { valid: true };
}

// Safe file download utility with memory management
export function downloadBlob(blob: Blob, filename: string): void {
    try {
        const url = URL.createObjectURL(blob);

        // Create download link
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        link.style.display = 'none';

        // Add to DOM, click, and remove
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Clean up object URL after a delay to ensure download starts
        setTimeout(() => {
            URL.revokeObjectURL(url);
        }, 1000);

    } catch (error) {
        console.error('Download failed:', error);
        throw new Error('Failed to download file. Please try again.');
    }
}

// Memory usage monitoring utility
export function getMemoryUsage(): { used: number; available: number } | null {
    if ('memory' in performance) {
        const memory = (performance as any).memory;
        return {
            used: memory.usedJSHeapSize,
            available: memory.totalJSHeapSize
        };
    }
    return null;
}

// Check if operation would exceed memory limits
export function checkMemoryLimit(fileSize: number, operation: string): boolean {
    const memoryInfo = getMemoryUsage();
    if (!memoryInfo) return true; // Can't check, assume OK

    const estimatedMemoryNeeded = fileSize * 3; // Rough estimate
    const availableMemory = memoryInfo.available - memoryInfo.used;

    if (estimatedMemoryNeeded > availableMemory * 0.8) { // Use 80% as safety limit
        console.warn(`${operation} may exceed available memory. File size: ${fileSize}, Available: ${availableMemory}`);
        return false;
    }

    return true;
}
