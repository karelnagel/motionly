import { AllComponents, BaseProps, ComponentProps } from "@motionly/base";
import { Project } from "../../types";
import { WritableDraft } from "immer/dist/internal";
import { getRandomId } from "../../helpers";
import { GetType, SetInput, SetType } from ".";
import { trpcClient } from "../../app/ClientProvider";

export type ProjectSlice = {
  project: Project;
  lastProject?: Project;
  past: Project[];
  future: Project[];
  selected: string;
  setProject: (template: Partial<Project>) => void;
  setComp: <T extends AllComponents>(
    func: (state: WritableDraft<T & BaseProps>) => void
  ) => void;
  deleteComp: () => void;
  addComp: (comp: ComponentProps, parentId?: string) => void;
  copyComp: (parentId?: string) => void;
  saveTime: Date | undefined;
  setSelected: (id?: string) => void;
  undo: () => void;
  redo: () => void;
  changeParent: (parentId?: string) => void;
  setComps: (comps: ComponentProps[], parentId: string) => void;
  set: (s: SetInput) => void;
  historyTimeout?: ReturnType<typeof setTimeout>;
  saveTimeout?: ReturnType<typeof setTimeout>;
};

export const projectSlice = (
  setStore: SetType,
  get: GetType,
  project: Project
): ProjectSlice => {
  const set = (
    s: SetInput,
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
          const result = await trpcClient.projects.update.mutate({
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
    const prevProject = get().project;
    setStore(s);
    try {
      Project.parse(get().project);
    } catch {
      setStore({ project: prevProject });
    }
  };
  return {
    project,
    lastProject: undefined,
    past: [],
    future: [],
    selected: "template",
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
        if (!comp) return;

        const parent = comp.parentId
          ? s.project.template.components[comp.parentId]
          : s.project.template;
        if (!parent || !("childIds" in parent)) return;
        parent.childIds = parent.childIds.filter((id) => id !== s.selected);

        const delete_ = (id = s.selected) => {
          const comp = s.project.template.components[id];
          if ("childIds" in comp) comp.childIds.forEach(delete_);
          delete s.project.template.components[id];
        };
        delete_();

        s.selected =
          s.project.template.components[s.project.template.childIds[0]]?.id;
      });
    },

    addComp: (comp: ComponentProps, parentId?: string) =>
      set((state) => {
        const newComp = comp;
        if (!newComp) return;
        newComp.id = getRandomId();

        const parent = parentId
          ? state.project.template.components[parentId]
          : state.project.template;
        if (!parent || !("childIds" in parent)) return;
        parent.childIds.push(newComp.id);
        newComp.parentId = parentId;
        state.project.template.components[newComp.id] = newComp;
        state.selected = newComp.id;
      }),

    copyComp: (parId?: string) => {
      set((state) => {
        const copy = (id = state.selected, parentId = parId) => {
          const comp = state.project.template.components[id];
          if (!comp) return;
          const newId = getRandomId();
          state.project.template.components[newId] = JSON.parse(
            JSON.stringify({ ...comp, id: newId, parentId })
          );
          const newComp = state.project.template.components[newId];
          if ("childIds" in newComp) {
            newComp.childIds = newComp.childIds
              .map((id) => copy(id, newComp.id))
              .filter((x) => x) as string[];
          }

          const parent = newComp.parentId
            ? state.project.template.components[newComp.parentId]
            : state.project.template;
          if (!parent || !("childIds" in parent)) return;
          parent.childIds.push(newComp.id);
          return newComp.id;
        };
        copy();
      });
    },

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
  };
};
