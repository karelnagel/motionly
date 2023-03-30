import { GetType, SetType } from ".";
import { RightTab } from "../pages/Edit/Right";

export interface RightSlice {
  rightTab?: RightTab;
  setRightTab: (tab?: RightTab) => void;
  rightWidth: number;
  setRightWidth: (width: number) => void;
}

const minWidth = 200;
const maxWidth = 400;
export const right = (set: SetType, get: GetType): RightSlice => {
  return {
    rightTab: undefined,
    rightWidth: 300,
    setRightTab: (tab?: RightTab) =>
      set((s) => {
        s.rightTab = s.rightTab === tab ? undefined : tab;
      }),
    setRightWidth: (width: number) =>
      set((s) => {
        s.rightWidth = Math.max(Math.min(width, maxWidth), minWidth);
      }),
  };
};
