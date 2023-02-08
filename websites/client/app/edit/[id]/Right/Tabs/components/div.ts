import { DivProps } from "@motionly/base";
import { IoIosSettings } from "react-icons/io";
import { Component } from ".";

export const div: Component<DivProps> = {
  name: "Div",
  Icon: IoIosSettings,
  hue: 150,
  inputs: [
    {
      prop: "bg",
      type: "color",
    },
  ],
};
