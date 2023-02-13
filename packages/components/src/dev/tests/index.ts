import { Color, ComponentProps, TemplateType, videoUrl } from "@motionly/base";
import { defaultPathProps, defaultTranscriptionProps } from "../../components";
const duration = 2;
const linearColor: Color = {
  type: "linear",
  gradients: [
    {
      stop: 0,
      color: {
        type: "interpolate",
        colors: [
          { color: "#ff0", start: 0 },
          { color: "#f0f", start: 1 },
          { color: "#0ff", start: 2 },
          { color: "#ff0", start: 3 },
        ],
      },
    },
    {
      stop: 0,
      color: {
        type: "interpolate",
        colors: [
          { color: "#f0f", start: 0 },
          { color: "#0ff", start: 1 },
          { color: "#ff0", start: 2 },
          { color: "#f0f", start: 3 },
        ],
      },
    },
  ],
  angle: 0,
};

const interpolateColor: Color = {
  type: "interpolate",
  colors: [
    { color: "#f0f", start: 0 },
    { color: "#0ff", start: 1 },
    { color: "#ff0", start: 2 },
    { color: "#f0f", start: 3 },
  ],
};
const box: ComponentProps = {
  id: "",
  comp: "div",
  bg: linearColor,
  height: 100,
  width: 100,
  duration,
  childIds: [],
};

export const test: TemplateType = {
  width: 400,
  height: 400,
  duration: 96,
  fps: 30,
  bg: {
    type: "basic",
    color: "#FFFFFFFF",
  },
  isSequence: true,
  components: {},
  childIds: [],
};
