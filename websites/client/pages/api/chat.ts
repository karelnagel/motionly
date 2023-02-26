import { NextRequest } from "next/server";
import { ChatGPTUnofficialProxyAPI } from "chatgpt";
import { z } from "zod";
import { env } from "../../env.mjs";

export const config = {
  runtime: "edge",
};
const Input = z.object({
  prompt: z.string().min(1).max(1000),
  parentMessageId: z.string().optional(),
  conversationId: z.string().optional(),
});
export default async function handler(req: NextRequest) {
  const api = new ChatGPTUnofficialProxyAPI({
    accessToken: env.OPENAI_ACCESS_TOKEN,
  });
  const body = Input.safeParse(await req.json());
  if (!body.success) return new Response("Invalid body", { status: 400 });
  const stream = new ReadableStream({
    async start(controller) {
      await api.sendMessage(body.data.prompt, {
        parentMessageId: body.data.parentMessageId,
        conversationId: body.data.conversationId,
        onProgress: (progress) => {
          const encoder = new TextEncoder();
          controller.enqueue(encoder.encode(JSON.stringify(progress, null, 2)));
        },
      });
      controller.close();
    },

    cancel(reason) {
      console.error(reason);
    },
  });
  return new Response(stream, {
    status: 200,
    headers: {
      "Content-Type": "text/plain",
    },
  });
}
