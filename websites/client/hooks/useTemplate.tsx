import { ComponentProps } from "@motionly/base";
import { Project, Tabs } from "../types";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface TemplateStore {
  project: Project;
  past: Project[];
  future: Project[];
  selected: string;
  tab: Tabs;
  comp?: ComponentProps;
  parentId?: string;
  setTemplate: (template: Partial<Template>) => void;
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
  init: (template: Template) => void;
}

const template: Project = {
  template: {
    components: {
      byIds: {},
      baseIds: [],
    },
  },
  description: "",
  id: "",
  name: "",
};

export const useTemplate = create(
  immer<TemplateStore>((set, get) => ({
    template,
    past: [],
    future: [],
    selected: "template",
    tab: "props",
    comp: undefined,
    parentId: undefined,
    saveTime: undefined,
    init: (template: Template) => set({ template }),
    setTemplate: (template: Partial<Template>) => {},

    setComp: (comp: Partial<ComponentProps>) => {},

    setComps: (newComps: ComponentProps[], parentId: string) => {},

    deleteComp: () => {},

    addComp: (comp1?: ComponentProps, parentId: string = "") => {},

    changeParent: (newParentId: string) => {},

    undo: () =>
      set((state) => {
        const template = state.past.pop();
        if (!template) return {};
        return {
          template,
          future: [...state.future, state.template],
          past: state.past,
        };
      }),

    redo: () =>
      set((state) => {
        const template = state.future.pop();
        if (!template) return {};
        return {
          template,
          past: [...state.past, state.template],
          future: state.future,
        };
      }),

    setSelected: (id: string) =>
      set((state) => {
        const selected = state.selected === id ? "" : id;
        const [comp, parentId] = find(state.template.comps, selected);
        return {
          selected,
          comp: comp || undefined,
          parentId,
        };
      }),
    setTab: (tab: Tabs) => set({ tab }),
  }))
);
