import { GraphProps } from "@motionly/base";
import { Component } from ".";
import { SlGraph } from "react-icons/sl";

export const graph: Component<GraphProps> = {
  name: "Graph",
  Icon: SlGraph,
  hue: 220,
  inputs: [
    {
      prop: "type",
      label: "Graph type",
      type: "graph-types",
    },
    {
      prop: "color",
      label: "Color",
      type: "color",
    },
    {
      prop: "max",
      label: "Max",
      type: "number",
    },
    {
      prop: "min",
      label: "Min",
      type: "number",
    },
    {
      prop: "gap",
      label: "Gap (px)",
      type: "number",
      if: (comp) => comp.type === "bar",
    },
    {
      prop: "roundness",
      label: "Roundness (px)",
      type: "number",
      if: (comp) => comp.type === "bar",
    },
    {
      prop: "strokeWidth",
      label: "Stroke width (px)",
      type: "number",
      if: (comp) => comp.type === "line",
    },
  ],
};
