import { Project } from "../../types";
import { createStore, useStore } from "zustand";
import { immer } from "zustand/middleware/immer";
import { WritableDraft } from "immer/dist/internal";
import { createContext } from "react";
import { useRef } from "react";
import { ReactNode } from "react";
import { useContext } from "react";
import { persist } from "zustand/middleware";
import { exportSlice, ExportSlice } from "./exportSlice";
import { ProjectSlice, projectSlice } from "./projectSlice";

export type SetInput =
  | ProjectStore
  | Partial<ProjectStore>
  | ((state: WritableDraft<ProjectStore>) => void);

export type SetType = (
  nextStateOrUpdater: SetInput,
  shouldReplace?: boolean | undefined
) => void;
export type GetType = () => ProjectStore;

export type ProjectStore = ProjectSlice & ExportSlice;

type ProjectContext = ReturnType<typeof createProjectStore>;
export const ProjectContext = createContext<ProjectContext | null>(null);

export function ProjectProvider({
  children,
  project,
}: {
  children: ReactNode;
  project: Project;
}) {
  const storeRef = useRef<ProjectContext>();
  if (!storeRef.current) {
    storeRef.current = createProjectStore(project);
  }
  return (
    <ProjectContext.Provider value={storeRef.current}>
      {children}
    </ProjectContext.Provider>
  );
}

export function useProject<T>(
  selector: (state: ProjectStore) => T,
  equalityFn?: (left: T, right: T) => boolean
): T {
  const store = useContext(ProjectContext);
  if (!store) throw new Error("Missing BearContext.Provider in the tree");
  return useStore(store, selector, equalityFn);
}

export const createProjectStore = (project: Project) => {
  return createStore(
    persist(
      immer<ProjectStore>((set, get) => {
        return {
          ...projectSlice(set, get, project),
          ...exportSlice(set, get),
        };
      }),
      { name: project.id || "" }
    )
  );
};
