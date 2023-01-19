"use client";

import { Player as RemotionPlayer } from "@remotion/player";
import { Composition } from "@asius/components";
import { PlayerProps } from "./PlayerProps";
import { applyModifications } from "@asius/components";
import { useEffect, useState } from "react";

export const Player = (props: PlayerProps) => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => setIsClient(true), []);

  const comps = applyModifications(props.comps, props.modifications);
  return (
    <RemotionPlayer
      component={Composition}
      durationInFrames={Math.ceil(props.duration * props.fps)}
      inputProps={{ comps: isClient ? comps : [] }}
      compositionHeight={props.height}
      compositionWidth={props.width}
      {...props}
    />
  );
};
