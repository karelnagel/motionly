import { Inputs } from "../inputs";
import { z } from "zod";
import { IconType } from "react-icons";
import { WrappersType } from "./wrappers";
import { components } from ".";

import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

export const ComponentName = z.enum([
  "mockup",
  "transcription",
  "audio",
  "audiogram",
  "confetti",
  "gif",
  "graph",
  "image",
  "lottie",
  "map",
  "path",
  "progressbar",
  "qrcode",
  "shape",
  "text",
  "video",
]);
export type ComponentName = z.infer<typeof ComponentName>;

const BaseComp = z.object({
  id: z.string(),
  y: z.number(),
  x: z.number(),
  width: z.number(),
  height: z.number(),
  from: z.number(),
  duration: z.number(),
  opacity: z.number(),
  rotation: z.number(),
  type: ComponentName,
  props: z.any(),
  wrappers: WrappersType,
});

export const Comp = BaseComp.superRefine((s, ctx) => {
  if (!s.type) return;
  const res = components[s.type].zod.safeParse(s.props);
  if (res.success) return;
  res.error.errors.map((e) => ctx.addIssue(e));
});

export const CompPartial = BaseComp.partial().superRefine((s, ctx) => {
  if (!s.type) return;
  const res = components[s.type].zod.safeParse(s.props);
  if (res.success) return;
  res.error.errors.map((e) => ctx.addIssue(e));
});
export type Comp = z.infer<typeof Comp>;

type CompositionStore = {
  template?: Template;
  setTemplate: (template?: Template) => void;
  component?: string;
  setComponent: (id?: string) => void;
  componentRef: React.MutableRefObject<HTMLDivElement | null> | null;
  setComponentRef: (ref: React.MutableRefObject<HTMLDivElement | null> | null) => void;
};

export const useCompositionStore = create(
  subscribeWithSelector<CompositionStore>((set) => ({
    setComponent: (selected) => set({ component: selected }),
    componentRef: null,
    setComponentRef: (selectedRef) => set({ componentRef: selectedRef }),
    component: undefined,
    template: undefined,
    setTemplate: (template) => set({ template }),
  }))
);

export const useComponent = <T = Comp>(fn: (t: Comp) => T = (t) => t as T, id: string): T => {
  return useCompositionStore((s) => {
    if (!s.template) throw new Error("No template");
    const comp = s.template.components[id || ""];
    if (!comp) throw new Error("No component");
    return fn(comp);
  });
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
