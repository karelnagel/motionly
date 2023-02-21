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
      label: "Source",
      type: "VIDEO",
    },
    {
      prop: "volume",
      label: "Volume",
      type: "number",
    },
    {
      prop: "startFrom",
      label: "Start from",
      type: "number",
    },
  ],
};
