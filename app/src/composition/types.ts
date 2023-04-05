import { z } from "zod";
import { Wrappers } from "./wrappers";
import { components } from ".";
export * from "./store";

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
  width: z.number().min(1),
  height: z.number().min(1),
  from: z.number().min(0),
  duration: z.number().min(0),
  opacity: z.number().min(0).max(1),
  rotation: z.number(),
  type: ComponentName,
  props: z.any(),
  wrappers: Wrappers,
});

export const Comp = BaseComp.superRefine((s, ctx) => {
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
