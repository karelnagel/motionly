import React from "react";
import { Composition, Folder, getInputProps } from "remotion";
import { Composition as Comp } from "./Composition";
import { defaultComponents, TemplateType } from "@asius/types";
import { compositions } from "./compositions";

const inputProps = getInputProps() as TemplateType;
const props = Object.keys(inputProps).length
  ? inputProps
  : { height: 1080, width: 1080, fps: 30, duration: 60 };
export const Root: React.FC = () => {
  return (
    <>
      <Composition
        id="Main"
        component={Comp}
        durationInFrames={props.duration * props.fps}
        fps={props.fps}
        width={props.width}
        height={props.height}
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
              fps={props.fps}
              width={props.width}
              durationInFrames={comp.duration * props.fps}
              height={props.height}
              defaultProps={{ comps: [comp] }}
            />
          ))}
        </Folder>
      ))}
    </>
  );
};
