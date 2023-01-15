import { NextApiRequest, NextApiResponse } from "next";
import { ISODateString } from "next-auth";

export type ReqRes = { req: NextApiRequest; res: NextApiResponse };

export type Tabs = "props" | "animations";

export type SessionWithId = {
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    id?: string | null;
  };
  expires: ISODateString;
};
