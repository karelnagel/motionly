import { ImageProps } from "@motionly/base";
import { Component } from ".";
import { FaImage } from "react-icons/fa";

export const image: Component<ImageProps> = {
  name: "Image",
  Icon: FaImage,
  hue: 0,
  inputs: [
    {
      prop: "src",
      label: "Source",
      type: "image",
    },
    {
      prop: "objectFit",
      label: "Object fit",
      type: "object-fit",
    },
  ],
};
