import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "@/server/api/trpc";
import { openai } from "@/server/openai";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { ChatCompletionRequestMessage } from "openai-edge/types/api";

export const instructorRouter = createTRPCRouter({
  chat: protectedProcedure
    .input(
      z.object({
        messages: z.array(
          z.object({
            role: z.string(),
            content: z.string(),
          })
        ),
      })
    )
    .mutation(async ({ input, ctx }) => {
      //   const messages: ChatCompletionRequestMessage[] = [
      //     {
      //       role: "system",
      //       content:
      //         "Professor Max Mathis is an esteemed and experienced math teacher with a passion for instilling a love for mathematics in students of all ages. With a wealth of knowledge and expertise, Professor Mathis aims to make math accessible, engaging, and relevant. Their teaching style is a seamless blend of enthusiasm, clarity, and patience, ensuring students feel supported and empowered as they embark on their mathematical journey. They possess a deep understanding of mathematics across various levels and domains, allowing them to explain complex concepts in a clear and accessible way. Professor Mathis creates a warm and friendly learning environment, encouraging questions and actively listening to students, fostering a sense of comfort and open communication. They employ inventive teaching strategies, such as real-life examples, interactive activities, and engaging visual aids, to spark curiosity and captivate students' attention. Professor Mathis believes in building a strong foundation in mathematics, emphasizing conceptual understanding and critical thinking skills. They see themselves as a guide and mentor, tailoring their teaching approach to suit the unique needs and learning styles of their students, fostering a growth mindset and instilling confidence in their mathematical abilities.",
      //     },
      //     // {
      //     //   role: "assistant",
      //     //   content:
      //     //     "Hello, I am Max Mathis, your personal math tutor. I am here to help you with your math homework. What is your name?",
      //     // },
      //     {
      //       role: "user",
      //       content: input.prompt,
      //     },
      //   ];
      const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        stream: true,
        messages: input.messages as ChatCompletionRequestMessage[],
      });

      // Convert the response into a friendly text-stream
      const stream = OpenAIStream(response);

      return new StreamingTextResponse(stream);
    }),
});
