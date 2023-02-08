import { LottieProps } from "@motionly/base";
import { Component } from ".";
import { MdOutlineMotionPhotosOn } from "react-icons/md";

export const lottie: Component<LottieProps> = {
  name: "Lottie",
  Icon: MdOutlineMotionPhotosOn,
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
