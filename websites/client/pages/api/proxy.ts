import { NextRequest } from "next/server";

export const config = {
  runtime: "edge",
};

export default async function handler(req: NextRequest) {
  const url = req.nextUrl.searchParams.get("url");
  if (!url) return new Response("No url provided", { status: 400 });

  const response = await fetch(url);
  const body = await response.arrayBuffer();
  return new Response(body, {
    status: response.status,
    headers: response.headers,
  });
}
