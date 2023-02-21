import { AudiogramProps } from "@motionly/base";
import { Component } from ".";
import { BsSoundwave } from "react-icons/bs";

export const audiogram: Component<AudiogramProps> = {
  name: "Audiogram",
  Icon: BsSoundwave,
  hue: 100,
  inputs: [
    {
      prop: "src",
      type: "video",
    },
    {
      prop: "position",
      type: "justify",
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
