import { getRandomId } from "../helpers";
import { storeBase } from ".";
import { Comp, CompPartial } from "../composition";
import { Template } from "../composition";
import { toast } from "sonner";
import { Page } from "../enums";
import { z } from "zod";
import { useCallback } from "react";

export const defaultTemplate: Template = {
  allComponents: [],
  components: {},
  duration: 10,
  fps: 30,
  height: 1080,
  id: getRandomId(),
  name: "New Template",
  width: 1080,
  background: "#FFFFFFFF",
};

const TemplateStore = z.object({
  template: z.string().optional(),
  setTemplate: z.function().args(z.string().optional()).returns(z.void()),

  templates: z.record(Template),
  allTemplates: z.array(z.string()),
  lastTemplate: Template.optional(),

  newTemplate: z.function().returns(z.string()),
  cloneTemplate: z.function().args(z.string()).returns(z.string()),
  deleteTemplate: z.function().args(z.string()).returns(z.void()),
  editTemplate: z.function().args(Template.partial()).returns(z.void()),

  past: z.array(Template),
  future: z.array(Template),
  undo: z.function().returns(z.void()),
  redo: z.function().returns(z.void()),
  historyTimeout: z.any().optional(),

  component: z.string().optional(),
  componentRef: z.any().optional(),
  setComponentRef: z.function().args(z.any().optional()).returns(z.void()),
  setComponent: z.function().args(z.string().optional()).returns(z.void()),

  editComponent: z.function().args(CompPartial, z.boolean().optional()).returns(z.void()),
  editComponentProps: z.function().args(z.any()).returns(z.void()),
  newComponent: z.function().args(Comp).returns(z.void()),
  copyComponent: z.function().returns(z.void()),
  deleteComp: z.function().returns(z.void()),

  page: Page,
  setPage: z.function().args(Page).returns(z.void()),
});

type TemplateStore = z.infer<typeof TemplateStore>;
export const useTemplateStore = storeBase<TemplateStore>(
  (setStore, get) => {
    const set: typeof setStore = (s, replace) => {
      setStore((state) => {
        if (state.historyTimeout) clearTimeout(state.historyTimeout);
        else state.lastTemplate = JSON.parse(JSON.stringify(get().templates[get().template || ""]));
        state.historyTimeout = setTimeout(() => {
          setStore((s) => {
            s.past.push(JSON.parse(JSON.stringify(s.lastTemplate)));
            s.future = [];
            s.historyTimeout = undefined;
          });
        }, 600);
      });
      setStore(s);
    };
    return {
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
      setTemplate: (template) =>
        setStore({ template, page: "edit", future: [], past: [], historyTimeout: undefined, lastTemplate: undefined, component: undefined }),
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
      editTemplate: (template) => {
        set((s) => {
          if (!s.template) return;
          s.templates[s.template] = { ...s.templates[s.template], ...template };
        });
      },

      page: "home",
      setPage: (page) => setStore({ page }),
      setComponent: (component?: string) => setStore({ component }),
      setComponentRef: (componentRef) => setStore({ componentRef }),
      editComponent: (comp, noCheck = false) => {
        set(
          (s) => {
            if (!s.template) return;
            const old = s.templates[s.template].components[s.component || ""];
            if (!old) return toast.error("No component selected");
            s.templates[s.template].components[s.component || ""] = { ...old, ...comp };
          },
          undefined,
          noCheck
        );
      },
      editComponentProps: (props) => {
        set((s) => {
          if (!s.template) return;
          const comp = s.templates[s.template].components[s.component || ""];
          if (!comp) return toast.error("No component selected");
          s.templates[s.template].components[s.component || ""].props = { ...comp.props, ...props };
        });
      },

      deleteComp: () =>
        set((s) => {
          if (!s.template) return;
          delete s.templates[s.template].components[s.component || ""];
          s.templates[s.template].allComponents = s.templates[s.template].allComponents.filter((id) => id !== s.component);
          s.component = s.templates[s.template].allComponents[0];
        }),

      newComponent: (comp) =>
        set((s) => {
          if (!s.template) return;
          const id = getRandomId();
          s.templates[s.template].components[id] = { ...comp, id };
          s.templates[s.template].allComponents.push(id);
          s.component = id;
        }),

      copyComponent: () => {
        set((s) => {
          if (!s.template) return;
          const comp = s.templates[s.template].components[s.component || ""];
          if (!comp) return toast.error("No component selected");
          const id = getRandomId();
          s.templates[s.template].components[id] = { ...comp, id };
          s.templates[s.template].allComponents.push(id);
          s.component = id;
        });
      },

      undo: () =>
        setStore((s) => {
          if (!s.template) return;
          const project = s.past.pop();
          if (!project) return toast.error("Nothing to undo");
          s.future.push(s.templates[s.template]);
          s.templates[s.template] = project;
        }),

      redo: () =>
        setStore((s) => {
          if (!s.template) return;
          const project = s.future.pop();
          if (!project) return toast.error("Nothing to redo");
          s.past.push(s.templates[s.template]);
          s.templates[s.template] = project;
        }),
    };
  },
  TemplateStore,
  "project"
);

export function useTemplate<T = Template>(fn: (t: Template, s: TemplateStore) => T = (t, s) => t as T, id?: string): T {
  return useTemplateStore(
    useCallback(
      (s) => {
        const temp = s.templates[id || s.template || ""];
        if (!temp) throw new Error("No template selected");
        return fn(temp, s);
      },
      [id, fn]
    )
  );
}
export function useComponent<T = Comp>(fn: (t: Comp, s: TemplateStore) => T = (t) => t as T, id?: string): T | undefined {
  return useTemplateStore(
    useCallback(
      (s) => {
        const temp = s.templates[s.template || ""];
        if (!temp) throw new Error("No template selected");
        const comp = temp.components[id || s.component || ""];
        if (!comp) return undefined;
        return fn(comp, s);
      },
      [id, fn]
    )
  );
}
