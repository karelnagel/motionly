import { NextApiRequest, NextApiResponse } from "next";

export type ReqRes = { req: NextApiRequest; res: NextApiResponse };

export type Tabs = "props" | "animations";
