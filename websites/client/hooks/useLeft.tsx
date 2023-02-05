import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { LeftTabs } from "../app/edit/[id]/Left/Tabs";
import { MediaTabs } from "../components/MediaTab";

interface LeftStore {
  tab?: LeftTabs;
  mediaTab: MediaTabs;
  setMediaTab: (tab: MediaTabs) => void;
  setTab: (tab?: LeftTabs) => void;
}

export const useLeft = create(
  immer<LeftStore>((set, get) => {
    return {
      tab: "template",
      mediaTab: "video",
      setMediaTab: (tab: MediaTabs) => set({ mediaTab: tab }),
      setTab: (tab?: LeftTabs) =>
        set((s) => ({ tab: s.tab === tab ? undefined : tab })),
    };
  })
);
