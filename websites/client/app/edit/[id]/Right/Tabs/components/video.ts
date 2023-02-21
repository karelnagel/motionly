import { VideoProps } from "@motionly/base";
import { Component } from ".";
import { MdVideoLibrary } from "react-icons/md";

export const video: Component<VideoProps> = {
  name: "Video",
  Icon: MdVideoLibrary,
  hue: 134,
  inputs: [
    {
      prop: "src",
      label: "Source",
      type: "video",
    },
    {
      prop: "objectFit",
      label: "Object fit",
      type: "object-fit",
    },
    {
      prop: "startFrom",
      label: "Start from (s)",
      type: "number",
    },
    {
      prop: "muted",
      label: "Muted",
      type: "checkbox",
    },
    {
      prop: "volume",
      label: "Volume",
      type: "number",
    },
    {
      prop: "offthread",
      label: "Offthread",
      type: "checkbox",
    },
  ],
};
