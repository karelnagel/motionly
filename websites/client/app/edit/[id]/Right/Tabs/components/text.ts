import { JustifyContent, TextProps } from "@motionly/base";
import { IoIosSettings } from "react-icons/io";
import { Component } from ".";

export const text: Component<TextProps> = {
  name: "Text",
  Icon: IoIosSettings,
  hue: 89,
  inputs: [
    {
      prop: "text",
      type: "textarea",
    },
    {
      prop: "justifyContent",
      type: "select",
      options: Object.entries(JustifyContent).map(([value, label]) => ({
        value,
        label,
      })),
    },
    {
      prop: "textStyle",
      type: "style",
    },
  ],
};
