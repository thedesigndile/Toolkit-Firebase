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
    let page;
    try {
      // Validate URL
      try {
        new URL(url);
      } catch {
        throw new Error('Invalid URL provided');
      }

      // Launch browser with improved resource management
      browser = await puppeteer.launch({
        headless: true,
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--disable-accelerated-2d-canvas',
          '--no-first-run',
          '--no-zygote',
          '--single-process', // Prevent zombie processes
          '--disable-gpu'
        ]
      });

      page = await browser.newPage();

      // Set reasonable timeouts and resource limits
      await page.setDefaultTimeout(30000); // 30 second timeout
      await page.setDefaultNavigationTimeout(30000);

      // Block unnecessary resources to improve performance
      await page.setRequestInterception(true);
      page.on('request', (request) => {
        const resourceType = request.resourceType();
        if (['image', 'media', 'font', 'stylesheet'].includes(resourceType)) {
          request.abort();
        } else {
          request.continue();
        }
      });

      await page.goto(url, {
        waitUntil: 'networkidle2', // More reliable than networkidle0
        timeout: 30000
      });

      const pdfBuffer = await page.pdf({
        format: 'A4',
        printBackground: true,
        margin: {
          top: '1cm',
          right: '1cm',
          bottom: '1cm',
          left: '1cm'
        }
      });

      const pdfDataUri = `data:application/pdf;base64,${pdfBuffer.toString('base64')}`;

      return {
        pdfDataUri
      };
    } catch(e) {
      console.error("Error converting website to PDF", e);
      // Return a more user-friendly error
      const errorMessage = e instanceof Error ? e.message : 'Unknown error occurred';
      throw new Error(`Failed to convert ${url} to PDF: ${errorMessage}`);
    } finally {
        // Ensure proper cleanup
        if(page) {
            try {
                await page.close();
            } catch(e) {
                console.warn("Error closing page:", e);
            }
        }
        if(browser) {
            try {
                await browser.close();
            } catch(e) {
                console.warn("Error closing browser:", e);
            }
        }
    }
  }
);
