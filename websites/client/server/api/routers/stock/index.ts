import { createTRPCRouter, protectedProcedure } from "../../trpc";
import { z } from "zod";

import { StockResult, StockSources } from "./sources";
import { MediaType } from "../../../../types";

const tags = ["Stock media"];
export const stock = createTRPCRouter({
  get: protectedProcedure
    .meta({ openapi: { method: "GET", path: "/stock-media", tags } })
    .input(
      z.object({
        type: MediaType,
        query: z.string().optional(),
      })
    )
    .output(z.object({ results: z.array(StockResult) }))
    .query(async ({ input: { type, query }, ctx }) => {
      const validSources = StockSources.filter((s) => s.types.includes(type));
      const results: StockResult[] = [];
      for (const source of validSources) {
        const media = await source.search(
          type,
          query ? 21 : 9,
          query
        );
        results.push({
          name: source.name,
          logo: source.logo,
          url: source.url,
          media,
        });
      }
      console.log(results[0].media);
      return { results };
    }),
});
