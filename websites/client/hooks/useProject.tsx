import { AllComponents, BaseProps, ComponentProps } from "@motionly/base";
import { Project, Tabs } from "../types";
import { createStore, useStore } from "zustand";
import { immer } from "zustand/middleware/immer";
import { WritableDraft } from "immer/dist/internal";
import { getRandomId } from "../helpers";
import { updateProject } from "../sdk/templates/update";
import { createContext } from "react";
import { useRef } from "react";
import { ReactNode } from "react";
import { useContext } from "react";
import { persist } from "zustand/middleware";
import { renderSlice, RenderStore } from "./useRender";

type SetType =
  | ProjectStore
  | Partial<ProjectStore>
  | ((state: WritableDraft<ProjectStore>) => void);

type ProjectStore = {
  project: Project;
  lastProject?: Project;
  past: Project[];
  future: Project[];
  selected: string;
  tab: Tabs;
  setProject: (template: Partial<Project>) => void;
  setComp: <T extends AllComponents>(
    func: (state: WritableDraft<T & BaseProps>) => void
  ) => void;
  deleteComp: () => void;
  addComp: (comp?: ComponentProps, parentId?: string) => void;
  saveTime: Date | undefined;
  setSelected: (id?: string) => void;
  setTab: (tab: Tabs) => void;
  undo: () => void;
  redo: () => void;
  changeParent: (parentId?: string) => void;
  setComps: (comps: ComponentProps[], parentId: string) => void;
  set: (s: SetType) => void;
  historyTimeout?: ReturnType<typeof setTimeout>;
  saveTimeout?: ReturnType<typeof setTimeout>;
} & RenderStore;

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
      immer<ProjectStore>((setStore, get) => {
        const set = (
          s: SetType,
          type: "history" | "save" | "both" | "none" = "both"
        ) => {
          if (type === "both" || type === "history") {
            setStore((state) => {
              if (state.historyTimeout) clearTimeout(state.historyTimeout);
              else
                state.lastProject = JSON.parse(JSON.stringify(get().project));
              state.historyTimeout = setTimeout(() => {
                setStore((s) => {
                  s.past.push(JSON.parse(JSON.stringify(s.lastProject)));
                  s.future = [];
                  s.historyTimeout = undefined;
                });
              }, 600);
            });
          }
          if (type === "both" || type === "save") {
            setStore((state) => {
              if (state.saveTimeout) clearTimeout(state.saveTimeout);
              state.saveTimeout = setTimeout(async () => {
                const { project } = get();
                const result = await updateProject({
                  id: project.id || "",
                  project: project,
                });
                setStore((s) => {
                  s.saveTime = result ? new Date() : undefined;
                  s.saveTimeout = undefined;
                });
              }, 3000);
            });
          }

          setStore(s);
        };
        return {
          project,
          lastProject: undefined,
          past: [],
          future: [],
          selected: "template",
          tab: "props",
          saveTime: undefined,
          set,
          setProject: (project: Partial<Project>) =>
            set((state) => ({ project: { ...state.project, ...project } })),

          setComp: <T extends AllComponents>(
            func: (state: WritableDraft<T & BaseProps>) => void
          ) => {
            set((state) => {
              const comp = state.project.template.components[state.selected];
              if (!comp) return;
              func(comp as WritableDraft<T & BaseProps>);
            });
          },

          setComps: (newComps: ComponentProps[], parentId: string) => {},

          deleteComp: () => {
            set((s) => {
              const comp = s.project.template.components[s.selected];
              const parent = comp.parentId
                ? s.project.template.components[comp.parentId]
                : s.project.template;
              if (!parent || !("childIds" in parent)) return;
              parent.childIds = parent.childIds.filter(
                (id) => id !== s.selected
              );
              delete s.project.template.components[s.selected];
              s.selected =
                s.project.template.components[
                  s.project.template.childIds[0]
                ]?.id;
            });
          },

          addComp: (comp?: ComponentProps, parentId?: string) =>
            set((state) => {
              const newComp =
                comp || state.project.template.components[state.selected];
              if (!newComp) return;
              newComp.id = getRandomId();

              const parent = parentId
                ? state.project.template.components[parentId]
                : state.project.template;
              if (!parent || !("childIds" in parent)) return;
              parent.childIds.push(newComp.id);
              newComp.parentId = parentId;
              state.project.template.components[newComp.id] = newComp;
            }),

          changeParent: (newParentId?: string) => {
            set((state) => {
              const comp = state.project.template.components[state.selected];
              if (!comp) return;

              const oldParent = comp.parentId
                ? state.project.template.components[comp.parentId]
                : state.project.template;
              if (oldParent && "childIds" in oldParent)
                oldParent.childIds = oldParent.childIds.filter(
                  (id) => id !== state.selected
                );

              const newParent = newParentId
                ? state.project.template.components[newParentId]
                : state.project.template;
              if (newParent && "childIds" in newParent)
                newParent.childIds.push(state.selected);

              comp.parentId = newParentId;
            });
          },
          undo: () =>
            set((state) => {
              const project = state.past.pop();
              if (!project) return;
              state.future.push(state.project);
              state.project = project;
            }, "save"),

          redo: () =>
            set((state) => {
              const project = state.future.pop();
              if (!project) return;
              state.past.push(state.project);
              state.project = project;
            }, "save"),

          setSelected: (id?: string) => set({ selected: id }, "none"),
          setTab: (tab: Tabs) => set({ tab }, "none"),
          ...renderSlice(setStore, get),
        };
      }),
      { name: project.id || "" }
    )
  );
};
