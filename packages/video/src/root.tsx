import React from "react";
import { Composition } from "remotion";
import { Composition as Comp } from "./Composition";
import { DEFAULT_COMPONENTS } from "@asius/types";
import { registerRoot } from "remotion";

export const Root: React.FC = () => {
  const height = 1080;
  const width = 1080;
  const fps = 30;
  return (
    <>
      <Composition
        id="Composition"
        component={Comp}
        durationInFrames={60}
        fps={fps}
        width={width}
        height={height}
        defaultProps={{
          comps: DEFAULT_COMPONENTS,
        }}
      />
    </>
  );
};

registerRoot(Root);
