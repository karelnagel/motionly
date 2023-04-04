import { z } from "zod";

export const TextAlign = z.enum(["left", "center", "right"]);
export type TextAlign = z.infer<typeof TextAlign>;
export const JustifyContent = z.enum(["start", "center", "end"]);
export type JustifyContent = z.infer<typeof JustifyContent>;
export const ObjectFit = z.enum(["cover", "contain", "fill", "none"]);
export type ObjectFit = z.infer<typeof ObjectFit>;
export const TranscriptionAnimationTypes = z.enum(["current-word", "previous-text"]);
export type TranscriptionAnimationTypes = z.infer<typeof TranscriptionAnimationTypes>;
export const GraphTypes = z.enum(["line", "bar", "pie"]);
export type GraphTypes = z.infer<typeof GraphTypes>;
export const MockupTypes = z.enum(["iphone", "samsung", "macbook", "macbook2", "ipad", "watch", "monitor", "iphone14"]);
export type MockupTypes = z.infer<typeof MockupTypes>;
export const ProgressbarTypes = z.enum(["spotify", "line", "circle", "square"]);
export type ProgressbarTypes = z.infer<typeof ProgressbarTypes>;
export const ShapeTypes = z.enum(["rect", "triangle", "circle", "ellipse"]);
export type ShapeTypes = z.infer<typeof ShapeTypes>;
export const TriangleDirection = z.enum(["up", "down", "left", "right"]);
export type TriangleDirection = z.infer<typeof TriangleDirection>;
export const FontWeight = z.enum(["100", "200", "300", "400", "500", "600", "700", "800", "900"]);
export type FontWeight = z.infer<typeof FontWeight>;

export const SelectOptions = {
  justify: TextAlign,
  align: TextAlign,
  // "font-family": Object.fromEntries(getAvailableFonts().map((f) => [f.fontFamily, f.fontFamily])),
  // "animation-props": Object.fromEntries(AllAnimations.options.map((o) => [o, o])),
  // "animation-types": Object.fromEntries(AnimationTypes.options.map((o) => [o, o])),
  "object-fit": ObjectFit,
  "graph-types": GraphTypes,
  "mockup-types": MockupTypes,
  "progressbar-types": ProgressbarTypes,
  "triangle-direction": TriangleDirection,
  "shape-types": ShapeTypes,
  "transcription-types": TranscriptionAnimationTypes,
  "font-weight": FontWeight,
  // "transform-props": Object.fromEntries(TransformProps.options.map((o) => [o, o])),
};
