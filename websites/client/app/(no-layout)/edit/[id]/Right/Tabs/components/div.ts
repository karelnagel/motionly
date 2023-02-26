import { DivProps } from "@motionly/base";
import { Component } from ".";
import { FaLayerGroup } from "react-icons/fa";

export const div: Component<DivProps> = {
  name: "Div",
  Icon: FaLayerGroup,
  hue: 150,
  inputs: [
    {
      prop: "bg",
      label: "Background",
      type: "color",
    },
  ],
};
