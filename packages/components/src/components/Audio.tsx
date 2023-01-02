import { Audio as RemotionAudio } from "remotion";
import { AudioProps } from "@asius/types";

export const Audio = ({ src, startFrom, volume }: AudioProps) => {
  return <RemotionAudio src={src} startFrom={startFrom} volume={volume} />;
};
