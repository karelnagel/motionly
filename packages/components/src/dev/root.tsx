import React from "react";
import { Composition, getInputProps } from "remotion";
import { Composition as Comp } from "../Composition";
import { compositions } from "./compositions";
import { BaseProps, ComponentProps, TemplateType } from "@asius/base";

const inputProps = getInputProps() as TemplateType;
const template = Object.keys(inputProps).length
  ? inputProps
  : ({
      height: 1080,
      width: 1080,
      fps: 30,
      duration: 6,
      comps: [],
      background: "#fff",
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
          background: template.background,
        }}
      />
      {compositions.map((comp, i) => {
        const baseComp: BaseProps = {
          id: "1",
          height: 1080,
          width: 1080,
          loopDuration: 3,
        };
        const compProps: ComponentProps = { ...comp, ...baseComp };
        return (
          <Composition
            key={i}
            id={`${compProps.comp}`}
            component={Comp}
            fps={template.fps}
            width={template.width}
            durationInFrames={template.duration * template.fps}
            height={template.height}
            defaultProps={{ comps: [compProps], background: "white" }}
          />
        );
      })}
    </>
  );
};
