import { Comp } from "./components";
import { z } from "zod";
import { create } from "zustand";

type CompositionStore = {
  template?: Template;
  selected?: string;
  setSelected: (id?: string) => void;
  selectedRef: React.MutableRefObject<HTMLDivElement | null> | null;
  setSelectedRef: (ref: React.MutableRefObject<HTMLDivElement | null> | null) => void;
  init: (template: Template, selected?: string) => void;
};

export const useCompositionStore = create<CompositionStore>((set) => ({
  init: (template, selected) => set({ template, selected }),
  setSelected: (selected) => set({ selected }),
  selectedRef: null,
  setSelectedRef: (selectedRef) => set({ selectedRef }),
  selected: undefined,
  template: undefined,
}));
export const useComponent = <T = Comp>(fn: (t: Comp) => T = (t) => t as T, id: string): T | undefined => {
  const { template, selected } = useCompositionStore();
  if (!template) return undefined;
  const comp = template.components[id || selected || ""];
  if (!comp) return undefined;
  return fn(comp);
};
export const Template = z.object({
  id: z.string(),
  name: z.string(),
  height: z.number(),
  width: z.number(),
  fps: z.number(),
  duration: z.number(),
  background: z.string().optional(),
  components: z.record(Comp),
  allComponents: z.string().array(),
});
export type Template = z.infer<typeof Template>;
