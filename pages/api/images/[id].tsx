import { PrismaClient } from "@prisma/client";
import { ImageResponse } from "@vercel/og";
import { NextApiResponse } from "next";
import { NextRequest } from "next/server";
import { Template } from "../../../components/template";
import { DEFAULT_ELEMENTS } from "../../../types/defaults";

export const config = {
  runtime: "experimental-edge",
};

export default async function handler(req: NextRequest, res: NextApiResponse) {
  const id = req.nextUrl.searchParams.get("id");
  if (!id) return res.status(403).end();

  // const template = await new PrismaClient().template.findUnique({ where: { id } }); //Todo fix https://www.prisma.io/docs/data-platform/data-proxy
  // if (!template) return res.status(404).end();
  // const templateData = JSON.parse(template.template);
  const elements = DEFAULT_ELEMENTS;
  const width = 1080;
  const height = 1080;
  return new ImageResponse(
    (
      <Template
        width={width}
        height={height}
        elements={elements}
        modifications={[]}
        setElements={() => {}}
      />
    ),
    {
      width: width,
      height: height,
    }
  );
}
