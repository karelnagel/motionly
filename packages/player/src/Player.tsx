import { Player as RemotionPlayer } from "@remotion/player";
import React, { useState, useEffect } from "react";
import { Composition } from "@asius/video";
import { PlayerProps } from "./PlayerProps";
import { CompProps } from "@asius/types";

export const Player = (props: PlayerProps) => {
  const [components, setComponents] = useState(props.local ? props.components : []);
  const [duration, setDuration] = useState(props.local ? props.duration : 0);
  const [fps, setFps] = useState(props.local ? props.fps : 30);
  const [width, setWidth] = useState(props.local ? props.width : 1080);
  const [height, setHeight] = useState(props.local ? props.height : 1080);

  useEffect(() => {
    // Todo get data from api
  }, []);

  const comps = components.map((e) => {
    const mod = props.modifications?.find((m) => m.id === e.id);
    if (mod) return { ...e, ...mod } as CompProps;
    return e;
  });
  
  return (
    <RemotionPlayer
      component={Composition}
      durationInFrames={Math.ceil(duration * fps)}
      inputProps={{ elements: comps }}
      fps={fps}
      compositionHeight={height}
      compositionWidth={width}
      {...props}
    />
  );
};
