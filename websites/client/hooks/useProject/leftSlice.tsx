import { LeftTabs } from "../../app/edit/[id]/Left/Tabs";
import { MediaTabs } from "../../types";
import { StockResult } from "../../lib/sources";
import { GetType, SetType } from ".";

export interface LeftSlice {
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
export const leftSlice = (set: SetType, get: GetType): LeftSlice => {
  return {
    tab: "template",
    width: 300,
    mediaTab: "video",
    query: "",
    setMediaTab: (tab: MediaTabs) =>
      set((s) => {
        s.left.mediaTab = tab;
      }),
    setTab: (tab?: LeftTabs) =>
      set((s) => {
        s.left.tab = s.left.tab === tab ? undefined : tab;
      }),
    setWidth: (width: number) =>
      set((s) => {
        s.left.width = Math.max(Math.min(width, maxWidth), minWidth);
      }),
    setQuery: (query: string) =>
      set((s) => {
        s.left.query = query;
      }),
    setMedia: (media?: StockResult[]) =>
      set((s) => {
        s.left.media = media;
      }),
  };
};
