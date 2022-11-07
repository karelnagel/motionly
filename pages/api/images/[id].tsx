import { ImageResponse } from "@vercel/og";
import { NextApiResponse } from "next";
import { NextRequest } from "next/server";
import { Template } from "../../../components/template";
import { ElementType } from "../../../types";

export const config = {
  runtime: "experimental-edge",
};

export default async function handler(req: NextRequest, res: NextApiResponse) {
  const id = req.nextUrl.searchParams.get("id");
  if (!id) return res.status(403).end();

  let modifiedElements: ElementType[] = [];
  try {
    modifiedElements = JSON.parse(req.nextUrl.searchParams.get("elements") || "[]");
  } catch (e) {
    console.log(e);
  }

  const result = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/templates/${id}`);
  const { width, height, elements } = await result.json();
  const replace = (elems: ElementType[]) => {
    const newElems: ElementType[] = [];
    for (let element of elems) {
      const mod = modifiedElements.find((e) => e.id === element.id);
      if (mod) element = { ...element, ...mod };

      if (element.type === "div") {
        element = { ...element, children: replace(element.children) };
      }
      newElems.push(element);
    }
    return newElems;
  };
  const finalElems = replace(JSON.parse(elements));

  return new ImageResponse(
    <Template width={width} height={height} elements={finalElems} setElements={() => {}} />,
    {
      width: width,
      height: height,
    }
  );
}
