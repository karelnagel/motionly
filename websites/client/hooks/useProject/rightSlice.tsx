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
  rightTab?: RightTabs;
  rightSetTab: (tab?: RightTabs) => void;
  rightWidth: number;
  rightSetWidth: (width: number) => void;
}

const minWidth = 200;
const maxWidth = 400;
export const rightSlice = (set: SetType, get: GetType) :RightSlice=> {
  return {
    rightTab: "template",
    rightWidth: 250,
    rightSetTab: (tab?: RightTabs) =>
      set((s) =>  {
        s.rightTab = s.rightTab === tab ? undefined : tab;
      }),
    rightSetWidth: (width: number) =>
      set((s) => {
        s.rightWidth = Math.max(Math.min(width, maxWidth), minWidth);
      }),
  };
};
