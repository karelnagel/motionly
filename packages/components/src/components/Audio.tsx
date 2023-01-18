import { Audio as RemotionAudio, useVideoConfig } from "remotion";
import { videoUrl } from "../helpers";
import { StyleAndClass } from "../types";
import { AudioProps } from "../types/components";

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
      src={src}
      volume={volume}
    />
  );
};
