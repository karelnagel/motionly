import { NextRequest } from "next/server";
import { ChatGPTUnofficialProxyAPI } from "chatgpt";
import { z } from "zod";
import { env } from "../../env.mjs";

export const config = {
  runtime: "edge",
};
const Input = z.object({
  prompt: z.string().min(1).max(1000),
  parentMessageId: z.string(),
  conversationId: z.string(),
});
const api = new ChatGPTUnofficialProxyAPI({
  accessToken: env.OPENAI_ACCESS_TOKEN,
});
const mainPrompt =
  "Motionly.video is a website that offers a service to automate video editing and integrate videos with dynamic data on your site. You can use it to create data-driven videos for your marketing strategy or campaign. You are a bot on Motionly.video website and you have to talk to answer to our clients. Respond only 'OK.' if you understand and after that you will be speaking with a client.";

export default async function handler(req: NextRequest) {
  const json = await req.json();
  if (json.start === true) {
    const res = await api.sendMessage(mainPrompt);
    return new Response(JSON.stringify({ ...res, role: "init" }));
  }
  const body = Input.safeParse(json);
  if (!body.success) return new Response("Invalid body", { status: 400 });
  const stream = new ReadableStream({
    async start(controller) {
      await api.sendMessage(body.data.prompt, {
        parentMessageId: body.data.parentMessageId,
        conversationId: body.data.conversationId,
        onProgress: (progress) => {
          const encoder = new TextEncoder();
          controller.enqueue(
            encoder.encode("\n\n\n" + JSON.stringify(progress, null, 2))
          );
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
