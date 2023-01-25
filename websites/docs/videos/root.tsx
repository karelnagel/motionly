import React from "react";
import { Composition, Folder } from "remotion";
import { examples } from "./examples";
import { Composition as Comp } from "@asius/components";

export const Root: React.FC = () => {
  return (
    <>
      <Folder name="Examples">
        {Object.entries(examples).map(([id, e]) => (
          <Composition
            key={id}
            component={Comp}
            durationInFrames={e.fps * e.duration}
            fps={e.fps}
            id={id}
            width={e.width}
            height={e.height}
            defaultProps={{
              ...e,
            }}
          />
        ))}
      </Folder>
    </>
  );
};
