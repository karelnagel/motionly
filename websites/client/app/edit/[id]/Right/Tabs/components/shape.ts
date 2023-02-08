import { ShapeProps, ShapeTypes, TriangleDirection } from "@motionly/base";
import { IoIosSettings } from "react-icons/io";
import { Tab } from "..";

export const shape: Tab<ShapeProps> = {
  name: "Shape",
  Icon: IoIosSettings,
  inputs: [
    {
      prop: "type",
      type: "select",
      options: Object.entries(ShapeTypes).map(([value, label]) => ({
        value,
        label,
      })),
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
      type: "select",
      options: Object.entries(TriangleDirection).map(([value, label]) => ({
        value,
        label,
      })),
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
