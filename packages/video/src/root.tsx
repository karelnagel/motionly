import React from "react";
import { Composition, Folder } from "remotion";
import { Composition as Comp } from "./Composition";
import { defaultComponents } from "@asius/types";
import { compositions } from "./compositions";

export const Root: React.FC = () => {
  const height = 1080;
  const width = 1080;
  const fps = 30;
  return (
    <>
      <Composition
        id="Composition"
        component={Comp}
        durationInFrames={60 * fps}
        fps={fps}
        width={width}
        height={height}
        defaultProps={{
          comps: defaultComponents,
        }}
      />
      {Object.keys(compositions).map((key) => (
        <Folder key={key} name={key}>
          {compositions[key].map((comp, i) => (
            <Composition
              key={i}
              id={`${key}-${comp.id}`}
              component={Comp}
              fps={fps}
              width={width}
              durationInFrames={comp.duration * fps}
              height={height}
              defaultProps={{ comps: [comp] }}
            />
          ))}
        </Folder>
      ))}
    </>
  );
};
