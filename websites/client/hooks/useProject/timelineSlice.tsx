import { SetType } from ".";

export interface TimelineSlice {
  height: number;
  setHeight: (height: number) => void;
  width: number;
  setWidth: (width: number) => void;
}

const minH = 200;
const maxH = 600;
const maxW = 400;
const minW = 100;

export const timelineSlice = (set: SetType): TimelineSlice => {
  return {
    height: 200,
    setHeight: (height: number) =>
      set((s) => {
        s.timeline.height = Math.max(Math.min(height, maxH), minH);
      }),
    width: 100,
    setWidth: (width: number) =>
      set((s) => {
        s.timeline.width = Math.max(Math.min(width, maxW), minW);
      }),
  };
};
