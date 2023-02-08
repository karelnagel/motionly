import { AudioProps } from "@motionly/base";
import { IoIosSettings } from "react-icons/io";
import { Tab } from "..";

export const audio: Tab<AudioProps> = {
  name: "Audio",
  Icon: IoIosSettings,
  inputs: [
    {
      prop: "src",
      type: "video",
    },
    {
      prop: "volume",
      type: "number",
    },
    {
      prop: "startFrom",
      type: "number",
    },
  ],
};
