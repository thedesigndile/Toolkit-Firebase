// This file uses server-side code, and must have the `'use server'` directive.
'use server';

/**
 * @fileOverview Converts a website URL to a PDF document.
 *
 * - websiteToPdf - A function that handles the conversion process.
 * - WebsiteToPdfInput - The input type for the websiteToPdf function.
 * - WebsiteToPdfOutput - The return type for the websiteToPdf function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import puppeteer from 'puppeteer';

const WebsiteToPdfInputSchema = z.object({
  url: z.string().url().describe('The URL of the website to convert to PDF.'),
});
export type WebsiteToPdfInput = z.infer<typeof WebsiteToPdfInputSchema>;

const WebsiteToPdfOutputSchema = z.object({
  pdfDataUri: z
    .string()
    .describe(
      "The generated PDF as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:application/pdf;base64,<encoded_data>'."
    ),
});
export type WebsiteToPdfOutput = z.infer<typeof WebsiteToPdfOutputSchema>;


export async function websiteToPdf(input: WebsiteToPdfInput): Promise<WebsiteToPdfOutput> {
    return websiteToPdfFlow(input);
}


const websiteToPdfFlow = ai.defineFlow(
  {
    name: 'websiteToPdfFlow',
    inputSchema: WebsiteToPdfInputSchema,
    outputSchema: WebsiteToPdfOutputSchema,
  },
  async ({ url }) => {
    let browser;
    try {
      browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
      const page = await browser.newPage();
      await page.goto(url, { waitUntil: 'networkidle0' });
      const pdfBuffer = await page.pdf({ format: 'A4', printBackground: true });
      
      const pdfDataUri = `data:application/pdf;base64,${pdfBuffer.toString('base64')}`;

      return {
        pdfDataUri
      };
    } catch(e) {
      console.error("Error converting website to PDF", e);
      throw new Error(`Failed to convert ${url} to PDF. Please ensure it's a valid and accessible URL.`);
    } finally {
        if(browser) {
            await browser.close();
        }
    }
  }
);
