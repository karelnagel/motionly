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
      label: "Source",
      type: "text",
    },
    {
      prop: "backwards",
      label: "Backwards",
      type: "checkbox",
    },
    {
      prop: "loop",
      label: "Loop",
      type: "checkbox",
    },
    {
      prop: "playbackRate",
      label: "Playback rate",
      type: "number",
    },
  ],
};
