import { ConfettiProps } from "@motionly/base";
import { IoIosSettings } from "react-icons/io";
import { Tab } from "..";

export const confetti: Tab<ConfettiProps> = {
  name: "Confetti",
  Icon: IoIosSettings,
  inputs: [
    {
      prop: "angle",
      type: "number",
    },
    {
      prop: "count",
      type: "number",
    },
    {
      prop: "posX",
      type: "number",
    },
    {
      prop: "posY",
      type: "number",
    },
    {
      prop: "scalar",
      type: "number",
    },
    {
      prop: "spread",
      type: "number",
    },
    {
      prop: "startVelocity",
      type: "number",
    },
    {
      prop: "ticks",
      type: "number",
    },
  ],
};
