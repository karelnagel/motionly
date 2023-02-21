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
      type: "shape-types",
    },
    {
      prop: "fill",
      type: "color",
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
      prop: "direction" as any,
      type: "triangle-direction",
      if: (comp) => comp.type === "triangle",
    },
    {
      prop: "radius" as any,
      type: "number",
      if: (comp) => comp.type === "circle",
    },
    {
      prop: "cornerRadius",
      type: "number",
      if: (comp) => comp.type === "triangle" || comp.type === "rect",
    },
    {
      prop: "edgeRoundness",
      type: "number",
      if: (comp) => comp.type === "triangle" || comp.type === "rect",
    },
  ],
};
