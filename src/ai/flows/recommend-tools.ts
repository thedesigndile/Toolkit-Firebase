// This file uses server-side code, and must have the `'use server'` directive.
'use server';

/**
 * @fileOverview Recommends offline tools to the user based on their past usage.
 *
 * - recommendTools - A function that handles the recommendation process.
 * - RecommendToolsInput - The input type for the recommendTools function.
 * - RecommendToolsOutput - The return type for the recommendTools function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RecommendToolsInputSchema = z.object({
  pastTools: z
    .array(z.string())
    .describe('A list of the tools the user has used in the past.'),
});
export type RecommendToolsInput = z.infer<typeof RecommendToolsInputSchema>;

const RecommendToolsOutputSchema = z.object({
  recommendations: z
    .array(z.string())
    .describe('A list of recommended tools for the user to try.'),
});
export type RecommendToolsOutput = z.infer<typeof RecommendToolsOutputSchema>;

export async function recommendTools(input: RecommendToolsInput): Promise<RecommendToolsOutput> {
  return recommendToolsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'recommendToolsPrompt',
  input: {schema: RecommendToolsInputSchema},
  output: {schema: RecommendToolsOutputSchema},
  prompt: `You are an expert in offline productivity tools.

  Based on the user's past tool usage, recommend some new tools that they might find helpful. Return your response as a list of tool names.

  Past tools: {{{pastTools}}}

  Recommendations:`, 
});

const recommendToolsFlow = ai.defineFlow(
  {
    name: 'recommendToolsFlow',
    inputSchema: RecommendToolsInputSchema,
    outputSchema: RecommendToolsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
