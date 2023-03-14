import { z } from "zod";
import { MediaType } from "../../../../../types";
import { Giphy } from "./giphy";
import { Pexels } from "./pexels";
import { Pixabay } from "./pixabay";

const StockSrc = z.object({
  icon: z.string().optional(),
  src: z.string(),
  type: MediaType,
});
export type StockSrc = z.infer<typeof StockSrc>;

export const StockResult = z.object({
  name: z.string(),
  logo: z.string(),
  url: z.string(),
  media: z.array(StockSrc),
});
export type StockResult = z.infer<typeof StockResult>;

export type Source = {
  name: string;
  logo: string;
  url: string;
  types: MediaType[];
  search: (
    type: MediaType,
    perPage: number,
    query?: string
  ) => Promise<StockSrc[]>;
};

export const StockSources: Source[] = [Pexels, Pixabay, Giphy];
