import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { LeftTabs } from "../app/edit/[id]/Left/Tabs";
import { persist } from "zustand/middleware";
import { MediaTabs } from "../types";
import { StockResult } from "../lib/sources";

interface LeftStore {
  tab?: LeftTabs;
  mediaTab: MediaTabs;
  setMediaTab: (tab: MediaTabs) => void;
  setTab: (tab?: LeftTabs) => void;
  width: number;
  setWidth: (width: number) => void;
  query: string;
  setQuery: (query: string) => void;
  media?: StockResult[];
  setMedia: (media?: StockResult[]) => void;
}

const minWidth = 270;
const maxWidth = 500;
export const useLeft = create(
  persist(
    immer<LeftStore>((set, get) => {
      return {
        tab: "template",
        width: 300,
        mediaTab: "video",
        query: "",
        setMediaTab: (tab: MediaTabs) => set({ mediaTab: tab }),
        setTab: (tab?: LeftTabs) =>
          set((s) => ({ tab: s.tab === tab ? undefined : tab })),
        setWidth: (width: number) =>
          set({ width: Math.max(Math.min(width, maxWidth), minWidth) }),
        setQuery: (query: string) => set({ query }),
        setMedia: (media?: StockResult[]) => set({ media }),
      };
    }),
    { name: "left" }
  )
);
