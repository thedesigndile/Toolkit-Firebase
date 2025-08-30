
import { PDFDocument, StandardFonts, rgb, degrees } from 'pdf-lib';
import * as pdfjsLib from 'pdfjs-dist';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

// =============== GENERAL UTILITIES ===============

export const downloadBlob = (blob: Blob, filename: string): void => {
  saveAs(blob, filename);
};

export const getFileAccept = (toolCategory: string, toolName: string = ''): string => {
  if (toolName === 'Image to PDF') return 'image/jpeg,image/png,image/webp';
  if (toolCategory.includes('PDF')) return 'application/pdf';
  if (toolCategory.includes('Image')) return 'image/png,image/jpeg,image/webp';
  return '*/*';
};

const FILE_SIZE_LIMIT_MB = 50;
export const validateFileSize = (file: File, _category: string): { valid: boolean; error?: string } => {
  if (file.size > FILE_SIZE_LIMIT_MB * 1024 * 1024) {
    return {
      valid: false,
      error: `File size exceeds ${FILE_SIZE_LIMIT_MB}MB limit.`,
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

type SplitOptions = {
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
