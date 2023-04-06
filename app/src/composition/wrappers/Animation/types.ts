import { z } from "zod";
export const SpringProps = z.object({
  type: z.literal("spring"),
  damping: z.number().optional(),
  mass: z.number().optional(),
  stiffness: z.number().optional(),
});
export type SpringProps = z.infer<typeof SpringProps>;
export const Easing = z.enum(["ease", "back", "bounce", "elastic"]);
export type Easing = z.infer<typeof Easing>;

export const InterpolateProps = z.object({
  type: z.literal("interpolate"),
  easing: Easing.optional(),
});
export type InterpolateProps = z.infer<typeof InterpolateProps>;

export const NoiseProps = z.object({
  type: z.literal("noise"),
  speed: z.number().optional(),
  seed: z.string().optional(),
});
export type NoiseProps = z.infer<typeof NoiseProps>;
export const AnimationType = z.enum(["spring", "interpolate", "noise"]);
export type AnimationType = z.infer<typeof AnimationType>;
export const AnimationProps = z
  .object({
    id: z.string(),
    prop: z.enum(["translateX", "translateY", "scale", "rotate", "opacity", "skewX", "skewY", "perspective", "borderRadius"]),
    from: z.number().optional(),
    to: z.number().optional(),
    start: z.number().optional(),
    duration: z.number().optional(),
    type: AnimationType,
  })
  .and(z.discriminatedUnion("type", [SpringProps, InterpolateProps, NoiseProps]));
export type AnimationProps = z.infer<typeof AnimationProps>;
