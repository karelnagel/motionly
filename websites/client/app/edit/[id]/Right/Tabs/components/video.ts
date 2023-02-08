import { ObjectFit, VideoProps } from "@motionly/base";
import { IoIosSettings } from "react-icons/io";
import { Tab } from "..";

export const video: Tab<VideoProps> = {
  name: "Video",
  Icon: IoIosSettings,
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
