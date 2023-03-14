import { NextRequest } from "next/server";

export const config = {
  runtime: "edge",
};

export default async function handler(req: NextRequest) {
  const url = req.nextUrl.searchParams.get("url");
  if (!url) return new Response("No url provided", { status: 400 });

  // const response = await fetch(url);
  // const body = await response.arrayBuffer();
  // return new Response(body, {
  //   status: response.status,
  //   headers: response.headers,
  // });

  const response = await fetch(url);
  const reader = response.body?.getReader();
  const stream = new ReadableStream({
    start(controller) {
      const pump = async () => {
        const idk = await reader?.read();
        if (idk?.done) {
          controller.close();
          return;
        }
        controller.enqueue(idk?.value);
        pump();
      };
      return pump();
    },

    cancel(reason) {
      console.error(reason);
    },
  });
  return new Response(stream, {
    status: response.status,
    headers: response.headers,
  });
}
