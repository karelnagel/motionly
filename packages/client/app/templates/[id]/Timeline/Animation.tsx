import { AnimationProps, getFrom, getDuration } from "@asius/components";
import { getAnimationColor } from "../../../../helpers/color";

export const Animation = ({
  animation,
  index,
  parentDuration,
}: {
  animation: AnimationProps;
  index: number;
  parentDuration: number;
}) => {
  const from = getFrom(parentDuration, animation.start);
  const duration = getDuration(
    parentDuration,
    animation.start,
    animation.duration
  );
  return (
    <div
      className="absolute h-[3px] w-full left-0 rounded-full"
      style={{
        top: index * 6 + 3,
        left: `${(from / parentDuration) * 100}%`,
        width: `${(duration / parentDuration) * 100}%`,
        background: getAnimationColor(animation),
      }}
    />
  );
};
