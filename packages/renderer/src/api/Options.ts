import { NextApiRequest, NextApiResponse } from "next";

export interface RendererOptions {
  middleware?: (req: NextApiRequest, res: NextApiResponse) => Promise<void>;
}
