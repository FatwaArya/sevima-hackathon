import {
  type ChatCompletionRequestMessage,
  Configuration,
  OpenAIApi,
} from "openai-edge";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { NextApiRequest, NextApiResponse } from "next/types";
import { env } from "@/env.mjs";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/server/auth";
import { prisma } from "@/server/db";

// Create an OpenAI API client (that's edge friendly!)
const config = new Configuration({
  apiKey: env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(config);

// IMPORTANT! Set the runtime to edge
export const runtime = "edge";

export default async function handler(req: Request, res: Response) {
  // Get the user's session

  const { messages, instructor } = (await req.json()) as {
    messages: ChatCompletionRequestMessage[];
    instructor: string;
  };

  //get instructor from db
  const instructorData = await prisma.instructor.findUnique({
    where: {
      name: instructor,
    },
    select: {
      personalities: true,
    },
  });
  console.log(instructorData);

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const injectedMessages: ChatCompletionRequestMessage[] = [
    {
      role: "system",
      content: instructorData?.personalities,
    },
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    ...messages,
  ];

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
