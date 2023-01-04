import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { SpringHookInput, SpringInput } from "./types";

export const newSpring = ({
  frame,
  startInFrames,
  endInFrames,
  from = 0,
  to = 1,
  mass = 1,
  damping = 14,
  stiffness = 80,
  durationInFrames,
  fps,
  reverse,
}: SpringInput) => {
  const config = { mass, damping, stiffness };
  return (
    (startInFrames || startInFrames === 0
      ? spring({
          fps,
          durationInFrames,
          config,
          from,
          to,
          frame: frame - startInFrames,
        })
      : to) +
    (endInFrames
      ? spring({
          fps,
          config,
          durationInFrames,
          frame: frame - endInFrames,
          from: 0,
          to: to - from,
        })
      : 0) *
      (reverse ? -1 : 1)
  );
};

export const useNewSpring = () => {
  const frame = useCurrentFrame();
  const { durationInFrames, fps } = useVideoConfig();

  const func = ({ start, end, duration, ...props }: SpringHookInput) =>
    newSpring({
      frame,
      fps,
      startInFrames: start ? Math.floor(start * fps) : undefined,
      endInFrames: end ? durationInFrames - Math.floor(end * fps) : undefined,
      durationInFrames: duration ? Math.floor(duration * fps) : undefined,
      ...props,
    });

  return func;
};
