import { ShapeProps } from "@motionly/base";
import { Component } from ".";
import { IoShapesOutline } from "react-icons/io5";

export const shape: Component<ShapeProps> = {
  name: "Shape",
  Icon: IoShapesOutline,
  hue: 40,
  inputs: [
    {
      prop: "type",
      label: "Shape type",
      type: "shape-types",
    },
    {
      prop: "fill",
      label: "Fill",
      type: "color",
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
      prop: "direction",
      label: "Direction",
      type: "triangle-direction",
      if: (comp) => comp.type === "triangle",
    },
    {
      prop: "radius" as any,
      label: "Radius (px)",
      type: "number",
      if: (comp) => comp.type === "circle",
    },
    {
      prop: "cornerRadius",
      label: "Corner radius (px)",
      type: "number",
      if: (comp) => comp.type === "triangle" || comp.type === "rect",
    },
    {
      prop: "edgeRoundness",
      label: "Edge roundness (px)",
      type: "number",
      if: (comp) => comp.type === "triangle" || comp.type === "rect",
    },
  ],
};
