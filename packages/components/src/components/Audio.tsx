import { Audio as RemotionAudio } from "remotion";
import { videoUrl } from "../helpers";

export type AudioProps ={
  type: "audio";
  src: string;
  volume: number;
  startFrom: number;
}

export const defaultAudioProps: AudioProps = {
  type: "audio",
  startFrom: 0,
  src: videoUrl,
  volume: 1,
};

export const Audio = ({ src, startFrom, volume }: AudioProps) => {
  return <RemotionAudio src={src} startFrom={startFrom} volume={volume} />;
};
