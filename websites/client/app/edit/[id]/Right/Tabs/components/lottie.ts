import { LottieProps } from "@motionly/base";
import { IoIosSettings } from "react-icons/io";
import { Component } from ".";


export const lottie: Component<LottieProps> = {
  name: "Lottie",
  Icon: IoIosSettings,
  hue: 240,
  inputs: [
    {
      prop: "src",
      type: "text",
    },
    {
      prop: "backwards",
      type: "checkbox",
    },
    {
      prop: "loop",
      type: "checkbox",
    },
    {
      prop: "playbackRate",
      type: "number",
    },
  ],
};
