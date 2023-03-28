import { MockupProps } from "@motionly/base";
import { IoIosPhonePortrait } from "react-icons/io";
import { Component } from ".";

export const mockup: Component<MockupProps> = {
  name: "Mockup",
  Icon: IoIosPhonePortrait,
  hue: 300,
  inputs: [
    {
      prop: "type",
      label:"Mockup type",
      type: "mockup-types",
    },
    {
      prop: "bg",
      label:"Background",
      type: "color",
    },
  ],
};
