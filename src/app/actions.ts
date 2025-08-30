
'use server';

import { recommendTools } from '@/ai/flows/recommend-tools';
import { websiteToPdf } from '@/ai/flows/website-to-pdf';

export async function getRecommendedTools(data: { pastTools: string[] }): Promise<{recommendations?: string[], error?: string}> {
  try {
    const result = await recommendTools(data);
    return { recommendations: result.recommendations };
  } catch (e: any) {
    console.error("Error getting recommendations:", e);
    return { error: e.message || "Failed to get recommendations." };
  }
}

export async function getWebsiteAsPdf(url: string): Promise<{pdf?: string, error?: string}> {
  try {
    const result = await websiteToPdf({ url });
    return { pdf: result.pdfDataUri };
  } catch (e: any) {
      console.error("Error getting website as pdf:", e);
      return { error: e.message || "Failed to convert website to PDF." };
  }
}
