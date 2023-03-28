import { ConfettiProps } from "@motionly/base";
import RemotionConfetti from "@motionly/confetti";
import { useColor } from "../hooks/useColor";

export const defaultConfettiProps: ConfettiProps = {
  comp: "confetti",
  posX: 0,
  posY: 0,
  angle: -45,
};

export const Confetti = ({ posX, posY, colors, ...props }: ConfettiProps) => {
  return (
    <RemotionConfetti
      {...{
        ...props,
        x: posX,
        y: posY,
        colors: colors?.map((c) => useColor(c)).filter((c) => c) as string[],
      }}
    />
  );
};
