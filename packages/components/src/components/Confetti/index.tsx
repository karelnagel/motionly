import { Color } from "@motionly/inputs";
import { z } from "zod";
import { Component } from "../..";
import Confetti from "./src";

export const ConfettiProps = z.object({
  colors: z.array(Color).optional(),
  count: z.number().optional(),
  angle: z.number().optional(),
  spread: z.number().optional(),
  startVelocity: z.number().optional(),
  scalar: z.number().optional(),
  ticks: z.number().optional(),
  posX: z.number(),
  posY: z.number(),
});
export type ConfettiProps = z.infer<typeof ConfettiProps>;

export const confetti: Component<ConfettiProps> = {
  zod: ConfettiProps,
  inputs: {},
  component: ({ posX, posY, colors, ...props }) => {
    return (
      <Confetti
        {...{
          ...props,
          x: posX,
          y: posY,
          colors,
        }}
      />
    );
  },
};
