import { CSSProperties } from "react";
import { ComponentProps, TextStyle } from "./types";

export const videoUrl =
  "https://remotionlambda-24lixyhuqn.s3.us-east-1.amazonaws.com/video.mp4";

export const getTextStyle = ({
  bg,
  outlineColor,
  outlineWidth,
  ...textStyles
}: TextStyle): CSSProperties => {
  const shadowCount = 100;
  const width = outlineWidth || 0;
  return {
    padding: 0,
    margin: 0,
    ...textStyles,
    backgroundColor: bg,
    textShadow:
      outlineWidth && outlineColor
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
  };
};

export const applyModifications = (
  comps: ComponentProps[],
  modifications?: Partial<ComponentProps>[]
) => {
  return comps.map((c) => {
    const mod = modifications?.find((m) => m.id === c.id);
    let newComp = c;
    if (newComp.comp === "div")
      newComp.children = applyModifications(newComp.children, modifications);
    if (mod) newComp = { ...newComp, ...mod } as ComponentProps;
    return newComp;
  });
};

// if from is negative, it's relative to the end of the video
export const getFrom = (maxDuration: number, from?: number) => {
  if (!from) return 0;
  if (Math.abs(from) >= maxDuration) return 0;
  return from > 0 ? from : maxDuration + from;
};

export const getDuration = (
  maxDuration: number,
  from?: number,
  duration?: number,
  addFrom?: boolean
) => {
  const actualFrom = getFrom(maxDuration, from);
  let actualDuration = 0;
  if (!duration) actualDuration = maxDuration - actualFrom;
  else if (duration > 0) actualDuration = duration;
  else if (duration < 0) actualDuration = maxDuration - actualFrom + duration;
  if (
    !actualDuration ||
    actualDuration <= 0 ||
    actualDuration > maxDuration - actualFrom
  )
    actualDuration = maxDuration - actualFrom || 1;
  return addFrom ? actualDuration + actualFrom : actualDuration;
};

export const getFonts = (comps: ComponentProps[]) => {
  return JSON.stringify(comps)
    .match(/fontFamily":"(.*?)"/g)
    ?.map((font) => font.replace(/fontFamily":"(.*?)"/g, "$1"));
};
