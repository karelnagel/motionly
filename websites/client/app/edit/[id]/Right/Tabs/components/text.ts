import { JustifyContent, TextProps } from "@motionly/base";
import { IoIosSettings } from "react-icons/io";
import { Tab } from "..";

export const text: Tab<TextProps> = {
  name: "Text",
  Icon: IoIosSettings,
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
