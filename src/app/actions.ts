// Static version for deployment - AI features will be implemented with Firebase Functions later

export async function getRecommendedTools(data: { pastTools: string[] }): Promise<{recommendations?: string[], error?: string}> {
  // Return static recommendations for now
  const allTools = [
    'PDF to Word', 'Word to PDF', 'PDF to JPG', 'Image to PDF',
    'Website to PDF', 'Background Remover', 'Voice Recorder', 'Password Generator'
  ];

  const recommendations = allTools
    .filter(tool => !data.pastTools.includes(tool))
    .slice(0, 3);

  return { recommendations };
}

export async function getWebsiteAsPdf(url: string): Promise<{pdf?: string, error?: string}> {
  // Placeholder for static deployment
  return {
    error: 'Website to PDF conversion is currently unavailable. This feature will be available soon with our backend upgrade.'
  };
}

export async function convertPdfToWord(pdfDataUri: string): Promise<{docx?: string, error?: string}> {
  try {
    // Import the PDF to Word flow dynamically to avoid issues in static deployment
    const { pdfToWord } = await import('@/ai/flows/pdf-to-word');

    const result = await pdfToWord({ pdfDataUri });

    return { docx: result.docxDataUri };
  } catch (error) {
    console.error('PDF to Word conversion error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return {
      error: `PDF to Word conversion failed: ${errorMessage}`
    };
  }
}
