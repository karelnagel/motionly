import React from "react";
import { Composition } from "remotion";
import { Composition as Comp } from "../components/Composition";
import { DEFAULT_ELEMENTS } from "../types";

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
          elements: DEFAULT_ELEMENTS,
        }}
      />
    </>
  );
};
