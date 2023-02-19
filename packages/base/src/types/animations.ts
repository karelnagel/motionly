import { z } from "zod";

export const TransformProps = z.enum([
  "rotate",
  "rotateX",
  "rotateY",
  "rotateZ",
  "scale",
  "scaleX",
  "scaleY",
  "scaleZ",
  "translate",
  "translateX",
  "translateY",
  "translateZ",
  "skew",
  "skewX",
  "skewY",
  "perspective",
]);
export type TransformProps = z.infer<typeof TransformProps>;
type Props = { label: string; units?: string };
export const transformProps: {
  [key in TransformProps]: Props;
} = {
  rotate: { label: "Rotate", units: "deg" },
  rotateX: { label: "Rotate X", units: "deg" },
  rotateY: { label: "Rotate Y", units: "deg" },
  rotateZ: { label: "Rotate Z", units: "deg" },
  scale: { label: "Scale", units: undefined },
  scaleX: { label: "Scale X", units: undefined },
  scaleY: { label: "Scale Y", units: undefined },
  scaleZ: { label: "Scale Z", units: undefined },
  translate: { label: "Translate", units: "px" },
  translateX: { label: "Translate X", units: "px" },
  translateY: { label: "Translate Y", units: "px" },
  translateZ: { label: "Translate Z", units: "px" },
  skew: { label: "Skew", units: "deg" },
  skewX: { label: "Skew X", units: "deg" },
  skewY: { label: "Skew Y", units: "deg" },
  perspective: { label: "Perspective", units: "px" },
};
export const OtherAnimations = z.enum([
  "blur",
  "opacity",
  "borderRadius",
  ...TransformProps.options,
]);
export type OtherAnimations = z.infer<typeof OtherAnimations>;
export const otherAnimations: { [key in OtherAnimations]: Props } = {
  blur: { label: "Blur", units: "px" },
  opacity: { label: "Opacity", units: "%" },
  borderRadius: { label: "Border Radius", units: "px" },
  ...transformProps,
};
export const TextAnimations = z.enum(["text", "number"]);
export type TextAnimations = z.infer<typeof TextAnimations>;

export const textAnimations: { [key in TextAnimations]: Props } = {
  text: { label: "Text", units: undefined },
  number: { label: "Number", units: undefined },
};
export const AllAnimations = z.enum([
  ...OtherAnimations.options,
  ...TextAnimations.options,
]);
export type AllAnimations = z.infer<typeof AllAnimations>;

export const animationProps: { [key in AllAnimations]: Props } = {
  ...otherAnimations,
  ...textAnimations,
};
export const AnimationTypes = z.enum(["spring", "interpolate", "noise"]);
export type AnimationTypes = z.infer<typeof AnimationTypes>;
export const BaseAnimations = z.object({
  prop: AllAnimations,
  id: z.string(),
  name: z.string().optional(),
  start: z.number().optional(),
  duration: z.number().optional(),
  from: z.number().optional(),
  to: z.number().optional(),
  value: z.string().optional(),
  variable: z.string().optional(),
});
export const SpringAnimationProps = BaseAnimations.extend({
  type: z.literal("spring"),
  mass: z.number().optional(),
  damping: z.number().optional(),
  stiffness: z.number().optional(),
});
export type SpringAnimationProps = z.infer<typeof SpringAnimationProps>;
export const EasingTypes = z.enum([
  "linear",
  "back",
  "bounce",
  "elastic",
  "ease",
]);
export type EasingTypes = z.infer<typeof EasingTypes>;

export const InterpolateAnimationProps = BaseAnimations.extend({
  type: z.literal("interpolate"),
  easing: EasingTypes.optional(),
});
export type InterpolateAnimationProps = z.infer<
  typeof InterpolateAnimationProps
>;
export const NoiseAnimationProps = BaseAnimations.extend({
  type: z.literal("noise"),
  speed: z.number().optional(),
});
export const AnimationProps = z.union([
  SpringAnimationProps,
  InterpolateAnimationProps,
  NoiseAnimationProps,
]);
export type AnimationProps = z.infer<typeof AnimationProps>;
