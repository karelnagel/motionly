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
      label: "Text",
    },
    {
      prop: "justifyContent",
      type: "select",
      label: "Justify Content",
      options: Object.entries(JustifyContent).map(([value, label]) => ({
        value,
        label,
      })),
    },
    {
      prop: "textStyle",
      label: "Text style",
      type: "style",
    },
  ],
};
