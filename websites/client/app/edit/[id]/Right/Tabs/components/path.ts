import { PathProps } from "@motionly/base";
import { IoIosSettings } from "react-icons/io";
import { Component } from ".";

export const path: Component<PathProps> = {
  name: "Path",
  Icon: IoIosSettings,
  hue: 330,
  inputs: [
    {
      prop: "path",
      type: "text",
    },
    {
      prop: "stroke",
      type: "color",
    },
    {
      prop: "strokeWidth",
      type: "number",
      if: (comp) => !!comp.stroke,
    },
    {
      prop: "fill",
      type: "color",
    },
    {
      prop: "viewBoxX",
      type: "number",
    },
    {
      prop: "viewBoxY",
      type: "number",
    },
    {
      prop: "viewBoxWidth",
      type: "number",
    },
    {
      prop: "viewBoxHeight",
      type: "number",
    },
    {
      prop: "isRound",
      type: "checkbox",
    },
  ],
};
