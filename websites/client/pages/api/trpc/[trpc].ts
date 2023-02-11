import { createNextApiHandler } from "@trpc/server/adapters/next";
import { NextApiRequest, NextApiResponse } from "next";
import { appRouter } from "../../../server/routers/_app";

const nextApiHandler = createNextApiHandler({
  router: appRouter,
  createContext: () => ({}),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Request-Method", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");

  if (req.method === "OPTIONS") {
    res.writeHead(200);
    return res.end();
  }

  return nextApiHandler(req, res);
}
