import { GifProps } from "@motionly/base";
import { Component } from ".";
import { MdGif } from "react-icons/md";

export const gif: Component<GifProps> = {
  name: "GIF",
  Icon: MdGif,
  hue: 180,
  inputs: [
    {
      prop: "src",
      label: "Source",
      type: "gif",
    },
    {
      prop: "objectFit",
      label: "Object fit",
      type: "object-fit",
    },
  ],
};
