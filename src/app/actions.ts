'use server';

import { recommendTools, type RecommendToolsInput } from '@/ai/flows/recommend-tools';

export async function getRecommendedTools(data: RecommendToolsInput): Promise<{recommendations?: string[], error?: string}> {
  try {
    const result = await recommendTools(data);
    return { recommendations: result.recommendations };
  } catch (error) {
    console.error('AI Recommendation Error:', error);
    return { error: 'Sorry, we couldn\'t generate recommendations at this time. Please try again later.' };
  }
}
