import { OpenAIStream, StreamingTextResponse } from "ai";
import { Configuration, OpenAIApi } from "openai-edge";
import { env } from "@/env.mjs";

const config = new Configuration({
  apiKey: env.OPENAI_API_KEY,
});
export const openai = new OpenAIApi(config);
