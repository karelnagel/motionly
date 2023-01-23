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
      // background: {
      //   type: "linear",
      //   angle: 45,
      //   colors: [
      //     {
      //       type: "interplate",
      //       colors: ["#000000", "#ffff00", "#f000ff"],
      //       durations: [0, 3, 6],
      //     },
      //     "#fff",
      //     {
      //       type: "interplate",
      //       colors: ["#0000ff", "#ff0000", "#0000f0"],
      //       durations: [0, 3, 6],
      //     },
      //   ],
      //   stops: [0, 0.5, 1],
      // },
    } as TemplateType);

// const fonts = getFonts(template.comps);
// fonts?.forEach((font) => {
//   import(`@remotion/google-fonts/${font.replace(" ", "")}`)
//     .then((g) => g.loadFont())
//     .catch((e) => console.log(e));
// });
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
