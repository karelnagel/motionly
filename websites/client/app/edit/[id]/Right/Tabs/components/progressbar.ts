import { ProgressbarProps, ProgressbarTypes } from "@motionly/base";
import { IoIosSettings } from "react-icons/io";
import { Component } from ".";

export const progressbar: Component<ProgressbarProps> = {
  name: "Progressbar",
  Icon: IoIosSettings,
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
      type: "select",
      options: Object.entries(ProgressbarTypes).map(([value, label]) => ({
        value,
        label,
      })),
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
