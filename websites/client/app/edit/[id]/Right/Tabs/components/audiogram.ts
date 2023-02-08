import { AudiogramPosition, AudiogramProps } from "@motionly/base";
import { IoIosSettings } from "react-icons/io";
import { Component } from ".";

export const audiogram: Component<AudiogramProps> = {
  name: "Audiogram",
  Icon: IoIosSettings,
  hue: 100,
  inputs: [
    {
      prop: "src",
      type: "video",
    },
    {
      prop: "position",
      type: "select",
      options: Object.entries(AudiogramPosition).map(([value, label]) => ({
        value,
        label,
      })),
    },
    {
      prop: "barWidth",
      type: "number",
    },
    {
      prop: "gap",
      type: "number",
    },
    {
      prop: "roundness",
      type: "number",
    },
    {
      prop: "color",
      type: "color",
    },
    {
      prop: "startFrom",
      type: "number",
    },
    {
      prop: "multiplier",
      type: "number",
    },
    {
      prop: "smoothing",
      type: "checkbox",
    },
    {
      prop: "mirror",
      type: "checkbox",
    },
  ],
};
