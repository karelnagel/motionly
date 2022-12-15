import { Player as RemotionPlayer, PlayerRef } from "@remotion/player";
import { EditableProps, TemplateType } from "@asius/types";
import { Composition } from "@asius/video";
import { Ref } from "react";

export const Player = ({
  edit,
  template: { width, height, duration, fps, comps },
  playerRef,
}: {
  template: TemplateType;
  edit: EditableProps;
  playerRef: Ref<PlayerRef>;
}) => {
  return (
    <RemotionPlayer
      ref={playerRef}
      component={Composition}
      compositionHeight={height}
      compositionWidth={width}
      durationInFrames={duration * fps}
      fps={fps}
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
