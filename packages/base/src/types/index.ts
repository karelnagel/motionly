export * from "./components";
export * from "./others";
export * from "./animations";
export * from "./enums";

import { z } from "zod";
import { AnimationProps, TransformProps } from "./animations";
import {
  TextProps,
  AudioProps,
  ProgressbarProps,
  DivProps,
  GifProps,
  MapProps,
  PathProps,
  GraphProps,
  AudiogramProps,
  ConfettiProps,
  ImageProps,
  LottieProps,
  MockupProps,
  QRCodeProps,
  ShapeProps,
  TranscriptionProps,
  VideoProps,
} from "./components";
import { Color, HasChildren } from "./enums";

export const MotionBlurProps = z.object({
  layers: z.number().optional(),
  lag: z.number().optional(),
  opacity: z.number().optional(),
});
export type MotionBlurProps = z.infer<typeof MotionBlurProps>;

export const Transforms = z.object({
  prop: TransformProps,
  value: z.number().optional(),
});
export type Transforms = z.infer<typeof Transforms>;

export const CompVariable = z.object({
  id: z.string(),
  prop: z.string(),
});
export type CompVariable = z.infer<typeof CompVariable>;

export const Animations = z.object({
  byIds: z.record(AnimationProps),
  allIds: z.array(z.string()),
});
export const BaseProps = z.object({
  id: z.string(),
  height: z.number().optional(),
  width: z.number().optional(),
  x: z.number().optional(),
  y: z.number().optional(),
  borderRadius: z.number().optional(),
  rotation: z.number().optional(),
  from: z.number().optional(),
  duration: z.number().optional(),
  opacity: z.number().optional(),
  animations: Animations.optional(),
  motionBlur: MotionBlurProps.optional(),
  transforms: z.array(Transforms).optional(),
  freeze: z.number().optional(),
  loopDuration: z.number().optional(),
  parentId: z.string().optional(),
  compVariables: z.array(CompVariable).optional(),
});
export type BaseProps = z.infer<typeof BaseProps>;

export const AllComponents = z.discriminatedUnion("comp", [
  TextProps,
  ImageProps,
  DivProps,
  VideoProps,
  AudioProps,
  LottieProps,
  TranscriptionProps,
  MockupProps,
  MapProps,
  GraphProps,
  QRCodeProps,
  ProgressbarProps,
  GifProps,
  PathProps,
  ConfettiProps,
  ShapeProps,
  AudiogramProps,
]);
export type AllComponents = z.infer<typeof AllComponents>;
export const ComponentProps = BaseProps.and(AllComponents);
export type ComponentProps = z.infer<typeof ComponentProps>;

export const VariableTypes = z.enum([
  "image",
  "audio",
  "video",
  "gif",
  "text",
  "number",
  "color",
  "checkbox",
  "textarea",
  "select",
  "style",
  "stringArray",
]);
export type VariableTypes = z.infer<typeof VariableTypes>;
export const Variable = z.object({
  id: z.string(),
  label: z.string().optional(),
  type: VariableTypes.optional(),
  value: z.any().optional(),
});
export type Variable = z.infer<typeof Variable>;

export const Components = z.record(ComponentProps);
export type Components = z.infer<typeof Components>;
export const Variables = z.object({
  byIds: z.record(Variable),
  allIds: z.array(z.string()),
});
export type Variables = z.infer<typeof Variables>;

export const TemplateType = HasChildren.merge(
  z.object({
    width: z.number(),
    height: z.number(),
    duration: z.number(),
    fps: z.number(),
    variables: Variables.optional(),
    components: Components,
    bg: Color.optional(),
    templateVariables: z.array(CompVariable).optional(),
  })
);
export type TemplateType = z.infer<typeof TemplateType>;
