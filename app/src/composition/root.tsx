import React from "react";
import { Composition, getInputProps } from "remotion";
import { Composition as Comp, Template } from ".";

const inputProps = getInputProps() as Template;

export const Root: React.FC = () => {
  return (
    <>
      <Composition
        id="Main"
        component={Comp}
        durationInFrames={Math.round((inputProps.duration || 1) * inputProps.fps)}
        fps={inputProps.fps}
        width={inputProps.width}
        height={inputProps.height}
      />
    </>
  );
};
