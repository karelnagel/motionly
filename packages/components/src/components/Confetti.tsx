import { ConfettiProps } from "@asius/base";
import RemotionConfetti from "@asius/confetti";

export const defaultConfetti: ConfettiProps = {
  comp: "confetti",
  posX: 550,
  posY: 550,
  angle: -90,
};

export const Confetti = ({ posX, posY, ...props }: ConfettiProps) => {
  return <RemotionConfetti {...{ ...props, x: posX, y: posY }} />;
};
