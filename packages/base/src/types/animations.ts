export const transformProps = {
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

export const animationProps = {
  blur: { label: "Blur", units: "px" },
  opacity: { label: "Opacity", units: "%" },
  borderRadius: { label: "Border Radius", units: "px" },
  ...transformProps,
};

export const animationTypes = {
  spring: "Spring",
  interpolate: "Interpolate",
  noise: "Noise",
};
export interface BaseAnimations {
  start?: number;
  duration?: number;
  from?: number;
  to?: number;
}
export interface SpringAnimationProps extends BaseAnimations {
  type: "spring";
  mass?: number;
  damping?: number;
  stiffness?: number;
}
export const EasingTypes = {
  linear: "Linear",
  back: "Back",
  bounce: "Bounce",
  elastic: "Elastic",
  ease: "Ease",
};
export interface InterpolateAnimationProps extends BaseAnimations {
  type: "interpolate";
  easing?: keyof typeof EasingTypes;
}
export interface NoiseAnimationProps extends BaseAnimations {
  type: "noise";
  speed?: number;
}

export type AnimationProps = {
  prop: keyof typeof animationProps;
} & (NoiseAnimationProps | InterpolateAnimationProps | SpringAnimationProps);
