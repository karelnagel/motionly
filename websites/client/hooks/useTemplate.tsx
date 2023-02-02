import { ComponentProps } from "@motionly/base";
import { Project, Tabs } from "../types";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { useCallback } from "react";

interface TemplateStore {
  project: Project;
  past: Project[];
  future: Project[];
  selected: string;
  tab: Tabs;
  setProject: (template: Partial<Project>) => void;
  setComp: (comp: Partial<ComponentProps>) => void;
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

export const useTemplate = create(
  immer<TemplateStore>((set, get) => ({
    project,
    past: [],
    future: [],
    selected: "template",
    tab: "props",
    comp: undefined,
    parentId: undefined,
    saveTime: undefined,
    init: (project: Project) => set({ project }),
    setProject: (project: Partial<Project>) =>
      set((state) => ({ project: { ...state.project, ...project } })),

    setComp: (comp: Partial<ComponentProps>) => {},

    setComps: (newComps: ComponentProps[], parentId: string) => {},

    deleteComp: () => {},

    addComp: (comp1?: ComponentProps, parentId: string = "") => {},

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

export const useComponent = (id?: string) => {
  return useTemplate(
    useCallback(
      (state) => state.project.template.components[id || state.selected],
      [id]
    )
  );
};
