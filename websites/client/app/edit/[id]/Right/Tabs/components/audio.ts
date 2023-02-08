import { AudioProps } from "@motionly/base";
import { IoIosSettings } from "react-icons/io";
import { Component } from ".";

export const audio: Component<AudioProps> = {
  name: "Audio",
  Icon: IoIosSettings,
  hue: 50,
  inputs: [
    {
      prop: "src",
      type: "video",
    },
    {
      prop: "volume",
      type: "number",
    },
    {
      prop: "startFrom",
      type: "number",
    },
  ],
};
