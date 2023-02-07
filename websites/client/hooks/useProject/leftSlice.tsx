import { LeftTabs } from "../../app/edit/[id]/Left/Tabs";
import { MediaTabs } from "../../types";
import { StockResult } from "../../lib/sources";
import { GetType, SetType } from ".";

export interface LeftSlice {
  leftTab?: LeftTabs;
  leftMediaTab: MediaTabs;
  leftSetMediaTab: (tab: MediaTabs) => void;
  leftSetTab: (tab?: LeftTabs) => void;
  leftWidth: number;
  leftSetWidth: (width: number) => void;
  leftQuery: string;
  leftSetQuery: (query: string) => void;
  leftMedia?: StockResult[];
  leftSetMedia: (media?: StockResult[]) => void;
}

const minWidth = 270;
const maxWidth = 500;
export const leftSlice = (set: SetType, get: GetType): LeftSlice => {
  return {
    leftTab: "template",
    leftWidth: 300,
    leftMediaTab: "video",
    leftQuery: "",
    leftSetMediaTab: (tab: MediaTabs) =>
      set((s) => {
        s.leftMediaTab = tab;
      }),
    leftSetTab: (tab?: LeftTabs) =>
      set((s) => {
        s.leftTab = s.leftTab === tab ? undefined : tab;
      }),
    leftSetWidth: (width: number) =>
      set((s) => {
        s.leftWidth = Math.max(Math.min(width, maxWidth), minWidth);
      }),
    leftSetQuery: (query: string) =>
      set((s) => {
        s.leftQuery = query;
      }),
    leftSetMedia: (media?: StockResult[]) =>
      set((s) => {
        s.leftMedia = media;
      }),
  };
};
