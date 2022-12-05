import { ImageResponse } from "@vercel/og";
import { NextApiResponse } from "next";
import { NextRequest } from "next/server";
import { Composition } from "../../../components/Composition";
import { getFonts } from "../../../helpers";
import { ElementType } from "../../../../types/dist";

export const config = {
  runtime: "experimental-edge",
};

export default async function handler(req: NextRequest, res: NextApiResponse) {
  const params = req.nextUrl.searchParams;
  const id = params.get("id");
  if (!id) return res.status(403).end();

  let modElements: ElementType[] = [];
  const modWidth = Number(params.get("width"));
  const modHeight = Number(params.get("height"));
  try {
    modElements = JSON.parse(params.get("elements") || "[]");
  } catch (e) {
    console.log(e);
  }
  const result = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/templates/${id}?password=${process.env.NEXTAUTH_SECRET}`
  );
  const { width, height, elements } = await result.json();
  const replace = (elems: ElementType[]) => {
    const newElems: ElementType[] = [];
    for (let element of elems) {
      const mod = modElements.find((e) => e.id === element.id);
      if (mod) element = { ...element, ...mod };

      if (element.type === "div") {
        element = { ...element, children: replace(element.children) };
      }
      newElems.push(element);
    }
    return newElems;
  };
  const finalElems = replace(JSON.parse(elements));
  const fonts = getFonts(finalElems);
  const data: ArrayBuffer[] = [];

  for (const font of fonts) {
    data.push(
      await (
        await fetch(`${process.env.NEXT_PUBLIC_URL}/fonts/${font.family.replaceAll(" ", "")}.ttf`)
      ).arrayBuffer()
    );
  }

  return new ImageResponse(
    (
      <Composition
        width={width}
        height={height}
        elements={finalElems}
        setElements={() => {}}
        lockAspectRatio={false}
      />
    ),
    {
      width: modWidth || width,
      height: modHeight || height,
      // fonts: fonts.map(({ family: name, weight }, i) => ({
      //   data: data[i],
      //   name,
      //   weight: weight as any,
      // })),
    }
  );
}
