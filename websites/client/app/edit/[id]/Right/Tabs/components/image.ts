import { ImageProps, ObjectFit } from "@motionly/base";
import { Component } from ".";
import { FaImage } from "react-icons/fa";

export const image: Component<ImageProps> = {
  name: "Image",
  Icon: FaImage,
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
