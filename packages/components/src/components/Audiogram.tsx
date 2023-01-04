import { useAudioData, visualizeAudio } from "@remotion/media-utils";
import { useRef } from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { videoUrl } from "../helpers";
import { StyleAndClass } from "../types";

export const AudiogramPosition = {
  start: "Start",
  end: "End",
  center: "Center",
};
export type AudiogramProps = {
  type: "audiogram";
  src: string;
  position: keyof typeof AudiogramPosition;
  gap: number;
  barWidth: number;
  color?: string;
  roundness: number;
  startFrom?: number;
  smoothing?: boolean;
  mirror?: boolean;
  multiplier?: number;
};

export const defaultAudiogramProps: AudiogramProps = {
  type: "audiogram",
  startFrom: 0,
  src: videoUrl,
  barWidth: 16,
  gap: 3,
  position: "center",
  roundness: 8,
  color: "#000FF0FF",
  mirror: true,
  smoothing: true,
  multiplier: 2,
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
}: AudiogramProps & StyleAndClass) => {
  const ref = useRef<HTMLDivElement>(null);
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const audioData = useAudioData(src);
  const width = ref.current?.parentElement?.offsetWidth || 1;
  const height = ref.current?.parentElement?.offsetHeight || 1;

  if (!audioData) {
    return null;
  }
  const maxVisibleBars = Math.floor(width / (gap + barWidth));
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
      ref={ref}
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
              backgroundColor: color,
              borderRadius: roundness,
            }}
          />
        );
      })}
    </div>
  );
};
