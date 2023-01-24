"use client";

import { Player as RemotionPlayer } from "@remotion/player";
import { Composition } from "@asius/components";
import { PlayerProps } from "./PlayerProps";
import { useEffect, useState } from "react";

export const Player = (props: PlayerProps) => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => setIsClient(true), []);

  const comps = props.comps;
  return (
    <RemotionPlayer
      component={Composition}
      durationInFrames={Math.ceil(props.duration * props.fps)}
      inputProps={{
        comps: isClient ? comps : [],
        background: props.background,
      }}
      compositionHeight={props.height}
      compositionWidth={props.width}
      {...props}
    />
  );
};
