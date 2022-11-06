import { ImageResponse } from "@vercel/og";
import { NextApiResponse } from "next";
import { NextRequest } from "next/server";
import { Template } from "../../../components/template";

export const config = {
  runtime: "experimental-edge",
};

export default async function handler(req: NextRequest, res: NextApiResponse) {
  const id = req.nextUrl.searchParams.get("id");
  const modifiedElements = req.nextUrl.searchParams.get("elements");
  if (!id) return res.status(403).end();
  const result = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/templates/${id}`);
  const { width, height, elements } = await result.json();
  const finalElem = [...JSON.parse(elements), ...JSON.parse(modifiedElements || "{}")];
  return new ImageResponse(
    <Template width={width} height={height} elements={finalElem} setElements={() => {}} />,
    {
      width: width,
      height: height,
    }
  );
}
