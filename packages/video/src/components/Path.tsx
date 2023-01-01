import { evolvePath } from "@remotion/paths";
import { PathCompProps } from "@asius/types";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";

export const PathComp = ({
  path,
  animation,
  strokeColor,
  strokeWidth,
  width,
  height,
  viewBoxHeight,
  viewBoxWidth,
  fillColor,
  strokeLinecap,
}: PathCompProps) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const anim = spring({
    fps,
    frame,
    from: animation.from,
    to: animation.to,
    durationInFrames: animation.duration * fps,
    config: {
      damping: 100,
    },
  });
  const evolution = evolvePath(anim, path);
  return (
    <svg
      viewBox={`0 0 ${viewBoxWidth || width} ${viewBoxHeight || height}`}
      style={{ height: "100%", width: "100%" }}
    >
      <path
        d={path}
        fill={fillColor || "none"}
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeDasharray={evolution.strokeDasharray}
        strokeDashoffset={evolution.strokeDashoffset}
        strokeLinecap={strokeLinecap}
      />
    </svg>
  );
};
