import { ConfettiProps } from "@motionly/base";
import { Component } from ".";
import { TbConfetti } from "react-icons/tb";

export const confetti: Component<ConfettiProps> = {
  name: "Confetti",
  Icon: TbConfetti,
  hue: 120,
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
