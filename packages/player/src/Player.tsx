"use client";

import { Player as RemotionPlayer } from "@remotion/player";
import { Composition } from "@motionly/components";
import { PlayerProps } from "./PlayerProps";
import { useEffect, useMemo, useState } from "react";
import { prepareTemplate } from "@motionly/base";

export const Player = ({
  template: temp,
  loading,
  playerRef,
  ...props
}: PlayerProps) => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => setIsClient(true), []);
  const template = useMemo(() => prepareTemplate(temp), [temp]);
  return (
    <RemotionPlayer
      ref={playerRef}
      component={isClient ? Composition : () => <>{loading}</>}
      fps={template.fps}
      durationInFrames={Math.ceil(template.duration * template.fps)}
      inputProps={{
        bg: template.bg,
        comps: template.comps,
        isSequence: template.isSequence,
      }}
      compositionHeight={template.height}
      compositionWidth={template.width}
      {...props}
    />
  );
};
