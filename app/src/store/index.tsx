import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { WritableDraft } from "immer/dist/internal";
import { persist } from "zustand/middleware";
import { ProjectSlice, template } from "./template";
import { left, LeftSlice } from "./left";
import { right, RightSlice } from "./right";
import { timeline, TimelineSlice } from "./timeline";
import { player, PlayerSlice } from "./player";
import z from "zod";
import { toast } from "sonner";
import { zustandZod } from "./zustand-zod";

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

export const useTemplate = (id?: string) => useStore((s) => s.templates[id || s.template]);
export const useComponent = (id?: string) => useStore((s) => s.templates[s.template].components[id || s.component]);
export const useComponentProps = () => useComponent().props;

export const TestStore = z.object({
  test: z.number(),
  setTest: z.function().args(z.number()).returns(z.void()),
});
export type TestStore = z.infer<typeof TestStore>;
export const useTest = create(
  zustandZod(
    (set, get) => {
      return {
        test: 1,
        setTest: (test) => set({ test }),
      };
    },
    TestStore,
    (error) => error.errors.map((e) => toast.error(`Invalid input for "${e.path.join(">")}": ${e.message}`))
  )
);
