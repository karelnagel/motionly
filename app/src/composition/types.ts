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
