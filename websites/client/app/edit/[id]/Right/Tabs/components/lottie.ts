import { LottieProps } from "@motionly/base";
import { IoIosSettings } from "react-icons/io";
import { Tab } from "..";

export const lottie: Tab<LottieProps> = {
  name: "Lottie",
  Icon: IoIosSettings,
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
