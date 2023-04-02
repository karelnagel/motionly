import { z } from "zod";
import { storeBase } from ".";
import { RightTab } from "../pages/Edit/Right";

const maxWith = 400;
const minWith = 200;

const RightStore = z.object({
  tab: RightTab.optional(),
  setTab: z.function().args(RightTab.optional()).returns(z.void()),
  width: z.number().min(minWith).max(maxWith),
  setWidth: z.function().args(z.number()).returns(z.void()),
});

export const useRightStore = storeBase(
  (set) => {
    return {
      tab: undefined,
      width: 300,
      setTab: (tab?: RightTab) =>
        set((s) => {
          s.tab = s.tab === tab ? undefined : tab;
        }),
      setWidth: (width: number) =>
        set((s) => {
          s.width = Math.max(minWith, Math.min(maxWith, width));
        }),
    };
  },
  RightStore,
  "right"
);
