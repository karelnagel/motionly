import React from "react";
import { Composition, getInputProps } from "remotion";
import { prepareTemplate, TemplateType } from "@motionly/base";
import { Composition as Comp } from "@motionly/components";

const inputProps = getInputProps() as TemplateType;
const inputTemplate: TemplateType = Object.keys(inputProps).length
  ? inputProps
  : {
      height: 1080,
      width: 1080,
      fps: 30,
      duration: 6,
      childIds: [],
      components: {},
      bg: {
        type: "basic",
        color: "#FFFFFFFF",
      },
    };
const template = prepareTemplate(inputTemplate);

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
          comps: template.comps || [],
          bg: template.bg,
        }}
      />
    </>
  );
};
