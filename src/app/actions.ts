'use server';

import { recommendTools, type RecommendToolsInput } from '@/ai/flows/recommend-tools';
import { websiteToPdf } from '@/ai/flows/website-to-pdf';
import { pdfToWord } from '@/ai/flows/pdf-to-word';

export async function getRecommendedTools(data: RecommendToolsInput): Promise<{recommendations?: string[], error?: string}> {
  try {
    const result = await recommendTools(data);
    return { recommendations: result.recommendations };
  } catch (error) {
    console.error('AI Recommendation Error:', error);
    return { error: 'Sorry, we couldn\'t generate recommendations at this time. Please try again later.' };
  }
}


export async function getWebsiteAsPdf(url: string): Promise<{pdf?: string, error?: string}> {
    try {
        const result = await websiteToPdf({ url });
        return { pdf: result.pdfDataUri };
    } catch(e) {
        console.error("Website to PDF error", e);
        return { error: `Sorry, we couldn't convert this website to PDF. Please check the URL and try again.`}
    }
}

export async function convertPdfToWord(pdfDataUri: string): Promise<{docx?: string, error?: string}> {
  try {
    const result = await pdfToWord({ pdfDataUri });
    return { docx: result.docxDataUri };
  } catch(e) {
    console.error("PDF to Word error", e);
    const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
    return { error: `Sorry, we couldn't convert this PDF to Word. ${errorMessage}` }
  }
}
