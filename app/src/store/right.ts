import { GetType, SetType } from ".";

export type RightTabs = "timeline" | "layers" | "assets" | "settings";
export interface RightSlice {
  rightTab?: RightTabs;
  rightSetTab: (tab?: RightTabs) => void;
  rightWidth: number;
  rightSetWidth: (width: number) => void;
}

const minWidth = 200;
const maxWidth = 400;
export const right = (set: SetType, get: GetType): RightSlice => {
  return {
    rightTab: undefined,
    rightWidth: 250,
    rightSetTab: (tab?: RightTabs) =>
      set((s) => {
        s.rightTab = s.rightTab === tab ? undefined : tab;
      }),
    rightSetWidth: (width: number) =>
      set((s) => {
        s.rightWidth = Math.max(Math.min(width, maxWidth), minWidth);
      }),
  };
};
