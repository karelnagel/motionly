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
      type: "color",
    },
    {
      prop: "bg",
      type: "color",
    },
    {
      prop: "type",
      type: "progressbar-types",
    },
    {
      prop: "barWidth",
      type: "number",
      if: (comp) => comp.type === "square" || comp.type === "circle",
    },
    {
      prop: "topRight",
      type: "checkbox",
      if: (comp) => comp.type === "square",
    },
  ],
};
