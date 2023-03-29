import { getRandomId } from "../helpers";
import { GetType, SetInput, SetType } from ".";
import { Comp, Template } from "@motionly/composition";
import { toast } from "sonner";
import { Page } from "../pages";

export const defaultTemplate: Template = {
  allComponents: [],
  components: {},
  duration: 10,
  fps: 30,
  height: 1080,
  id: getRandomId(),
  name: "New Template",
  width: 1920,
};

export type ProjectSlice = {
  template: Template;
  lastTemplate?: Template;
  setTemplate: (template: Partial<Template>) => void;

  past: Template[];
  future: Template[];
  undo: () => void;
  redo: () => void;
  historyTimeout?: ReturnType<typeof setTimeout>;

  selected: string;
  setSelected: (id?: string) => void;

  setComponent: (comp: Partial<Comp>) => void;
  addComponent: (comp: Comp) => void;
  copyComponent: () => void;
  deleteComp: () => void;

  page: Page;
  setPage: (page: Page) => void;
};

export const template = (setStore: SetType, get: GetType): ProjectSlice => {
  const set = (s: SetInput) => {
    setStore((state) => {
      if (state.historyTimeout) clearTimeout(state.historyTimeout);
      else state.lastTemplate = JSON.parse(JSON.stringify(get().template));
      state.historyTimeout = setTimeout(() => {
        setStore((s) => {
          s.past.push(JSON.parse(JSON.stringify(s.lastTemplate)));
          s.future = [];
          s.historyTimeout = undefined;
        });
      }, 600);
      return s;
    });
  };
  return {
    template: defaultTemplate,
    past: [],
    future: [],
    setTemplate: (template) => set((state) => ({ template: { ...state.template, ...template } })),

    page: "home",
    setPage: (page) => setStore({ page }),
    selected: "",
    setSelected: (selected?: string) => setStore({ selected }),

    setComponent: (comp) => {
      set((s) => {
        const old = s.template.components[s.selected];
        if (!old) return toast.error("No component selected");
        s.template.components[s.selected] = { ...old, ...comp };
      });
    },

    deleteComp: () =>
      set((s) => {
        delete s.template.components[s.selected];
        s.template.allComponents = s.template.allComponents.filter((id) => id !== s.selected);
        s.selected = s.template.allComponents[0];
      }),

    addComponent: (comp) =>
      set((s) => {
        const id = getRandomId();
        s.template.components[id] = comp;
        s.template.allComponents.push(id);
        s.selected = id;
      }),

    copyComponent: () => {
      set((state) => {
        const comp = state.template.components[state.selected];
        if (!comp) return toast.error("No component selected");
        const id = getRandomId();
        state.template.components[id] = comp;
        state.template.allComponents.push(id);
        state.selected = id;
      });
    },

    undo: () =>
      setStore((state) => {
        const project = state.past.pop();
        if (!project) return toast.error("Nothing to undo");
        state.future.push(state.template);
        state.template = project;
      }),

    redo: () =>
      setStore((state) => {
        const project = state.future.pop();
        if (!project) return toast.error("Nothing to redo");
        state.past.push(state.template);
        state.template = project;
      }),
  };
};
