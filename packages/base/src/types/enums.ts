import { z } from "zod";

export const TextAlign = z.enum(["left", "center", "right"]);
export type TextAlign = z.infer<typeof TextAlign>;
export const JustifyContent = z.enum(["start", "center", "end"]);
export type JustifyContent = z.infer<typeof JustifyContent>;
export const ObjectFit = z.enum(["cover", "contain", "fill", "none"]);
export type ObjectFit = z.infer<typeof ObjectFit>;
export const TranscriptionAnimationTypes = z.enum([
  "current-word",
  "previous-text",
]);
export type TranscriptionAnimationTypes = z.infer<
  typeof TranscriptionAnimationTypes
>;
export const GraphTypes = z.enum(["line", "bar", "pie"]);
export type GraphTypes = z.infer<typeof GraphTypes>;
export const MockupTypes = z.enum([
  "iphone",
  "samsung",
  "macbook",
  "macbook2",
  "ipad",
  "watch",
  "monitor",
  "iphone14",
]);
export type MockupTypes = z.infer<typeof MockupTypes>;
export const ProgressbarTypes = z.enum(["spotify", "line", "circle", "square"]);
export type ProgressbarTypes = z.infer<typeof ProgressbarTypes>;

export const ShapeTypes = z.enum(["rect", "triangle", "circle", "ellipse"]);
export type ShapeTypes = z.infer<typeof ShapeTypes>;
export const TriangleDirection = z.enum(["up", "down", "left", "right"]);
export type TriangleDirection = z.infer<typeof TriangleDirection>;

export const BasicColor = z.object({
  type: z.literal("basic"),
  color: z.string().optional(),
});
export type BasicColor = z.infer<typeof BasicColor>;
export const InterpolateColor = z.object({
  type: z.literal("interpolate"),
  colors: z
    .array(
      z.object({
        color: z.string().optional(),
        start: z.number().optional(),
      })
    )
    .optional(),
});
export type InterpolateColor = z.infer<typeof InterpolateColor>;


export const BaseColor = z.union( [
  BasicColor,
  InterpolateColor,
]);
export type BaseColor = z.infer<typeof BaseColor>;

export const GradientColor = z.object({
  type: z.literal("linear").or(z.literal("radial")),
  gradients: z
    .array(
      z.object({
        color: BaseColor.optional(),
        stop: z.number().optional(),
      })
    )
    .optional(),
  angle: z.number().optional(),
});
export type GradientColor = z.infer<typeof GradientColor>;

export const Color = z.union( [
  BasicColor,
  InterpolateColor,
  GradientColor,
]);
export type Color = z.infer<typeof Color>;

export const HasChildren = z.object({
  childIds: z.array(z.string()),
  comps: z.lazy(() => z.any()),
  // comps: z.lazy(() => z.array(ComponentProps).optional()),
});
export type HasChildren = z.infer<typeof HasChildren>;
