import { MediaTabs } from "../../types";
import { Pexels } from "./pexels";

export type StockSrc = {
  icon: string;
  src: string;
};
export type StockResult = {
    name: string;
    logo: string;
    media: StockSrc[];
  };
export type Source = {
  name: string;
  logo: string;
  types: MediaTabs[];
  search: (type: MediaTabs, query: string) => Promise<StockSrc[]>;
  initial: (type: MediaTabs) => Promise<StockSrc[]>;
};

export const StockSources: Source[] = [Pexels];
