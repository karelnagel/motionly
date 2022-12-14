import { Player as RemotionPlayer } from "@remotion/player";
import { EditableProps, TemplateType } from "@asius/types";
import { Composition } from "@asius/video";

export const Player = ({
  edit,
  template: { width, height, duration, fps, comps },
}: {
  template: TemplateType;
  edit: EditableProps;
}) => {
  return (
    <RemotionPlayer
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
