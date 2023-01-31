import { TextStyle } from "@motionly/base";
import { CSSProperties } from "react";
import { useColor } from "./useColor";
import { useMemo } from "react";

export const useTextStyles = ({
  bg,
  outlineColor,
  outlineWidth,
  color,
  ...styles
}: TextStyle) => {
  const colorC = useColor(color);
  const outlineC = useColor(outlineColor);
  const background = useColor(bg);

  const shadowCount = 100;
  const width = outlineWidth || 0;

  const textShadow = useMemo(
    () =>
      width && outlineC
        ? new Array(shadowCount)
            .fill(0)
            .map(
              (_, i) =>
                `${Math.cos(((i + 1) / shadowCount) * Math.PI * 2) * width}px ${
                  Math.sin(((i + 1) / shadowCount) * Math.PI * 2) * width
                }px ${outlineC}`
            )
            .join(", ")
        : undefined,
    [outlineC, width, outlineWidth]
  );

  const style: CSSProperties = useMemo(
    () => ({
      padding: 0,
      margin: 0,
      ...styles,
      color: colorC,
      background,
      textShadow,
    }),
    [colorC, textShadow, background, styles]
  );
  return style;
};
