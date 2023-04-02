import { z } from "zod";
import { storeBase } from ".";
import { LeftTab } from "../pages/Edit/Left";

const LeftStore = z.object({
  tab: LeftTab,
  setTab: z.function().args(LeftTab.optional()).returns(z.void()),
  width: z.number(),
  setWidth: z.function().args(z.number()).returns(z.void()),
});
type LeftStore = z.infer<typeof LeftStore>;

const minWidth = 200;
const maxWidth = 400;
export const useLeftStore = storeBase<LeftStore>(
  (set) => ({
    tab: "add",
    width: 300,
    setTab: (tab?: LeftTab) => set({ tab: tab }),
    setWidth: (width: number) =>
      set((s) => {
        s.width = Math.max(Math.min(width, maxWidth), minWidth);
      }),
  }),
  LeftStore,
  "left"
);
