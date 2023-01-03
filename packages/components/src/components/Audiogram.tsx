import { useAudioData, visualizeAudio } from "@remotion/media-utils";
import { useRef } from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { videoUrl } from "../helpers";

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
  height?: number;
  width?: number;
};

export const defaultAudiogramProps: AudiogramProps = {
  type: "audiogram",
  height: 500,
  width: 500,
  startFrom: 0,
  src: videoUrl,
  barWidth: 10,
  gap: 1,
  position: "center",
  roundness: 5,
  color: "#000000",
  mirror: true,
  smoothing: true,
};

export const Audiogram = ({
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
}: AudiogramProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const audioData = useAudioData(src);
  if (!audioData) {
    return null;
  }
  const maxVisibleBars = Math.floor(
    (width || ref.current?.offsetWidth || 1) / (gap + barWidth)
  );
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
      style={{
        display: "flex",
        alignItems: position,
        justifyContent: "center",
        gap,
        width,
        height,
      }}
    >
      {bars.map((v, i) => {
        return (
          <div
            key={i}
            style={{
              width: barWidth,
              height: (height || ref.current?.clientHeight || 1) * v,
              backgroundColor: color,
              borderRadius: roundness,
            }}
          />
        );
      })}
    </div>
  );
};
