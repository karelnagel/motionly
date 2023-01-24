import { ConfettiProps } from "@asius/base";
import RemotionConfetti from "@asius/confetti";
import { useColors } from "../useColors";

export const defaultConfetti: ConfettiProps = {
  comp: "confetti",
  posX: 550,
  posY: 550,
  angle: -90,
};

export const Confetti = ({ posX, posY, colors, ...props }: ConfettiProps) => {
  const color = useColors();
  return (
    <RemotionConfetti
      {...{
        ...props,
        x: posX,
        y: posY,
        colors: colors?.map((c) => color(c)).filter((c) => c) as string[],
      }}
    />
  );
};
