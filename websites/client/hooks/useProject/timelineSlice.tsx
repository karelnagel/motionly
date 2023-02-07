import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist } from "zustand/middleware";

interface TimelineStore {
  height: number;
  setHeight: (height: number) => void;
  width: number;
  setWidth: (width: number) => void;
}

const minH = 200;
const maxH = 600;
const maxW = 400;
const minW = 100;
export const useTimeline = create(
  persist(
    immer<TimelineStore>((set) => {
      return {
        height: 200,
        setHeight: (height: number) =>
          set({ height: Math.max(Math.min(height, maxH), minH) }),
        width: 100,
        setWidth: (width: number) =>
          set({ width: Math.max(Math.min(width, maxW), minW) }),
      };
    }),
    { name: "timeline" }
  )
);
