import { ProgressBarCompProps } from "@asius/types";
import { useCurrentFrame, useVideoConfig } from "remotion";

export const ProgressBarComp = ({
  progressBarType,
  color,
  barWidth,
  backgroundColor,
}: ProgressBarCompProps) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
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
            width: `${(frame / durationInFrames) * 100}%`,
          }}
        />
      </div>
    );
  return null;
};
