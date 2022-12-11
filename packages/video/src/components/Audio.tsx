import { Audio } from "remotion";
import { AudioCompProps } from "@asius/types";

export const AudioComp = ({ src, startFrom, volume }: AudioCompProps) => {
  return <Audio src={src} startFrom={startFrom} volume={volume} />;
};
