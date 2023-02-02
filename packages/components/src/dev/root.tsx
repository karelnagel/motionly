import React from "react";
import { Composition, Folder, getInputProps } from "remotion";
import { Composition as Comp } from "../Composition";
import { compositions } from "./compositions";
import { BaseProps, ComponentProps, TemplateType } from "@motionly/base";
import { test } from "./tests";

const inputProps = getInputProps() as TemplateType;
const template = Object.keys(inputProps).length
  ? inputProps
  : ({
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
          components: template.components,
          childIds: template.childIds,
          bg: template.bg,
          isSequence: template.isSequence,
        }}
      />
      <Folder name="compositions">
        {compositions.map((comp, i) => {
          const id = `${comp.comp}-${i}`;
          const baseComp: BaseProps = {
            id: id,
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
              defaultProps={{
                components: { [id]: compProps },
                childIds: [id],
                bg: {
                  type: "basic",
                  color: "#FFFFFFFF",
                },
                isSequence: template.isSequence,
              }}
            />
          );
        })}
      </Folder>
      <Composition
        id="Test"
        component={Comp}
        fps={test.fps}
        height={test.height}
        durationInFrames={test.duration * test.fps}
        width={test.width}
        defaultProps={{
          components: test.components,
          childIds: test.childIds,
          bg: test.bg,
          isSequence: test.isSequence,
        }}
      />
    </>
  );
};
