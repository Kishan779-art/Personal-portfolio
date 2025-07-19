'use server';

/**
 * @fileOverview Implements the AI chat assistant flow.
 *
 * - chatAssistant - A function that handles user queries and returns answers.
 * - ChatAssistantInput - The input type for the chatAssistant function.
 * - ChatAssistantOutput - The return type for the chatAssistant function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ChatAssistantInputSchema = z.object({
  query: z.string().describe('The user query.'),
});
export type ChatAssistantInput = z.infer<typeof ChatAssistantInputSchema>;

const ChatAssistantOutputSchema = z.object({
  answer: z.string().describe('The answer to the user query.'),
});
export type ChatAssistantOutput = z.infer<typeof ChatAssistantOutputSchema>;

export async function chatAssistant(input: ChatAssistantInput): Promise<ChatAssistantOutput> {
  return chatAssistantFlow(input);
}

const shouldAnswerQuery = ai.defineTool({
  name: 'shouldAnswerQuery',
  description: 'Determines whether the query warrants an answer.',
  inputSchema: z.object({
    query: z.string().describe('The user query.'),
  }),
  outputSchema: z.boolean(),
}, async (input) => {
  // Implement logic to determine if the query warrants an answer.
  // This could involve checking for inappropriate content, relevance, etc.
  // For now, we'll just return true.
  return true;
});

const prompt = ai.definePrompt({
  name: 'chatAssistantPrompt',
  input: {schema: ChatAssistantInputSchema},
  output: {schema: ChatAssistantOutputSchema},
  tools: [shouldAnswerQuery],
  prompt: `You are a helpful AI chat assistant.

  The user has the following question: {{{query}}}

  If shouldAnswerQuery tool says the question doesn't warrants an answer, respond with "I am unable to answer the question". Otherwise answer it with relevant information.
  `,config: {
    safetySettings: [
      {
        category: 'HARM_CATEGORY_HATE_SPEECH',
        threshold: 'BLOCK_ONLY_HIGH',
      },
      {
        category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
        threshold: 'BLOCK_NONE',
      },
      {
        category: 'HARM_CATEGORY_HARASSMENT',
        threshold: 'BLOCK_MEDIUM_AND_ABOVE',
      },
      {
        category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
        threshold: 'BLOCK_LOW_AND_ABOVE',
      },
    ],
  },
});

const chatAssistantFlow = ai.defineFlow(
  {
    name: 'chatAssistantFlow',
    inputSchema: ChatAssistantInputSchema,
    outputSchema: ChatAssistantOutputSchema,
  },
  async input => {
    const shouldAnswer = await shouldAnswerQuery(input);
    if (!shouldAnswer) {
      return {answer: 'I am unable to answer the question.'};
    }
    const {output} = await prompt(input);
    return output!;
  }
);
