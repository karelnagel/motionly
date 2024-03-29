import { TextProps } from "@motionly/base";
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
      label: "Text",
    },
    {
      prop: "justifyContent",
      label: "Justify Content",
      type: "justify",
    },
    {
      prop: "textStyle",
      label: "Text Styledivider",
      type: "style",
    },
  ],
};
