import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "@/server/api/trpc";
import { openai } from "@/server/openai";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { ChatCompletionRequestMessage } from "openai-edge/types/api";

export const instructorRouter = createTRPCRouter({});
