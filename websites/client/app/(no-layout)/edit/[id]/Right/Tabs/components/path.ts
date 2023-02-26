import { PathProps } from "@motionly/base";
import { IoIosBrush } from "react-icons/io";
import { Component } from ".";

export const path: Component<PathProps> = {
  name: "Path",
  Icon: IoIosBrush,
  hue: 330,
  inputs: [
    {
      prop: "path",
      label: "Path",
      type: "text",
    },
    {
      prop: "stroke",
      label: "Stroke",
      type: "color",
    },
    {
      prop: "strokeWidth",
      label: "Stroke width (px)",
      type: "number",
      if: (comp) => !!comp.stroke,
    },
    {
      prop: "fill",
      label: "Fill",
      type: "color",
    },
    {
      prop: "viewBoxX",
      label: "Viewbox X",
      type: "number",
    },
    {
      prop: "viewBoxY",
      label: "Viewbox Y",
      type: "number",
    },
    {
      prop: "viewBoxWidth",
      label: "Viewbox width",
      type: "number",
    },
    {
      prop: "viewBoxHeight",
      label: "Viewbox height",
      type: "number",
    },
    {
      prop: "isRound",
      label: "Round",
      type: "checkbox",
    },
  ],
};
