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
  template: string;
  templates: { [key: string]: Template };
  allTemplates: string[];
  selectTemplate: (id: string) => void;
  newTemplate: () => string;
  cloneTemplate: (id: string) => string;
  deleteTemplate: (id: string) => void;

  lastTemplate?: Template;
  editTemplate: (template: Partial<Template>) => void;

  past: Template[];
  future: Template[];
  undo: () => void;
  redo: () => void;
  historyTimeout?: ReturnType<typeof setTimeout>;

  component: string;
  setComponent: (id?: string) => void;

  editComponent: (comp: Partial<Comp>) => void;
  newComponent: (comp: Comp) => void;
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
    template: "",
    templates: {},
    allTemplates: [],
    newTemplate: () => {
      const id = getRandomId();
      setStore((s) => {
        s.templates[id] = defaultTemplate;
        s.allTemplates.push(id);
        s.template = id;
        s.page = "edit";
      });
      return id;
    },
    deleteTemplate: (id) =>
      setStore((s) => {
        delete s.templates[id];
        s.allTemplates = s.allTemplates.filter((id) => id !== s.template);
        s.template = s.allTemplates[0];
      }),
    selectTemplate: (template) => setStore({ template, page: "edit" }),
    cloneTemplate: (id) => {
      const newId = getRandomId();
      setStore((s) => {
        s.templates[newId] = JSON.parse(JSON.stringify(s.templates[id]));
        s.allTemplates.push(newId);
        s.template = newId;
      });
      return newId;
    },

    past: [],
    future: [],
    editTemplate: (template) =>
      set((s) => {
        s.templates[s.template] = { ...s.templates[s.template], ...template };
      }),

    page: "home",
    setPage: (page) => setStore({ page }),
    component: "",
    setComponent: (selected?: string) => setStore({ component: selected }),

    editComponent: (comp) => {
      set((s) => {
        const old = s.templates[s.template].components[s.component];
        if (!old) return toast.error("No component selected");
        s.templates[s.template].components[s.component] = { ...old, ...comp };
      });
    },

    deleteComp: () =>
      set((s) => {
        delete s.templates[s.template].components[s.component];
        s.templates[s.template].allComponents = s.templates[s.template].allComponents.filter((id) => id !== s.component);
        s.component = s.templates[s.template].allComponents[0];
      }),

    newComponent: (comp) =>
      set((s) => {
        const id = getRandomId();
        s.templates[s.template].components[id] = comp;
        s.templates[s.template].allComponents.push(id);
        s.component = id;
      }),

    copyComponent: () => {
      set((s) => {
        const comp = s.templates[s.template].components[s.component];
        if (!comp) return toast.error("No component selected");
        const id = getRandomId();
        s.templates[s.template].components[id] = comp;
        s.templates[s.template].allComponents.push(id);
        s.component = id;
      });
    },

    undo: () =>
      setStore((s) => {
        const project = s.past.pop();
        if (!project) return toast.error("Nothing to undo");
        s.future.push(s.templates[s.template]);
        s.templates[s.template] = project;
      }),

    redo: () =>
      setStore((s) => {
        const project = s.future.pop();
        if (!project) return toast.error("Nothing to redo");
        s.past.push(s.templates[s.template]);
        s.templates[s.template] = project;
      }),
  };
};
