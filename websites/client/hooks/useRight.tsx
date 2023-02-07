import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist } from "zustand/middleware";
import { IoIosSettings } from "react-icons/io";
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

interface RightStore {
  tab?: RightTabs;
  setTab: (tab?: RightTabs) => void;
  width: number;
  setWidth: (width: number) => void;
}

const minWidth = 200;
const maxWidth = 400;
export const useRight = create(
  persist(
    immer<RightStore>((set, get) => {
      return {
        tab: "template",
        width: 250,
        mediaTab: "video",
        query: "",
        setTab: (tab?: RightTabs) =>
          set((s) => ({ tab: s.tab === tab ? undefined : tab })),
        setWidth: (width: number) =>
          set({ width: Math.max(Math.min(width, maxWidth), minWidth) }),
      };
    }),
    { name: "right" }
  )
);
