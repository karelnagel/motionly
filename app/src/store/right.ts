import { GetType, SetType } from ".";
import { LeftTab } from "../pages/Edit/Left";

export interface RightSlice {
  rightTab?: LeftTab;
  rightSetTab: (tab?: LeftTab) => void;
  rightWidth: number;
  rightSetWidth: (width: number) => void;
}

const minWidth = 200;
const maxWidth = 400;
export const right = (set: SetType, get: GetType): RightSlice => {
  return {
    rightTab: undefined,
    rightWidth: 250,
    rightSetTab: (tab?: LeftTab) =>
      set((s) => {
        s.rightTab = s.rightTab === tab ? undefined : tab;
      }),
    rightSetWidth: (width: number) =>
      set((s) => {
        s.rightWidth = Math.max(Math.min(width, maxWidth), minWidth);
      }),
  };
};
