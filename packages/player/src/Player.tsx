import { Player as RemotionPlayer } from "@remotion/player";
import { useState, useEffect } from "react";
import { Composition } from "@asius/video";
import { PlayerProps } from "./PlayerProps";
import { CompProps } from "@asius/types";

export const Player = (props: PlayerProps) => {
  const isLocal = props.id === undefined;
  const [components, setComponents] = useState(isLocal ? props.components : []);
  const [duration, setDuration] = useState(isLocal ? props.duration : 0);
  const [fps, setFps] = useState(isLocal ? props.fps : 30);
  const [width, setWidth] = useState(isLocal ? props.width : 1080);
  const [height, setHeight] = useState(isLocal ? props.height : 1080);

  useEffect(() => {
    // Todo get data from api
  }, []);
  const getComps = (comps: CompProps[]) => {
    return comps.map((c) => {
      const mod = props.modifications?.find((m) => m.id === c.id);
      let newComp = c;

      if (newComp.type === "div") newComp.children = getComps(newComp.children);
      if (mod) newComp = { ...newComp, ...mod } as CompProps;
      return newComp;
    });
  };
  const comps = getComps(components);
  return (
    <RemotionPlayer
      component={Composition}
      durationInFrames={Math.ceil(duration * fps)}
      inputProps={{ comps }}
      fps={fps}
      compositionHeight={height}
      compositionWidth={width}
      {...props}
    />
  );
};
