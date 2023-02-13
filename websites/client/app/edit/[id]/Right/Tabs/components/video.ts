import { ObjectFit, VideoProps } from "@motionly/base";
import { Component } from ".";
import { MdVideoLibrary } from "react-icons/md";

export const video: Component<VideoProps> = {
  name: "Video",
  Icon: MdVideoLibrary,
  hue: 134,
  inputs: [
    {
      prop: "src",
      type: "video",
    },
    {
      prop: "objectFit",
      type: "select",
      options: Object.entries(ObjectFit).map(([value, label]) => ({
        value,
        label,
      })),
    },
    {
      prop: "startFrom",
      type: "number",
    },
    {
      prop: "muted",
      type: "checkbox",
    },
    {
      prop: "volume",
      type: "number",
    },
    {
      prop: "offthread",
      type: "checkbox",
    },
  ],
};
