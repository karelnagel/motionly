import { AllComponents, BaseProps, ComponentProps } from "@motionly/base";
import { Project, Tabs } from "../types";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { WritableDraft } from "immer/dist/internal";
import { useCallback } from "react";
import { getRandomId } from "../helpers";
import { subscribeWithSelector } from "zustand/middleware";
import { updateProject } from "../sdk/templates/update";

type SetType = Store | Partial<Store> | ((state: WritableDraft<Store>) => void);
interface Store {
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
  setSelected: (id: string) => void;
  setTab: (tab: Tabs) => void;
  undo: () => void;
  redo: () => void;
  changeParent: (parentId?: string) => void;
  setComps: (comps: ComponentProps[], parentId: string) => void;
  init: (template: Project) => void;
  set: (s: SetType) => void;
  historyTimeout?: ReturnType<typeof setTimeout>;
  saveTimeout?: ReturnType<typeof setTimeout>;
}

const project: Project = {
  template: {
    childIds: [],
    components: {},
    duration: 6,
    fps: 30,
    height: 1080,
    width: 1080,
  },
  description: "",
  id: "",
  name: "",
};

export const useStore = create(
  subscribeWithSelector(
    immer<Store>((setStore, get) => {
      const set = (
        s: SetType,
        type: "history" | "save" | "both" | "none" = "both"
      ) => {
        if (type === "both" || type === "history") {
          setStore((state) => {
            if (state.historyTimeout) clearTimeout(state.historyTimeout);
            else state.lastProject = JSON.parse(JSON.stringify(get().project));
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
        init: (project: Project) => set({ project }, "none"),
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

        deleteComp: () => {},

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

        setSelected: (id: string) =>
          set((state) => {
            state.selected = state.selected === id ? "" : id;
          }, "none"),
        setTab: (tab: Tabs) => set({ tab }, "none"),
      };
    })
  )
);
export const useComponent = (id?: string): ComponentProps | undefined => {
  return (
    useStore(
      useCallback(
        (state) => state.project.template.components[id || state.selected],
        [id]
      )
    ) || undefined
  );
};
