import React from "react";
import { Composition, getInputProps } from "remotion";
import { Composition as Comp } from "./Composition";
import { LoadFonts } from "./helpers/LoadFonts";
import { Template } from "./types";

const defaultProps = (error: string): Template => ({
  allComponents: ["1"],
  components: {
    "1": {
      duration: 3,
      from: 0,
      height: 1080,
      width: 1920,
      id: "1",
      opacity: 1,
      rotation: 0,
      type: "text",
      wrappers: {
        animation: {
          type: "animation",
          animations: [{ id: "as", prop: "translateY", type: "interpolate", start: 0, duration: 3, from: 0, to: -3000 }],
        },
      },
      x: 0,
      y: 0,
      props: {
        text: `Rendering is working, but you sent invalid template!\nHere's the error:\n ${error}`,
        textStyle: {
          fontFamily: "Roboto",
          color: "#000000",
          background: "#00ff00",
          fontSize: 40,
          fontWeight: "800",
        },
      },
    },
  },
  duration: 3,
  fps: 30,
  height: 1080,
  width: 1920,
  id: "Main",
  name: "Main",
  background: "#ffffff",
});

const inputProps = Template.safeParse(getInputProps());
const template = inputProps.success ? inputProps.data : defaultProps(inputProps.error.message);
export const Root: React.FC = () => {
  return (
    <>
      <LoadFonts template={template} />
      <Composition
        id="Main"
        component={Comp}
        durationInFrames={Math.round((template.duration || 1) * template.fps)}
        fps={template.fps}
        width={template.width}
        height={template.height}
        defaultProps={{ template }}
      />
    </>
  );
};
