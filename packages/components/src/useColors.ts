import { Color } from "@asius/base";
import { interpolateColors, useCurrentFrame, useVideoConfig } from "remotion";

export const useColors = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (color: Color) => {
    return getColor(color, frame, fps);
  };
};
export const getColor = (
  color: Color,
  frame = 0,
  fps = 30
): string | undefined => {
  if (!color) return undefined;
  if (typeof color === "string") return color;
  if (color.type === "interpolate") {
    const { colors, durations } = color;
    const max = Math.min(durations.length, colors.length);
    return interpolateColors(
      frame,
      durations.slice(0, max).map((d) => Math.ceil(d * fps)),
      colors.slice(0, max)
    );
  }
  if (color.type === "linear") {
    const { colors, stops, angle } = color;
    return `linear-gradient(${angle}deg, ${colors
      .map((c, i) => `${getColor(c, frame)} ${stops[i] * 100}%`)
      .join(", ")})`;
  }
  if (color.type === "radial") {
    const { colors, stops } = color;
    return `radial-gradient(${colors
      .map((c, i) => `${getColor(c, frame)} ${stops[i] * 100}%`)
      .join(", ")})`;
  }
};
