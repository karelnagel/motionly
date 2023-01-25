import { TextStyle } from "@motionly/base";
import { CSSProperties } from "react";
import { useColors } from "./useColors";

export const useTextStyles = () => {
  const getColor = useColors();
  const func = ({
    bg,
    outlineColor,
    outlineWidth,
    color,
    ...textStyles
  }: TextStyle): CSSProperties => {
    const shadowCount = 100;
    const width = outlineWidth || 0;
    return {
      padding: 0,
      margin: 0,
      ...textStyles,
      color: getColor(color),
      background: getColor(bg),
      textShadow:
        outlineWidth && outlineColor
          ? new Array(shadowCount)
              .fill(0)
              .map(
                (_, i) =>
                  `${
                    Math.cos(((i + 1) / shadowCount) * Math.PI * 2) * width
                  }px ${
                    Math.sin(((i + 1) / shadowCount) * Math.PI * 2) * width
                  }px ${getColor(outlineColor)}`
              )
              .join(", ")
          : undefined,
    };
  };
  return func;
};
