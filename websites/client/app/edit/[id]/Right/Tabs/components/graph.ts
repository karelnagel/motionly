import { GraphProps, GraphTypes } from "@motionly/base";
import { IoIosSettings } from "react-icons/io";
import { Tab } from "..";

export const graph: Tab<GraphProps> = {
  name: "Graph",
  Icon: IoIosSettings,
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
