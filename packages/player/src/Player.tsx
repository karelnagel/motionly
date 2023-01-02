import { Player as RemotionPlayer } from "@remotion/player";
import { Composition } from "@asius/components";
import { PlayerProps } from "./PlayerProps";
import { applyModifications } from "@asius/types";

export const Player = (props: PlayerProps) => {
  const comps = applyModifications(props.comps, props.modifications);
  return (
    <RemotionPlayer
      component={Composition}
      durationInFrames={Math.ceil(props.duration * props.fps)}
      inputProps={{ comps }}
      compositionHeight={props.height}
      compositionWidth={props.width}
      {...props}
    />
  );
};
