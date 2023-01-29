import { Audio as RemotionAudio, useVideoConfig } from "remotion";
import { videoUrl } from "@motionly/base";
import { StyleAndClass } from "@motionly/base";
import { AudioProps } from "@motionly/base";
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
