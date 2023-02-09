import { SetType } from ".";

export interface TimelineSlice {
  timelineHeight: number;
  timelineSetHeight: (height: number) => void;
  timelineWidth: number;
  timelineSetWidth: (width: number) => void;
}

const minH = 200;
const maxH = 600;
const maxW = 400;
const minW = 100;

export const timelineSlice = (set: SetType): TimelineSlice => {
  return {
    timelineHeight: 300,
    timelineSetHeight: (height: number) =>
      set((s) => {
        s.timelineHeight = Math.max(Math.min(height, maxH), minH);
      }),
    timelineWidth: 100,
    timelineSetWidth: (width: number) =>
      set((s) => {
        s.timelineWidth = Math.max(Math.min(width, maxW), minW);
      }),
  };
};
