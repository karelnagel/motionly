import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { LeftTabs } from "../app/edit/[id]/Left/Tabs";

interface LeftStore {
  tab?: LeftTabs;
  setTab: (tab?: LeftTabs) => void;
}

export const useLeft = create(
  immer<LeftStore>((set, get) => {
    return {
      tab: "template",
      setTab: (tab?: LeftTabs) =>
        set((s) => ({ tab: s.tab === tab ? undefined : tab })),
    };
  })
);
