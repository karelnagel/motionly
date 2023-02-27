import { NextRequest } from "next/server";

export const config = {
  runtime: "edge",
};

export default async function handler(req: NextRequest) {
  const url = req.nextUrl.searchParams.get("url");
  if (!url) return new Response("No url provided", { status: 400 });

  const headers = new Headers();
  const range = req.headers.get("range");
  if (range) headers.set("range", range);
  try {
    const response = await fetch(url, { headers });
    const reader = response.body?.getReader();
    if (!reader) return new Response("Error", { status: 500 });
    const stream = new ReadableStream({
      start(controller) {
        const pump = async () => {
          const { done, value } = await reader?.read();
          if (done) return controller.close();
          controller.enqueue(value);
          pump();
        };
        return pump();
      },
    });

    const headers2 = new Headers();
    headers2.set("Accept-Ranges", "bytes");
    const contentLength = response.headers.get("content-length");
    if (contentLength) headers2.set("Content-Length", contentLength);
    const contentType = response.headers.get("content-type");
    if (contentType) headers2.set("Content-Type", contentType);
    const contentRange = response.headers.get("content-range");
    if (contentRange) headers2.set("Content-Range", contentRange);

    return new Response(stream, {
      status: response.status,
      headers: headers2,
    });
  } catch (e) {
    return new Response("Error", { status: 500 });
  }
}
