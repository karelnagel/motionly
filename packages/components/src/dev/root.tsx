import React from "react";
import { Composition, getInputProps } from "remotion";
import { Composition as Comp } from "../Composition";
import { compositions } from "./compositions";
import { BaseProps, ComponentProps, TemplateType } from "../types";

const inputProps = getInputProps() as TemplateType;
const template = Object.keys(inputProps).length
  ? inputProps
  : ({
      height: 1080,
      width: 1080,
      fps: 30,
      duration: 60,
      comps: [],
    } as TemplateType);
export const Root: React.FC = () => {
  return (
    <>
      <Composition
        id="Main"
        component={Comp}
        durationInFrames={template.duration * template.fps}
        fps={template.fps}
        width={template.width}
        height={template.height}
        defaultProps={{
          comps: template.comps,
        }}
      />
      {compositions.map((comp, i) => {
        const baseProps: BaseProps = {
          id: "1",
          componentAnimations: [
            {
              type: "translate",
              start: 0.1,
              from: -2000,
              to: 0,
              end: 10,
              duration: 3,
              reverse: false,
            },
          ],
        };
        const compProps: ComponentProps = { ...comp, ...baseProps };
        return (
          <Composition
            key={i}
            id={`${compProps.type}`}
            component={Comp}
            fps={template.fps}
            width={template.width}
            durationInFrames={template.duration * template.fps}
            height={template.height}
            defaultProps={{ comps: [compProps] }}
          />
        );
      })}
    </>
  );
};
