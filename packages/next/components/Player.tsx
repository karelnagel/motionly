import { Player as RemotionPlayer } from "@remotion/player";
import { CompProps } from "../types";
import { Composition } from "./Composition";

export const Player = ({
  height,
  width,
  scale,
  elements,
  lockAspectRatio,
  select,
  setElements,
  selected,
}: {
  height: number;
  width: number;
  scale: number;
  elements: CompProps[];
  lockAspectRatio: boolean;
  setElements: (e: CompProps[]) => void;
  select: (id: string) => void;
  selected?: string;
}) => {
  return (
    <RemotionPlayer
      component={Composition}
      compositionHeight={height}
      compositionWidth={width}
      durationInFrames={1}
      fps={30}
      inputProps={{
        elements,
        width,
        height,
        lockAspectRatio,
        setElements,
        draggable: true,
        scale,
        select,
        selected,
      }}
      style={{ width: width * scale, height: height * scale }}
    />
  );
};
