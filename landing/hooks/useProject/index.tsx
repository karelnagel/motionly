import { Project } from "../../types";
import { createStore, useTemplateStore } from "zustand";
import { immer } from "zustand/middleware/immer";
import { WritableDraft } from "immer/dist/internal";
import { createContext } from "react";
import { useRef } from "react";
import { ReactNode } from "react";
import { useContext } from "react";
import { persist } from "zustand/middleware";
import { ProjectSlice, projectSlice } from "./projectSlice";
import { leftSlice, LeftSlice } from "./leftSlice";
import { rightSlice, RightSlice } from "./rightSlice";
import { timelineSlice, TimelineSlice } from "./timelineSlice";
import { playerSlice, PlayerSlice } from "./playerSlice";

export type SetInput = ProjectStore | Partial<ProjectStore> | ((state: WritableDraft<ProjectStore>) => void);

export type SetType = (nextStateOrUpdater: SetInput, shouldReplace?: boolean | undefined) => void;
export type GetType = () => ProjectStore;

export type ProjectStore = ProjectSlice & LeftSlice & RightSlice & TimelineSlice & PlayerSlice;

type ProjectContext = ReturnType<typeof createProjectStore>;
export const ProjectContext = createContext<ProjectContext | null>(null);

export function ProjectProvider({ children, project }: { children: ReactNode; project: Project }) {
  const storeRef = useRef<ProjectContext>();
  if (!storeRef.current) {
    storeRef.current = createProjectStore(project);
  }
  return <ProjectContext.Provider value={storeRef.current}>{children}</ProjectContext.Provider>;
}

export function useProject<T>(selector: (state: ProjectStore) => T, equalityFn?: (left: T, right: T) => boolean): T {
  const store = useContext(ProjectContext);
  if (!store) throw new Error("Missing ProjectContext.Provider in the tree");
  return useTemplateStore(store, selector, equalityFn);
}

export const createProjectStore = (project: Project) => {
  return createStore(
    persist(
      immer<ProjectStore>((set, get) => {
        return {
          ...timelineSlice(set),
          ...playerSlice(set),
          ...leftSlice(set, get),
          ...rightSlice(set, get),
          ...projectSlice(set, get, project),
        };
      }),
      {
        name: project.id || "",
        partialize: (state) =>
          Object.fromEntries(
            Object.entries(state).filter(([key]) => !["playerRef", "lastProject", "historyTimeout", "saveTimeout", "playerIsPlaying"].includes(key))
          ),
      }
    )
  );
};
