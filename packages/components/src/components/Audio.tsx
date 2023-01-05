import { Audio as RemotionAudio } from "remotion";
import { videoUrl } from "../helpers";
import { StyleAndClass } from "../types";
import { AudioProps } from "../types/components";

export const defaultAudioProps: AudioProps = {
  type: "audio",
  startFrom: 0,
  src: videoUrl,
  volume: 1,
};

export const Audio = ({
  startFrom,
  src,
  volume,
}: AudioProps & StyleAndClass) => {
  return <RemotionAudio startFrom={startFrom} src={src} volume={volume} />;
};
