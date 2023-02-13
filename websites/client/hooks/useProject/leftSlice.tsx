import { LeftTabs } from "../../app/edit/[id]/Left/Tabs";
import { GetType, SetType } from ".";

export interface LeftSlice {
  leftTab?: LeftTabs;
  leftSetTab: (tab?: LeftTabs) => void;
  leftWidth: number;
  leftSetWidth: (width: number) => void;
}

const minWidth = 270;
const maxWidth = 500;
export const leftSlice = (set: SetType, get: GetType): LeftSlice => {
  return {
    leftTab: "template",
    leftWidth: 300,
    leftSetTab: (tab?: LeftTabs) =>
      set((s) => {
        s.leftTab = s.leftTab === tab ? undefined : tab;
      }),
    leftSetWidth: (width: number) =>
      set((s) => {
        s.leftWidth = Math.max(Math.min(width, maxWidth), minWidth);
      }),
  };
};
