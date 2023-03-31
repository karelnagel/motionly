import { z } from "zod";
import { storeBase } from ".";
import { LeftTab } from "../pages/Edit/Left";

const LeftStore = z.object({
  leftTab: LeftTab,
  setLeftTab: z.function().args(LeftTab.optional()).returns(z.void()),
  leftWidth: z.number(),
  setLeftWidth: z.function().args(z.number()).returns(z.void()),
});
type LeftStore = z.infer<typeof LeftStore>;

const minWidth = 200;
const maxWidth = 400;
export const useLeftStore = storeBase<LeftStore>(
  (set) => ({
    leftTab: "add",
    leftWidth: 300,
    setLeftTab: (tab?: LeftTab) => set({ leftTab: tab }),
    setLeftWidth: (width: number) =>
      set((s) => {
        s.leftWidth = Math.max(Math.min(width, maxWidth), minWidth);
      }),
  }),
  LeftStore,
  "left"
);
