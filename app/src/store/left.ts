import { GetType, SetType } from ".";
import { LeftTab } from "../pages/Edit/Left";

export interface LeftSlice {
  leftTab?: LeftTab;
  leftSetTab: (tab?: LeftTab) => void;
  leftWidth: number;
  leftSetWidth: (width: number) => void;
}

const minWidth = 270;
const maxWidth = 500;
export const left = (set: SetType, get: GetType): LeftSlice => {
  return {
    leftTab: "add",
    leftWidth: 300,
    leftSetTab: (tab?: LeftTab) => set({ leftTab: tab }),
    leftSetWidth: (width: number) =>
      set((s) => {
        s.leftWidth = Math.max(Math.min(width, maxWidth), minWidth);
      }),
  };
};
