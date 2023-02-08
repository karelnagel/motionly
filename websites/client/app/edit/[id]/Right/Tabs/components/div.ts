import { DivProps } from "@motionly/base";
import { IoIosSettings } from "react-icons/io";
import { Tab } from "..";

export const div: Tab<DivProps> = {
  name: "Div",
  Icon: IoIosSettings,
  inputs: [
    {
      prop: "bg",
      type: "color",
    },
  ],
};
