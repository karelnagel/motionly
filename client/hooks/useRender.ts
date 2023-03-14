import { WritableDraft } from "immer/dist/internal";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

type RenderStore = {
  renders: string[];
  set: (
    nextStateOrUpdater:
      | RenderStore
      | Partial<RenderStore>
      | ((state: WritableDraft<RenderStore>) => void),
    shouldReplace?: boolean | undefined
  ) => void;
};

export const useRender = create(
  persist(
    immer<RenderStore>((set, get) => ({
      renders: [],
      set,
    })),
    { name: "media" }
  )
);
