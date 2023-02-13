import { AudioProps } from "@motionly/base";
import { Component } from ".";
import { MdAudiotrack } from "react-icons/md";

export const audio: Component<AudioProps> = {
  name: "Audio",
  Icon: MdAudiotrack,
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
