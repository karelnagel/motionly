import { Color } from "../../../../inputs";
import { z } from "zod";
import { Component } from "../..";
import Confetti from "./src";
import { TbConfetti } from "react-icons/tb";

export const ConfettiProps = z.object({
  colors: z.array(Color).optional(),
  count: z.number().optional(),
  angle: z.number().optional(),
  spread: z.number().optional(),
  startVelocity: z.number().optional(),
  scalar: z.number().optional(),
  ticks: z.number().optional(),
  x: z.number().optional(),
  y: z.number().optional(),
});
export type ConfettiProps = z.infer<typeof ConfettiProps>;

export const confetti: Component<ConfettiProps> = {
  zod: ConfettiProps,
  Icon: TbConfetti,
  hue: 120,
  inputs: {
    count: { range: { label: "Count", min: 0, max: 100, step: 1 } },
    angle: { range: { label: "Angle", min: 0, max: 360, step: 1 } },
    spread: { range: { label: "Spread", min: 0, max: 360, step: 1 } },
    startVelocity: { range: { label: "Start Velocity", min: 0, max: 100, step: 1 } },
    scalar: { range: { label: "Scalar", min: 0, max: 100, step: 1 } },
    ticks: { range: { label: "Ticks", min: 0, max: 100, step: 1 } },
    x: { range: { label: "X", min: 0, max: 100, step: 1 } },
    y: { range: { label: "Y", min: 0, max: 100, step: 1 } },
  },
  examples: [
    {
      title: "Default",
      image: "/logo.png",
      props: {
        props: {},
      },
    },
  ],
  component: ({ x = 0, y = 0, colors, ...props }) => {
    return <Confetti {...{ ...props, x, y, colors }} />;
  },
};
