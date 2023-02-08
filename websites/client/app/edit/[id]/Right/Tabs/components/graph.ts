import { GraphProps, GraphTypes } from "@motionly/base";
import { Component } from ".";
import { SlGraph } from "react-icons/sl";

export const graph: Component<GraphProps> = {
  name: "Graph",
  Icon: SlGraph,
  hue: 220,
  inputs: [
    {
      prop: "type",
      type: "select",
      options: Object.entries(GraphTypes).map(([value, label]) => ({
        value,
        label,
      })),
    },
    {
      prop: "color",
      type: "color",
    },
    {
      prop: "max",
      type: "number",
    },
    {
      prop: "min",
      type: "number",
    },
    {
      prop: "gap",
      type: "number",
      if: (comp) => comp.type === "bar",
    },
    {
      prop: "roundness",
      type: "number",
      if: (comp) => comp.type === "bar",
    },
    {
      prop: "strokeWidth",
      type: "number",
      if: (comp) => comp.type === "line",
    },
  ],
};
