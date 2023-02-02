import { TemplateType } from "@motionly/base";

export const main: TemplateType = {
  duration: 10,
  fps: 30,
  height: 1080,
  width: 1920,
  bg: {
    type: "basic",
    color: "#FFFFFFFF",
  },
  comps: [
    {
      comp: "text",
      textStyle: {
        color: {
          type: "basic",
          color: "#ff0000FF",
        },
        fontSize: 140,
        fontFamily: "Inter",
        fontWeight: 700,
        textAlign: "center",
      },
      text: "Main video",
      justifyContent: "center",
      id: "0hydoq",
      borderRadius: 0,
      duration: 0,
      from: 0,
      rotation: 0,
      animations: [],
    },
  ],
};
