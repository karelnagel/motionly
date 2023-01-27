import { Color } from "@motionly/base";
import { interpolateColors, useCurrentFrame, useVideoConfig } from "remotion";

export const useColors = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (color?: Color) => {
    if (!color) return undefined;
    return getColor(color, frame, fps);
  };
};
export const getColor = (
  color: Color,
  frame = 0,
  fps = 30
): string | undefined => {
  if (!color) return undefined;
  if (color.type === "basic") return color.color;
  if (color.type === "interpolate") {
    const { colors = [], durations = [] } = color;
    const max = Math.min(durations.length, colors.length);
    if (!max) return undefined;
    return interpolateColors(
      frame,
      durations.slice(0, max).map((d) => Math.ceil(d * fps)),
      colors.slice(0, max)
    );
  }
  if (color.type === "linear") {
    const { colors = [], stops = [], angle = 90 } = color;
    return `linear-gradient(${angle}deg, ${colors
      .map((c, i) => `${getColor(c, frame)} ${stops[i] * 100}%`)
      .join(", ")})`;
  }
  if (color.type === "radial") {
    const { colors = [], stops = [] } = color;
    return `radial-gradient(${colors
      .map((c, i) => `${getColor(c, frame)} ${stops[i] * 100}%`)
      .join(", ")})`;
  }
};
