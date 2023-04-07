import React from "react";
import { Composition, getInputProps } from "remotion";
import { Composition as Comp } from "./Composition";
import { LoadFonts } from "./helpers/LoadFonts";
import { Template } from "./types";

const inputProps = getInputProps() as Template;

export const Root: React.FC = () => {
  return (
    <>
      <LoadFonts template={inputProps} />
      <Composition
        id="Main"
        component={Comp}
        durationInFrames={Math.round((inputProps.duration || 1) * inputProps.fps)}
        fps={inputProps.fps}
        width={inputProps.width}
        height={inputProps.height}
        defaultProps={{ template: inputProps }}
      />
    </>
  );
};
