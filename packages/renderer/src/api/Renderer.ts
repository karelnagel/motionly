import { NextApiRequest, NextApiResponse } from "next";
import { RendererHandler } from "./Handler";
import { RendererOptions } from "./Options";

export function Renderer(
  ...args:
    | [RendererOptions]
    | [NextApiRequest, NextApiResponse, RendererOptions]
) {
  if (args.length === 1) {
    return async (req: NextApiRequest, res: NextApiResponse) =>
      await RendererHandler(req, res, args[0]);
  }
  return RendererHandler(args[0], args[1], args[2]);
}
