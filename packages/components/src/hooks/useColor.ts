import { BaseColor, Color } from "@motionly/base";
import { useMemo } from "react";
import { interpolateColors, useCurrentFrame, useVideoConfig } from "remotion";

const getBaseColor = (fps: number, frame: number, color?: BaseColor) => {
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
};

export const useColor = (color?: Color): string | undefined => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const getColor = () => {
    if (!color || color.type === "basic" || color.type === "interpolate")
      return getBaseColor(fps, frame, color);

    if (color.type === "linear" || color.type === "radial") {
      const { gradients = [], angle = 90 } = color;
      const gradientColors = gradients?.map((c) => ({
        color: getBaseColor(fps, frame, c.color),
        stop: c.stop,
      }));
      return color.type === "linear"
        ? `linear-gradient(${angle}deg, ${gradientColors
            .map((c) => `${c.color} ${(c.stop || 0) * 100}%`)
            .join(", ")})`
        : `radial-gradient(${gradientColors
            .map((c) => `${c.color} ${(c.stop || 0) * 100}%`)
            .join(", ")})`;
    }
  };

  return getColor();
};
