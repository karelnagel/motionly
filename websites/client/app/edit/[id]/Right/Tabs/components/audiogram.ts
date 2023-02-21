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
      label: "Source",
      type: "VIDEO",
    },
    {
      prop: "position",
      label: "Position",
      type: "justify",
    },
    {
      label: "Bar width",
      prop: "barWidth",
      type: "number",
    },
    {
      prop: "gap",
      label: "Gap",
      type: "number",
    },
    {
      prop: "roundness",
      label: "Roundness",
      type: "number",
    },
    {
      label: "Bar color",
      prop: "color",
      type: "color",
    },
    {
      prop: "startFrom",
      label: "Start from",
      type: "number",
    },
    {
      prop: "multiplier",
      label: "Multiplier",
      type: "number",
    },
    {
      prop: "smoothing",
      label: "Smoothing",
      type: "checkbox",
    },
    {
      prop: "mirror",
      label: "Mirror",
      type: "checkbox",
    },
  ],
};
