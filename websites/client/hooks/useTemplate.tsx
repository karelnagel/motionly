import { ComponentProps } from "@motionly/base";
import { getRandomId } from "../helpers";
import { Tabs, Template } from "../types";
import { create } from "zustand";

const updateTree = (
  fn: (comps: ComponentProps[], parentId: string) => ComponentProps[],
  currentComps: ComponentProps[],
  currentParentId: string = ""
) => {
  const newComps = fn(currentComps, currentParentId);
  for (const comp of newComps) {
    if ("comps" in comp) comp.comps = updateTree(fn, comp.comps, comp.id);
  }
  return newComps;
};

const find = (
  comps: ComponentProps[],
  id: string,
  parentId: string = ""
): [ComponentProps | null, string] => {
  let sel = comps.find((comp) => comp.id === id) || null;
  let newParentId = parentId;
  if (sel) return [sel, parentId];
  for (const comp of comps) {
    if ("comps" in comp) [sel, newParentId] = find(comp.comps, id, comp.id);
    if (sel) return [sel, newParentId];
  }
  return [sel, ""];
};

const setRandomIds = (comp: ComponentProps) => {
  return updateTree(
    (comps) => comps.map((c) => ({ ...c, id: getRandomId() })),
    [comp]
  )[0];
};

interface TemplateStore {
  template: Template;
  past: Template[];
  future: Template[];
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

const template: Template = {
  comps: [],
  description: "",
  id: "",
  name: "",
  duration: 1,
  fps: 30,
  height: 1080,
  width: 1920,
};

export const useTemplate = create<TemplateStore>((set, get) => ({
  template,
  past: [],
  future: [],
  selected: "template",
  tab: "props",
  comp: undefined,
  parentId: undefined,
  saveTime: undefined,
  init: (template: Template) => set({ template }),
  setTemplate: (template: Partial<Template>) => {
    set((state) => {
      const [comp, parentId] = find(
        template.comps || state.template.comps,
        state.selected
      );
      return {
        template: { ...state.template, ...template },
        comp: comp || undefined,
        parentId,
        past: [...state.past, state.template],
      };
    });
  },

  setComp: (comp: Partial<ComponentProps>) => {
    const { selected, template, setTemplate } = get();
    const comps = updateTree(
      (comps) =>
        comps.map((c) =>
          c.id === selected ? ({ ...c, ...comp } as ComponentProps) : c
        ),
      template.comps
    );
    setTemplate({ comps });
  },

  setComps: (newComps: ComponentProps[], parentId: string) => {
    const { template, setTemplate } = get();
    const comps = updateTree((comps, parent) => {
      if (parent === parentId) return newComps;
      return comps;
    }, template.comps);

    setTemplate({ comps });
  },

  deleteComp: () => {
    const { selected, template, setTemplate } = get();
    const comps = updateTree(
      (comps) => comps.filter((c) => c.id !== selected),
      template.comps
    );

    setTemplate({ comps });
  },

  addComp: (comp1?: ComponentProps, parentId: string = "") => {
    const { template, setTemplate, comp = comp1 } = get();
    if (!comp) return;
    const newComp = setRandomIds(comp);
    const comps = updateTree((comps, parent) => {
      if (parent === parentId) {
        return [...comps, newComp];
      }
      return comps;
    }, template.comps);
    setTemplate({ comps });
  },

  changeParent: (newParentId: string) => {
    const { selected, template, setTemplate } = get();
    const [selectedComp] = find(template.comps, selected);
    const comps = updateTree((comps, parentId) => {
      const newComps = comps.filter((c) => c.id !== selected);
      if (newParentId === parentId && selectedComp)
        if (selectedComp) newComps.push(selectedComp);
      return newComps;
    }, template.comps);
    setTemplate({ comps });
  },

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
}));
