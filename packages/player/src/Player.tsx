import { Player as RemotionPlayer } from "@remotion/player";
import { Composition } from "@asius/components";
import { PlayerProps } from "./PlayerProps";
import { CompProps } from "@asius/types";

export const Player = (props: PlayerProps) => {
  const getComps = (comps: CompProps[]) => {
    return comps.map((c) => {
      const mod = props.modifications?.find((m) => m.id === c.id);
      let newComp = c;

      if (newComp.type === "div") newComp.children = getComps(newComp.children);
      if (mod) newComp = { ...newComp, ...mod } as CompProps;
      return newComp;
    });
  };
  const comps = getComps(props.comps);
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
