import { Player as RemotionPlayer } from "@remotion/player";
import { CompProps, EditableProps } from "@asius/types";
import { Composition } from "@asius/video";

export const Player = ({
  height,
  width,
  comps,
  edit,
  durationInFrames,
}: {
  height: number;
  width: number;
  comps: CompProps[];
  edit: EditableProps;
  durationInFrames: number;
}) => {
  return (
    <RemotionPlayer
      component={Composition}
      compositionHeight={height}
      compositionWidth={width}
      durationInFrames={durationInFrames}
      fps={30}
      inputProps={{
        comps,
        width,
        height,
        edit,
      }}
      style={{ width: width * edit.scale, height: height * edit.scale }}
    />
  );
};
