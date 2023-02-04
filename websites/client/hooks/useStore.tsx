import { AllComponents, BaseProps, ComponentProps } from "@motionly/base";
import { Project, Tabs } from "../types";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { WritableDraft } from "immer/dist/internal";
import { useCallback } from "react";
import { getRandomId } from "../helpers";

interface Store {
  project: Project;
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
  changeParent: (parentId: string) => void;
  setComps: (comps: ComponentProps[], parentId: string) => void;
  init: (template: Project) => void;
  set: (
    nextStateOrUpdater:
      | Store
      | Partial<Store>
      | ((state: WritableDraft<Store>) => void)
  ) => void;
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
  immer<Store>((set, get) => ({
    project,
    past: [],
    future: [],
    selected: "template",
    tab: "props",
    saveTime: undefined,
    init: (project: Project) => set({ project }),
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

    changeParent: (newParentId: string) => {},

    undo: () =>
      set((state) => {
        const project = state.past.pop();
        if (!project) return;
        state.future.push(state.project);
        state.project = project;
      }),

    redo: () =>
      set((state) => {
        const project = state.future.pop();
        if (!project) return;
        state.past.push(state.project);
        state.project = project;
      }),

    setSelected: (id: string) =>
      set((state) => {
        state.selected = state.selected === id ? "" : id;
      }),
    setTab: (tab: Tabs) => set({ tab }),
  }))
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
