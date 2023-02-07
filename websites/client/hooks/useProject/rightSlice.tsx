import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist } from "zustand/middleware";
import { IoIosSettings } from "react-icons/io";
import { GetType, SetType } from ".";
export const RightTabs = {
  template: {
    name: "Template",
    Icon: IoIosSettings,
  },
  idk: {
    name: "Idk",
    Icon: IoIosSettings,
  },
};
export type RightTabs = keyof typeof RightTabs;

export interface RightSlice {
  tab?: RightTabs;
  setTab: (tab?: RightTabs) => void;
  width: number;
  setWidth: (width: number) => void;
}

const minWidth = 200;
const maxWidth = 400;
export const rightSlice = (set: SetType, get: GetType) :RightSlice=> {
  return {
    tab: "template",
    width: 250,
    setTab: (tab?: RightTabs) =>
      set((s) =>  {
        s.right.tab = s.right.tab === tab ? undefined : tab;
      }),
    setWidth: (width: number) =>
      set((s) => {
        s.right.width = Math.max(Math.min(width, maxWidth), minWidth);
      }),
  };
};
