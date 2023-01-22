import { NextApiRequest, NextApiResponse } from "next";
import { renderStill } from "../sdk";
import { renderMedia } from "./endpoints/media";
import { getProgress } from "./endpoints/progress";
import { RendererOptions } from "./Options";

export const RendererHandler = async (
  req: NextApiRequest,
  res: NextApiResponse,
  options: RendererOptions
) => {
  const { middleware } = options;
  if (middleware) {
    await middleware(req, res);
    res.headersSent && res.end();
    return;
  }
  const { renderer } = req.query;
  const option = renderer?.[0];

  if (option === "progress" && req.method === "GET") {
    const renderId = req.query.renderId as string;
    const result = await getProgress({ renderId });
    if (!result) return res.status(404).end("Error getting progress");
    return res.status(200).json(result);
  }

  if (option === "media" && req.method === "POST") {
    const result = await renderMedia(req.body);
    if (!result) return res.status(404).end("Error rendering media");
    return res.status(200).json(result);
  }

  if (option === "still" && req.method === "POST") {
    const result = await renderStill(req.body);
    if (!result) return res.status(404).end("Error rendering still");
    return res.status(200).json(result);
  }
};
