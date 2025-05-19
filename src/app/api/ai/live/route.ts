import { streamText, Message } from "ai"; 
import { createGoogleGenerativeAI } from "@ai-sdk/google"; 
import konsole from "@/utils/logging/konsole";
import { companyAssistant } from "@/lib/ai/company-assistance";

// Create Google Generative AI instance outside the request handler
const createGoogleAI = () => createGoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY || '',
});

export const runtime = 'edge';

const generateId = () => Math.random().toString(36).slice(2, 15);

const buildGooglePrompt = (messages: Message[]): Message[] => [
  ...messages.map((message) => ({
    id: message.id || generateId(),
    role: message.role,
    content: message.content,
  }))
];

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const messages: Message[] = Array.isArray(body.messages) ? body.messages : [body];
    const websiteUrl = body.websiteUrl;
    const builtMessages: Message[] = [
      {
        id: generateId(),
        role: 'assistant',
        content: companyAssistant(websiteUrl).content,
      },
      ...buildGooglePrompt(messages)
    ].map((message) => ({
      id: message.id,
      role: message.role as 'user' | 'system' | 'assistant', // Ensure role matches expected types
      content: message.content,
    }));
    const googleAI = createGoogleAI();
    const stream = streamText({
      model: googleAI('gemini-2.0-flash-exp'),
      messages: builtMessages,
      temperature: 0.7,
    });
    return (await stream).toDataStreamResponse();
  } catch (error) {
    console.error("Error:", error);
    return new Response((error as Error).message, { status: 500 });
  }
}
