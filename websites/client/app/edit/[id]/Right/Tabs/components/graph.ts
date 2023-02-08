import { GraphProps, GraphTypes } from "@motionly/base";
import { IoIosSettings } from "react-icons/io";
import { Component } from ".";

export const graph: Component<GraphProps> = {
  name: "Graph",
  Icon: IoIosSettings,
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
