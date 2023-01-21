import { RenderMediaInput, RenderMediaOutput } from "@asius/sdk";
import { NextApiRequest, NextApiResponse } from "next";
import { ReqRes } from "../../../types";
import { renderMediaOnLambda } from "@remotion/lambda";
import { functionName, region, serveUrl, composition } from "../../../env";
import { getServerSession } from "../../../lib/getServerSession";
import { TemplateType } from "@asius/base";

export default async function Media(req: NextApiRequest, res: NextApiResponse) {
  let result = null;
  if (req.method === "POST")
    result = await renderMedia({ ...req.body }, { req, res });

  if (!result) return res.status(404).end();
  return res.status(200).json(result);
}
export const renderMedia = async (
  { comps, ...template }: RenderMediaInput,
  reqRes?: ReqRes
): Promise<RenderMediaOutput | null> => {
  const session = await getServerSession(reqRes);
  if (!session?.user?.email) return null;
  const inputProps: TemplateType = {
    ...template,
    comps,
  };
  const { renderId } = await renderMediaOnLambda({
    serveUrl,
    codec: "h264",
    composition,
    functionName,
    region,
    inputProps,
  });
  return { renderId };
};
