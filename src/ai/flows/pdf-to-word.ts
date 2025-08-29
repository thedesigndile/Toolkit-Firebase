// This file uses server-side code, and must have the 'use server' directive.
'use server';

/**
 * @fileOverview Converts a PDF to a Word document.
 *
 * - pdfToWord - A function that handles the conversion process.
 * - PdfToWordInput - The input type for the pdfToWord function.
 * - PdfToWordOutput - The return type for the pdfToWord function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import * as pdfjsLib from 'pdfjs-dist';
import { Document, Packer, Paragraph } from 'docx';

const PdfToWordInputSchema = z.object({
  pdfDataUri: z
    .string()
    .describe(
      "The PDF file as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:application/pdf;base64,<encoded_data>'."
    ),
});
export type PdfToWordInput = z.infer<typeof PdfToWordInputSchema>;

const PdfToWordOutputSchema = z.object({
  docxDataUri: z
    .string()
    .describe(
      "The generated DOCX as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64,<encoded_data>'."
    ),
});
export type PdfToWordOutput = z.infer<typeof PdfToWordOutputSchema>;

export async function pdfToWord(input: PdfToWordInput): Promise<PdfToWordOutput> {
  return pdfToWordFlow(input);
}

const pdfToWordFlow = ai.defineFlow(
  {
    name: 'pdfToWordFlow',
    inputSchema: PdfToWordInputSchema,
    outputSchema: PdfToWordOutputSchema,
  },
  async ({ pdfDataUri }) => {
    try {
      const base64Data = pdfDataUri.split(',')[1];
      if (!base64Data) {
        throw new Error('Invalid data URI for PDF.');
      }
      const pdfBuffer = Buffer.from(base64Data, 'base64');

      // Dynamically import and set worker
      pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

      const pdf = await pdfjsLib.getDocument({ data: pdfBuffer }).promise;
      const numPages = pdf.numPages;
      const paragraphs: Paragraph[] = [];

      for (let i = 1; i <= numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map(item => ('str' in item ? item.str : '')).join(' ');
        paragraphs.push(new Paragraph({ text: pageText }));
      }

      const doc = new Document({
        sections: [
          {
            children: paragraphs,
          },
        ],
      });

      const docxBuffer = await Packer.toBuffer(doc);
      const docxBase64 = docxBuffer.toString('base64');
      const docxDataUri = `data:application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64,${docxBase64}`;

      return { docxDataUri };

    } catch (error) {
      console.error("Error converting PDF to Word:", error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      throw new Error(`Failed to convert PDF to Word: ${errorMessage}`);
    }
  }
);
