
// @ts-nocheck
import imageCompression from 'browser-image-compression';
import { PDFDocument } from 'pdf-lib';

// =============== IMAGE TOOLS ===============

export async function convertImage(file: File, format: 'png' | 'jpeg' | 'webp') {
  const imageBitmap = await createImageBitmap(file);
  const canvas = document.createElement('canvas');
  canvas.width = imageBitmap.width;
  canvas.height = imageBitmap.height;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(imageBitmap, 0, 0);
  const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, `image/${format}`));
  if (!blob) throw new Error('Failed to convert image');
  return blob;
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
    ctx.drawImage(imageBitmap, 0, 0, targetWidth, targetHeight);

    const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, file.type));
    if (!blob) throw new Error('Failed to resize image');
    return blob;
}


export async function compressImage(file: File, level: 'low' | 'medium' | 'high') {
    let options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };
    switch (level) {
        case 'low':
            options.maxSizeMB = 1;
            break;
        case 'medium':
            options.maxSizeMB = 0.5;
            break;
        case 'high':
            options.maxSizeMB = 0.1;
            break;
    }
    const compressedFile = await imageCompression(file, options);
    return compressedFile;
}


// =============== PDF TOOLS ===============

export async function compressPdf(file: File, level: 'low' | 'medium' | 'high') {
  const existingPdfBytes = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(existingPdfBytes, { 
      // Disabling image compression for now as it requires more setup.
      // We are just re-saving the PDF which can sometimes reduce size by optimizing structure.
      // For more advanced compression, especially for images within PDFs, a more complex
      // solution involving ghostscript or a server-side component would be needed.
  });

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

export function getFileAccept(toolCategory: string) {
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
            return 'application/pdf';
        case 'Audio Tools':
            return 'audio/mpeg,audio/wav,audio/ogg';
        case 'Video Tools':
            return 'video/mp4,video/webm,video/ogg';
        default:
            return '*/*';
    }
}
