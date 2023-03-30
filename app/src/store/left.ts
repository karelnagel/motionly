import { GetType, SetType } from ".";
import { LeftTab } from "../pages/Edit/Left";

export interface LeftSlice {
  leftTab?: LeftTab;
  setLeftTab: (tab?: LeftTab) => void;
  leftWidth: number;
  setLeftWidth: (width: number) => void;
}

const minWidth = 270;
const maxWidth = 500;
export const left = (set: SetType, get: GetType): LeftSlice => {
  return {
    leftTab: "add",
    leftWidth: 300,
    setLeftTab: (tab?: LeftTab) => set({ leftTab: tab }),
    setLeftWidth: (width: number) =>
      set((s) => {
        s.leftWidth = Math.max(Math.min(width, maxWidth), minWidth);
      }),
  };
};
