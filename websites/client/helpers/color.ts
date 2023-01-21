import { AnimationProps } from "@asius/base";
import { random } from "remotion";

export const getAnimationColor = (animation: AnimationProps) =>
  `hsl(${random(animation.prop) * 360}, 100%, 70%)`;
