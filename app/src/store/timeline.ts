import { z } from "zod";
import { storeBase } from ".";

const minH = 200;
const maxH = 400;
const maxW = 400;
const minW = 100;

const TimelineStore = z.object({
  heigth: z.number().min(minH).max(maxH),
  setHeight: z.function().args(z.number()).returns(z.void()),
  width: z.number().min(minW).max(maxW),
  setWidth: z.function().args(z.number()).returns(z.void()),
});

export const useTimelineStore = storeBase(
  (set) => {
    return {
      heigth: 300,
      setHeight: (height: number) =>
        set((s) => {
          s.heigth = Math.max(Math.min(height, maxH), minH);
        }),
      width: 100,
      setWidth: (width: number) =>
        set((s) => {
          s.width = Math.max(Math.min(width, maxW), minW);
        }),
    };
  },
  TimelineStore,
  "timeline"
);
