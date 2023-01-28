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
  color?: Color,
  frame = 0,
  fps = 30
): string | undefined => {
  if (!color) return undefined;
  if (color.type === "basic") return color.color;
  if (color.type === "interpolate") {
    const { colors = [] } = color;
    if (colors.length < 2) return undefined;
    try {
      return interpolateColors(
        frame,
        colors.map((c) => Math.ceil((c.start || 0) * fps)),
        colors.map((c) => c.color || "#FFF")
      );
    } catch (e) {
      return undefined;
    }
  }
  if (color.type === "linear") {
    const { gradients = [], angle = 90 } = color;
    return `linear-gradient(${angle}deg, ${gradients
      .map((c, i) => `${getColor(c.color, frame)} ${(c.stop || 0) * 100}%`)
      .join(", ")})`;
  }
  if (color.type === "radial") {
    const { gradients = [] } = color;
    return `radial-gradient(${gradients
      .map((c, i) => `${getColor(c.color, frame)} ${(c.stop || 0) * 100}%`)
      .join(", ")})`;
  }
};
