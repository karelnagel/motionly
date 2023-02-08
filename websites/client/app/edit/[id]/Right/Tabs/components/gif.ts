import { GifProps, ObjectFit } from "@motionly/base";
import { Component } from ".";
import { MdGif } from "react-icons/md";

export const gif: Component<GifProps> = {
  name: "GIF",
  Icon: MdGif,
  hue: 180,
  inputs: [
    {
      prop: "src",
      type: "gif",
    },
    {
      prop: "objectFit",
      type: "select",
      options: Object.entries(ObjectFit).map(([value, label]) => ({
        value,
        label,
      })),
    },
  ],
};
