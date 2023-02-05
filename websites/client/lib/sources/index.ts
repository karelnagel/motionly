import { MediaTabs } from "../../types";
import { Giphy } from "./giphy";
import { Pexels } from "./pexels";
import { Pixabay } from "./pixabay";

export type StockSrc = {
  icon: string;
  src: string;
};
export type StockResult = {
  name: string;
  logo: string;
  url: string;
  media: StockSrc[];
};
export type Source = {
  name: string;
  logo: string;
  url: string;
  types: MediaTabs[];
  search: (
    type: MediaTabs,
    perPage: number,
    query?: string
  ) => Promise<StockSrc[]>;
};

export const StockSources: Source[] = [Pexels, Pixabay, Giphy];
