import { ProgressBarCompProps } from "@asius/types";
import { useCurrentFrame, useVideoConfig } from "remotion";

export const ProgressBarComp = ({
  progressBarType,
  color,
  barWidth,
  backgroundColor,
  height,
  width,
}: ProgressBarCompProps) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const progress = (frame / durationInFrames) * 100;
  if (progressBarType === "line")
    return (
      <div style={{ width: "100%", height: "100%", position: "relative", backgroundColor }}>
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            height: "100%",
            backgroundColor: color,
            width: `${progress}%`,
          }}
        />
      </div>
    );
  if (progressBarType === "spotify")
    return (
      <div
        style={{
          width: "100%",
          height,
          display: "flex",
          alignItems: "center",
          position: "relative",
          margin: `0 ${height / 2}px`,
        }}
      >
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: height / 2,
            borderRadius: height / 4,
            left: 0,
            backgroundColor,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${progress}%`,
              background: color,
              position: "absolute",
              left: 0,
              height: "100%",
            }}
          />
        </div>
        <div
          style={{
            borderRadius: "100%",
            height,
            position: "absolute",
            width: height,
            background: color,
            left: `${progress}%`,
            transform: "translate(-50%, 0)",
          }}
        />
      </div>
    );
  if (progressBarType === "circle")
    // Todo
    return (
      <svg viewBox={`0 0 ${width} ${height}`}>
        <circle
          cx="50%"
          cy="50%"
          r={`calc(50% - ${barWidth! / 2}px)`}
          stroke={backgroundColor}
          strokeWidth={barWidth}
          fill="transparent"
        />
      </svg>
    );
  return null;
};
