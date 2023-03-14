import { getFrom, getDuration, AnimationProps } from "@motionly/base";

export const Animation = ({
  animation,
  parentDuration,
}: {
  animation?: AnimationProps;
  parentDuration: number;
}) => {
  if (!animation) return null;
  const from = getFrom(parentDuration, animation.start);
  const duration = getDuration(
    parentDuration,
    animation.start,
    animation.duration
  );
  return (
    <div
      className="h-[3px] w-full left-0 rounded-full"
      style={{
        marginLeft: `${(from / parentDuration) * 100}%`,
        width: `${(duration / parentDuration) * 100}%`,
        // background: getAnimationColor(animation),
      }}
    />
  );
};
