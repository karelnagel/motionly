import { useAudioData, visualizeAudio } from "@remotion/media-utils";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { videoUrl } from "@motionly/base";
import { StyleAndClass } from "@motionly/base";
import { AudiogramProps } from "@motionly/base";
import { useColor } from "../hooks/useColor";
import { getSrc } from "../helpers";

export const defaultAudiogramProps: AudiogramProps = {
  comp: "audiogram",
  startFrom: 0,
  src: videoUrl,
  barWidth: 16,
  gap: 3,
  position: "center",
  roundness: 8,
  color: {
    type: "basic",
    color: "#000FFFFF",
  },
  mirror: true,
  smoothing: true,
  multiplier: 2,
  height: 100,
  width: 100,
};

export const Audiogram = ({
  barWidth,
  roundness,
  src,
  color,
  gap,
  position,
  smoothing,
  mirror,
  style,
  className,
  multiplier = 1,
  startFrom,
  width = 0,
  height = 0,
}: AudiogramProps & StyleAndClass) => {
  const { fps } = useVideoConfig();
  const currentFrame = useCurrentFrame();
  const background = useColor(color);
  let frame = startFrom ? currentFrame + startFrom * fps : currentFrame;
  if (frame < 0) frame = 0;
  if (!src) return null;

  const audioData = useAudioData(getSrc(src));
  if (!audioData) {
    return null;
  }
  const maxVisibleBars = Math.floor(width / ((gap || 0) + barWidth));
  const numberOfSamples = Math.pow(
    2,
    Math.ceil(Math.log(maxVisibleBars / (mirror ? 2 : 1)) / Math.log(2))
  );
  const visualization = numberOfSamples
    ? visualizeAudio({
        fps,
        frame,
        audioData,
        numberOfSamples,
        smoothing,
      })
    : [];
  const bars = mirror
    ? [...[...visualization].reverse(), ...visualization]
    : visualization;
  return (
    <div
      className={className}
      style={{
        display: "flex",
        alignItems: position,
        justifyContent: "center",
        gap,
        width,
        height,
        ...style,
      }}
    >
      {bars.map((v, i) => {
        return (
          <div
            key={i}
            style={{
              width: barWidth,
              height: height * v * multiplier,
              background,
              borderRadius: roundness,
            }}
          />
        );
      })}
    </div>
  );
};
