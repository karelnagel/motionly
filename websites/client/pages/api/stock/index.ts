import { NextApiRequest, NextApiResponse } from "next";
import { MediaTabs } from "../../../types";
import { StockResult, StockSources } from "../../../lib/sources";

export default async function Stock(req: NextApiRequest, res: NextApiResponse) {
  const { type, query } = req.query;
  if (!type) return res.status(404).json({ error: "Not found" });

  const validSources = StockSources.filter((s) =>
    s.types.includes(type as MediaTabs)
  );
  const results: StockResult[] = [];
  for (const source of validSources) {
    const media = query
      ? await source.search(type as MediaTabs, query as string)
      : await source.initial(type as MediaTabs);
    results.push({ name: source.name, logo: source.logo, media });
  }
  res.status(200).json(results);
}
