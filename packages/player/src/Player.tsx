"use client";

import { Player as RemotionPlayer, PlayerRef } from "@remotion/player";
import { Composition, SelectedContext } from "@motionly/components";
import { PlayerProps } from "./PlayerProps";
import { forwardRef, useEffect, useMemo, useState } from "react";
import { prepareTemplate } from "@motionly/base";

export const Player = forwardRef<PlayerRef, PlayerProps>(
  (
    {
      template: temp,
      loading,
      setSelected = () => undefined,
      selected,
      selectedRef,
      ...props
    },
    ref
  ) => {
    const [isClient, setIsClient] = useState(false);
    useEffect(() => setIsClient(true), []);
    const template = useMemo(() => prepareTemplate(temp), [temp]);
    return (
      <SelectedContext.Provider
        value={{ setSelected, selected, selectedRef }}
      >
        <RemotionPlayer
          ref={ref}
          component={isClient ? Composition : () => <>{loading}</>}
          fps={template.fps}
          durationInFrames={Math.ceil(template.duration * template.fps)}
          inputProps={{
            bg: template.bg,
            comps: template.comps,
          }}
          compositionHeight={template.height}
          compositionWidth={template.width}
          {...props}
        />
      </SelectedContext.Provider>
    );
  }
);
