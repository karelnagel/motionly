import React from "react";
import { Composition, getInputProps } from "remotion";
import { Composition as Comp } from "../Composition";
import { compositions } from "./compositions";
import { BaseProps, ComponentProps, TemplateType } from "../types";

const inputProps = getInputProps() as TemplateType;
const props = Object.keys(inputProps).length
  ? inputProps
  : { height: 1080, width: 1080, fps: 30, duration: 60, comps: [] };
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
          comps: props.comps,
        }}
      />
      {compositions.map((comp, i) => {
        const baseProps: BaseProps = {
          borderRadius: 0,
          duration: 0,
          from: 0,
          height: 1080,
          width: 1080,
          id: "1",
          rotation: 0,
          x: 0,
          y: 0,
        };
        const compProps: ComponentProps = { ...comp, ...baseProps };
        return (
          <Composition
            key={i}
            id={`${compProps.type}`}
            component={Comp}
            fps={props.fps}
            width={props.width}
            durationInFrames={props.duration * props.fps}
            height={props.height}
            defaultProps={{ comps: [compProps] }}
          />
        );
      })}
    </>
  );
};
