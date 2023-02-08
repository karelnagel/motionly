import { GifProps, ObjectFit } from "@motionly/base";
import { IoIosSettings } from "react-icons/io";
import { Component } from ".";

export const gif: Component<GifProps> = {
  name: "GIF",
  Icon: IoIosSettings,
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
