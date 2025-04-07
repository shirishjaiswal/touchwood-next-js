import { streamText, Message } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { initialMessage } from "@/lib/ai/touchwood-data";

// Create Google Generative AI instance outside the request handler
const createGoogleAI = () =>
	createGoogleGenerativeAI({
		apiKey: process.env.GEMINI_API_KEY || "",
	});

export const runtime = "edge";

const generateId = () => Math.random().toString(36).slice(2, 15);

const buildGooglePrompt = (
	messages: Message[],
	initialMessage?: Message
): Message[] => {
	if (initialMessage) {
		messages.unshift(initialMessage);
	}
	return messages.map((message) => ({
		id: message.id || generateId(),
		role: message.role,
		content: message.content,
	}));
};

export async function POST(
	request: Request,
	{ params }: { params: { slug: string } }
) {
	try {
		const { slug } = await params;

		// Parse request body
		const body = await request.json();

		// Ensure the body is an array of messages
		const messages: Message[] = Array.isArray(body.messages)
			? body.messages
			: [body];

		// Validate message structure
		if (!messages.every((msg) => msg.role && msg.content)) {
			return new Response("Invalid message format", { status: 400 });
		}

		let builtMessages;
		if (slug === "chatbot") {
			builtMessages = buildGooglePrompt(messages, {
				id: generateId(),
				role: "user",
				content: initialMessage.content,
			});
		} else if (slug === "mail") {
			builtMessages = buildGooglePrompt(messages, {
				id: generateId(),
				role: "user",
				content:
					"Write a short email return only the email only html code. GuideLine : If asked anything other than generating email html template with css then reply with error message",
			});
		} else if (slug === "ai-chat") {
			builtMessages = buildGooglePrompt(messages, {
				id: generateId(),
				role: "user",
				content:
					"GuideLine : Generate a response based on the given guidelines. The response should align with the tone which can be lovely, polite, rude, sarcastic, very sarcastic, flirty, playful or gentle. Keep the content relevant and engaging while maintaining the intended emotional effect",
			});
		}

		// Create Google AI instance
		const googleAI = createGoogleAI();

		// Ensure messages is an array
		if (!Array.isArray(builtMessages)) {
			console.error("Error: builtMessages is not an array", builtMessages);
			return new Response(
				"Internal Server Error: Messages should be an array",
				{ status: 500 }
			);
		}

		// Stream AI response
		const stream = streamText({
			model: googleAI("gemini-2.0-flash-exp"),
			messages: builtMessages,
			temperature: 0.7,
		});

		return (await stream).toDataStreamResponse();
	} catch (error) {
		console.error("Error:", error);
		return new Response((error as Error).message, { status: 500 });
	}
}
