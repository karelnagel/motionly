import { Audio as RemotionAudio, useVideoConfig } from "remotion";
import { videoUrl } from "@asius/base";
import { StyleAndClass } from "@asius/base";
import { AudioProps } from "@asius/base";
import { getSrc } from "../helpers";

export const defaultAudioProps: AudioProps = {
  comp: "audio",
  startFrom: 0,
  src: videoUrl,
  volume: 1,
};

export const Audio = ({
  startFrom,
  src,
  volume,
}: AudioProps & StyleAndClass) => {
  const { fps } = useVideoConfig();
  if (!src) return null;
  return (
    <RemotionAudio
      startFrom={startFrom ? Math.floor(startFrom * fps) : undefined}
      src={getSrc(src)}
      volume={volume}
    />
  );
};
