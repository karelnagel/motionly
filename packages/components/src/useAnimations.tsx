import { noise2D } from "@remotion/noise";
import {
  spring as remotionSpring,
  interpolate as remotionInterpolate,
  useCurrentFrame,
  useVideoConfig,
  Easing,
} from "remotion";
import {
  AnimationProps,
  SpringAnimationProps,
  InterpolateAnimationProps,
  NoiseAnimationProps,
} from "./types/animations";

export const useAnimation = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const spring = ({
    start,
    from,
    to,
    mass = 1,
    damping = 14,
    stiffness = 80,
    duration,
  }: SpringAnimationProps) =>
    remotionSpring({
      fps,
      frame: frame - (start ? start * fps : 0),
      durationInFrames: duration ? duration * fps : undefined,
      config: { damping, mass, stiffness },
      from,
      to,
    });

  const interpolate = ({
    from = 0,
    to = 1,
    duration = 1,
    easing,
    start = 0,
  }: InterpolateAnimationProps) => {
    return remotionInterpolate(
      frame,
      [start * fps, duration ? (duration + start) * fps : durationInFrames],
      [from, to],
      {
        easing:
          easing === "back"
            ? Easing.back()
            : easing === "bounce"
            ? (x) => Easing.bounce(x)
            : easing === "elastic"
            ? Easing.elastic()
            : easing === "ease"
            ? (x) => Easing.ease(x)
            : undefined,
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      }
    );
  };

  const noise = ({
    duration,
    from = 0,
    speed,
    start,
    to = 1,
  }: NoiseAnimationProps) => {
    const x = remotionInterpolate(
      frame,
      [
        (start || 0) * fps,
        duration && start ? (duration + start) * fps : durationInFrames,
      ],
      [0, 1]
    );
    const nois = noise2D(
      `${start}${duration}${from}${to}${speed}` || "",
      1,
      x * (speed || 1)
    );
    return remotionInterpolate(nois, [-1, 1], [from, to]);
  };

  const animation = (props: AnimationProps) => {
    if (props.type === "spring") return spring(props);
    else if (props.type === "noise") return noise(props);
    else return interpolate(props);
  };

  return animation;
};
