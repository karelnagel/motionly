import { AnimationProps } from "@asius/components";
import { random } from "remotion";

export const getAnimationColor = (animation: AnimationProps) =>
  `hsl(${random(animation.prop) * 360}, 100%, 70%)`;
