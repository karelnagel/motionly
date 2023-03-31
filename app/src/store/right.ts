import { z } from "zod";
import { storeBase } from ".";
import { RightTab } from "../pages/Edit/Right";

const RightStore = z.object({
  rightTab: RightTab.optional(),
  setRightTab: z.function().args(RightTab.optional()).returns(z.void()),
  rightWidth: z.number().min(200).max(400),
  setRightWidth: z.function().args(z.number()).returns(z.void()),
});

export const useRightStore = storeBase(
  (set) => {
    return {
      rightTab: undefined,
      rightWidth: 300,
      setRightTab: (tab?: RightTab) =>
        set((s) => {
          s.rightTab = s.rightTab === tab ? undefined : tab;
        }),
      setRightWidth: (width: number) =>
        set((s) => {
          s.rightWidth = width;
        }),
    };
  },
  RightStore,
  "right"
);
