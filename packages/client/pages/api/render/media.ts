import { RenderMediaInput, RenderMediaOutput } from "@asius/sdk";
import { NextApiRequest, NextApiResponse } from "next";
import { ReqRes } from "../../../types";
import { renderMediaOnLambda } from "@remotion/lambda";
import { functionName, region, serveUrl } from "../../../env";
import { getServerSession } from "../../../lib/getServerSession";
import { applyModifications, TemplateType } from "@asius/components";

export default async function Media(req: NextApiRequest, res: NextApiResponse) {
  let result = null;
  if (req.method === "POST")
    result = await renderMedia({ ...req.body }, { req, res });

  if (!result) return res.status(404).end();
  return res.status(200).json(result);
}
export const renderMedia = async (
  { modifications, comps, ...template }: RenderMediaInput,
  reqRes?: ReqRes
): Promise<RenderMediaOutput | null> => {
  const session = await getServerSession(reqRes);
  const inputProps: TemplateType = {
    ...template,
    comps: applyModifications(comps, modifications),
  };
  const { renderId } = await renderMediaOnLambda({
    serveUrl,
    codec: "h264",
    composition: "Main",
    functionName,
    region,
    inputProps,
  });
  return { renderId };
};
