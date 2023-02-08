import { ImageProps, ObjectFit } from "@motionly/base";
import { IoIosSettings } from "react-icons/io";
import { Tab } from "..";

export const image: Tab<ImageProps> = {
  name: "Image",
  Icon: IoIosSettings,
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
