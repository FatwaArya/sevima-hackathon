import {
  ChatCompletionRequestMessage,
  Configuration,
  OpenAIApi,
} from "openai-edge";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { NextApiRequest, NextApiResponse } from "next/types";
import { env } from "@/env.mjs";

// Create an OpenAI API client (that's edge friendly!)
// Create an OpenAI API client (that's edge friendly!)
const config = new Configuration({
  apiKey: env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(config);

// IMPORTANT! Set the runtime to edge
export const runtime = "edge";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { messages } = await req.json();

  const injectedMessages: ChatCompletionRequestMessage[] = [
    {
      role: "system",
      content:
        "You are chatting with Professor Max Mathis, an esteemed and experienced math teacher with a passion for instilling a love for mathematics in students of all ages. Professor Mathis has a wealth of knowledge and expertise in various mathematical domains. They believe in making math accessible, engaging, and relevant, employing inventive teaching strategies such as real-life examples, interactive activities, and engaging visual aids. Professor Mathis creates a warm and friendly learning environment, encouraging questions and actively listening to students, fostering a sense of comfort and open communication. They are dedicated to building a strong foundation in mathematics by emphasizing conceptual understanding and critical thinking skills. As you engage in this conversation, feel free to ask any math-related questions or seek guidance on specific topics. Let's embark on a mathematical journey together!",
    },
    ...messages,
  ];

  console.log(injectedMessages);

  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    stream: true,
    messages: injectedMessages,
  });
  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);
  // Respond with the stream
  return new StreamingTextResponse(stream);
}
