import { AudiogramCompProps } from "@asius/types";
import { useAudioData, visualizeAudio } from "@remotion/media-utils";
import { useCurrentFrame, useVideoConfig } from "remotion";

export const AudiogramComp = ({
  barWidth,
  roundness,
  src,
  color,
  gap,
  height,
  position,
  smoothing,
  mirror,
  width,
}: AudiogramCompProps) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const audioData = useAudioData(src);
  if (!audioData) {
    return null;
  }
  const maxVisibleBars = Math.floor(width / (gap + barWidth));
  const numberOfSamples = Math.pow(
    2,
    Math.ceil(Math.log(maxVisibleBars / (mirror ? 2 : 1)) / Math.log(2))
  );
  const visualization = visualizeAudio({
    fps,
    frame,
    audioData,
    numberOfSamples,
    smoothing,
  });
  const bars = mirror
    ? [...[...visualization].reverse(), ...visualization]
    : visualization;
  return (
    <div
      style={{
        display: "flex",
        alignItems: position,
        justifyContent: "center",
        gap,
        width: "100%",
        height: "100%",
      }}
    >
      {bars.map((v, i) => {
        return (
          <div
            key={i}
            style={{
              width: barWidth,
              height: height * v,
              backgroundColor: color,
              borderRadius: roundness,
            }}
          />
        );
      })}
    </div>
  );
};
