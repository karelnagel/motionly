import { JustifyContent, TextProps } from "@motionly/base";
import { Component } from ".";
import { IoText } from "react-icons/io5";

export const text: Component<TextProps> = {
  name: "Text",
  Icon: IoText,
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
