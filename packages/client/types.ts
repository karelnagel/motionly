import { NextApiRequest, NextApiResponse } from "next";

export type ReqRes = { req: NextApiRequest, res: NextApiResponse }

export type SidePanelType = undefined | "comp" | "template" | "export" | "add"
