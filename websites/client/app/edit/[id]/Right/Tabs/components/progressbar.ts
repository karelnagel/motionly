import { ProgressbarProps } from "@motionly/base";
import { IoIosTimer } from "react-icons/io";
import { Component } from ".";

export const progressbar: Component<ProgressbarProps> = {
  name: "Progressbar",
  Icon: IoIosTimer,
  hue: 350,
  inputs: [
    {
      prop: "color",
      label: "Color",
      type: "color",
    },
    {
      prop: "bg",
      label: "Background",
      type: "color",
    },
    {
      prop: "type",
      label: "Progress type",
      type: "progressbar-types",
    },
    {
      prop: "barWidth",
      label: "Bar width",
      type: "number",
      if: (comp) => comp.type === "square" || comp.type === "circle",
    },
    {
      prop: "topRight",
      label: "Top right",
      type: "checkbox",
      if: (comp) => comp.type === "square",
    },
  ],
};
