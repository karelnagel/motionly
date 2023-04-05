import { TextStyle } from "../../inputs";
import { CSSProperties } from "react";
import { useMemo } from "react";

export const useTextStyles = ({ bg, outlineColor, outlineWidth, color, ...styles }: TextStyle) => {
  const shadowCount = 100;
  const width = outlineWidth || 0;

  const textShadow = useMemo(
    () =>
      width && outlineColor
        ? new Array(shadowCount)
            .fill(0)
            .map(
              (_, i) =>
                `${Math.cos(((i + 1) / shadowCount) * Math.PI * 2) * width}px ${
                  Math.sin(((i + 1) / shadowCount) * Math.PI * 2) * width
                }px ${outlineColor}`
            )
            .join(", ")
        : undefined,
    [outlineColor, width, outlineWidth]
  );

  const style: CSSProperties = useMemo(
    () => ({
      padding: 0,
      margin: 0,
      ...styles,
      color: color,
      background: bg,
      textShadow,
    }),
    [color, textShadow, bg, styles]
  );
  return style;
};
