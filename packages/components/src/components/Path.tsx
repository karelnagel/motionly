import { evolvePath } from "@remotion/paths";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";

export const StrokeLinecap = {
  butt: "Butt",
  round: "Round",
  square: "Square",
};
export type PathProps ={
  type: "path";
  path: string;
  animation: {
    duration: number;
    from: number;
    to: number;
  };
  strokeColor?: string;
  strokeWidth?: number;
  viewBoxHeight?: number;
  viewBoxWidth?: number;
  fillColor?: string;
  strokeLinecap?: keyof typeof StrokeLinecap;
  width: number;
  height: number;
}

export const defaultPathProps: PathProps = {
  type: "path",
  height: 500,
  width: 500,
  path: "M 10 315 L 110 215 A 30 50 0 0 1 162.55 162.45 L 172.55 152.45 A 30 50 - 45 0 1 215.1 109.9 L 315 10",
  animation: {
    duration: 10,
    from: 0,
    to: 20,
  },
};

export const Path = ({
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
}: PathProps) => {
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
