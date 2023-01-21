import React from "react";
import { Composition, getInputProps } from "remotion";
import { Composition as Comp } from "../Composition";
import { compositions } from "./compositions";
import { BaseProps, ComponentProps, TemplateType } from "@asius/base";
import { getFonts } from "@asius/base";

const inputProps = getInputProps() as TemplateType;
const template = Object.keys(inputProps).length
  ? inputProps
  : ({
      height: 1080,
      width: 1080,
      fps: 30,
      duration: 60,
      comps: [],
      background: "#FFFFFFFF",
    } as TemplateType);

const fonts = getFonts(template.comps);
fonts?.forEach((font) => {
  import(`@remotion/google-fonts/${font.replace(" ", "")}`)
    .then((g) => g.loadFont())
    .catch((e) => console.log(e));
});
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
        const baseProps: BaseProps = {
          id: "1",
          animations: [],
        };
        const compProps: ComponentProps = { ...comp, ...baseProps };
        return (
          <Composition
            key={i}
            id={`${compProps.comp}`}
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
