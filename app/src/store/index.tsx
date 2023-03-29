import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { WritableDraft } from "immer/dist/internal";
import { persist } from "zustand/middleware";
import { ProjectSlice, template } from "./template";
import { left, LeftSlice } from "./left";
import { right, RightSlice } from "./right";
import { timeline, TimelineSlice } from "./timeline";
import { player, PlayerSlice } from "./player";

export type SetInput = ProjectStore | Partial<ProjectStore> | ((state: WritableDraft<ProjectStore>) => void);

export type SetType = (nextStateOrUpdater: SetInput, shouldReplace?: boolean | undefined) => void;
export type GetType = () => ProjectStore;

export type ProjectStore = ProjectSlice & LeftSlice & RightSlice & TimelineSlice & PlayerSlice;

export const useStore = create(
  persist(
    immer<ProjectStore>((set, get) => {
      return {
        ...timeline(set),
        ...player(set),
        ...left(set, get),
        ...right(set, get),
        ...template(set, get),
      };
    }),
    {
      name: "motionly",
      partialize: (state) =>
        Object.fromEntries(Object.entries(state).filter(([key]) => !["playerRef", "lastProject", "playerIsPlaying"].includes(key))),
    }
  )
);
