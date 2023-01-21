import { RenderStillInput, RenderStillOutput } from "@asius/sdk";
import { NextApiRequest, NextApiResponse } from "next";
import { ReqRes } from "../../../types";
import { renderStillOnLambda } from "@remotion/lambda";
import { composition, functionName, region, serveUrl } from "../../../env";
import { getServerSession } from "../../../lib/getServerSession";
import { TemplateType } from "@asius/base";

export default async function Still(req: NextApiRequest, res: NextApiResponse) {
  let result = null;
  if (req.method === "POST")
    result = await renderStill({ ...req.body }, { req, res });

  if (!result) return res.status(404).end();
  return res.status(200).json(result);
}
export const renderStill = async (
  { comps, frame, ...template }: RenderStillInput,
  reqRes?: ReqRes
): Promise<RenderStillOutput | null> => {
  const session = await getServerSession(reqRes);
  const inputProps: TemplateType = {
    ...template,
    comps,
  };
  const { estimatedPrice, renderId, url } = await renderStillOnLambda({
    serveUrl,
    imageFormat: "jpeg",
    privacy: "public",
    frame,
    composition,
    functionName,
    region,
    inputProps,
  });
  return {
    renderId,
    cost: estimatedPrice.accruedSoFar,
    fileUrl: url,
    status: "done",
  };
};
