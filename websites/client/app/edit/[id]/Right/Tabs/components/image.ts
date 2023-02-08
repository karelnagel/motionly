import { ImageProps, ObjectFit } from "@motionly/base";
import { IoIosSettings } from "react-icons/io";
import { Component } from ".";

export const image: Component<ImageProps> = {
  name: "Image",
  Icon: IoIosSettings,
  hue: 0,
  inputs: [
    {
      prop: "src",
      type: "image",
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
