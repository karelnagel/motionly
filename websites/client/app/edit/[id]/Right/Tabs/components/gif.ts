import { GifProps, ObjectFit } from "@motionly/base";
import { IoIosSettings } from "react-icons/io";
import { Tab } from "..";

export const gif: Tab<GifProps> = {
  name: "GIF",
  Icon: IoIosSettings,
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
