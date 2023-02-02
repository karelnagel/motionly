"use client";

import { Player as RemotionPlayer } from "@remotion/player";
import { Composition } from "@motionly/components";
import { PlayerProps } from "./PlayerProps";
import { useEffect, useMemo, useState } from "react";
import { applyInputs } from "@motionly/base";

export const Player = ({
  template,
  loading,
  playerRef,
  ...props
}: PlayerProps) => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => setIsClient(true), []);
  const temp = useMemo(() => applyInputs(template), [template]);

  return (
    <RemotionPlayer
      ref={playerRef}
      component={isClient ? Composition : () => <>{loading}</>}
      fps={temp.fps}
      durationInFrames={Math.ceil(temp.duration * temp.fps)}
      inputProps={{
        components: temp.components,
        bg: temp.bg,
        childIds: temp.childIds,
        isSequence: temp.isSequence,
      }}
      compositionHeight={temp.height}
      compositionWidth={temp.width}
      {...props}
    />
  );
};
