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
      label: "Angle",
      type: "number",
    },
    {
      prop: "count",
      label: "Particle count",
      type: "number",
    },
    {
      prop: "posX",
      label: "X position",
      type: "number",
    },
    {
      prop: "posY",
      label: "Y position",
      type: "number",
    },
    {
      prop: "scalar",
      label: "Scalar",
      type: "number",
    },
    {
      prop: "spread",
      label: "Spread (deg)",
      type: "number",
    },
    {
      prop: "startVelocity",
      label: "Start velocity",
      type: "number",
    },
    {
      prop: "ticks",
      label: "Ticks",
      type: "number",
    },
  ],
};
