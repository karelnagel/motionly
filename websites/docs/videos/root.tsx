import React from "react";
import { Composition, Folder } from "remotion";
import { examples } from "./examples";
import { Composition as Comp } from "@motionly/components";

export const Root: React.FC = () => {
  return (
    <>
      <Folder name="Examples">
        {Object.entries(examples).map(([id, e]) => {
          return (
            <Composition
              key={id}
              component={Comp}
              durationInFrames={e.fps * e.duration}
              fps={e.fps}
              id={id}
              width={e.width}
              height={e.height}
              defaultProps={{
                bg: e.bg,
                comps: e.comps,
                isSequence: e.isSequence,
              }}
            />
          );
        })}
      </Folder>
    </>
  );
};
