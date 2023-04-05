import { NextRequest, NextResponse } from "next/server";
import { release } from "~/config";

export const runtime = "experimental-edge";

export async function GET(req: NextRequest) {
  const res = await fetch(`${release}/download/latest.json`);
  const data = await res.json();
  const universal = data.platforms["darwin-universal"];
  const out = {
    ...data,
    platforms: {
      ...data.platforms,
      "darwin-aarch64": universal,
      "darwin-x86_64": universal,
    },
  };
  return NextResponse.json(out, {
    headers: { "Cache-Control": "s-maxage=3600, public" },
  });
}
