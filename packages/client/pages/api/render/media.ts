import { RenderMediaInput, RenderMediaOutput } from "@asius/sdk";
import { NextApiRequest, NextApiResponse } from "next";
import { ReqRes } from "../../../types";
import { renderMediaOnLambda } from "@remotion/lambda";
import { functionName, region, serveUrl } from "../../../env";
import { getServerSession } from "../../../lib/getServerSession";
import { TemplateType } from "@asius/types";
import { applyMods } from "../../../helpers";

export default async function Media(req: NextApiRequest, res: NextApiResponse) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');


    let result = null;
    if (req.method === "POST") result = await renderMedia({ ...req.body }, { req, res });

    if (!result) return res.status(404).end();
    return res.status(200).json(result);
}
export const renderMedia = async (
    { modifications, comps, ...template }: RenderMediaInput,
    reqRes?: ReqRes
): Promise<RenderMediaOutput | null> => {
    const session = await getServerSession(reqRes);
    const inputProps: TemplateType = { ...template, comps: applyMods(comps, modifications) }
    const { renderId } = await renderMediaOnLambda({ serveUrl, codec: "h264", composition: "Main", functionName, region, inputProps })
    return { renderId }
}