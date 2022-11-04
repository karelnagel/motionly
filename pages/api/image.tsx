import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";
import { Template } from "../../components/template";
import { DEFAULT_TEMPLATE } from "../../types/defaults";

export const config = {
  runtime: "experimental-edge",
};

export default async function handler(req: NextRequest) {
  const template = DEFAULT_TEMPLATE;
  const { searchParams } = req.nextUrl;
  const username = searchParams.get("username");

  return new ImageResponse(<Template template={template} modifications={[]} setTemplate={()=>{}}/>, {
    width: template.width,
    height: template.height,
  });
}
