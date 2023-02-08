import { MockupProps, MockupTypes } from "@motionly/base";
import { IoIosPhonePortrait } from "react-icons/io";
import { Component } from ".";

export const mockup: Component<MockupProps> = {
  name: "Mockup",
  Icon: IoIosPhonePortrait,
  hue: 300,
  inputs: [
    {
      prop: "type",
      type: "select",
      options: Object.entries(MockupTypes).map(([value, label]) => ({
        value,
        label,
      })),
    },
    {
      prop: "bg",
      type: "color",
    },
  ],
};
