import { MotionBlurProps } from "@asius/base";
import { Trail } from "@remotion/motion-blur";
import { ReactNode } from "react";
import { useVideoConfig } from "remotion";

export const MotionBlur = ({
  motion,
  children,
}: {
  children: ReactNode;
  motion?: MotionBlurProps;
}) => {
  const { fps } = useVideoConfig();
  if (!motion) return <>{children}</>;
  return (
    <Trail
      lagInFrames={motion.lag * fps}
      layers={motion.layers}
      trailOpacity={motion.opacity}
    >
      <>{children}</>
    </Trail>
  );
};
