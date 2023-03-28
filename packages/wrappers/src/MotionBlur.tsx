import { MotionBlurProps } from "@motionly/base";
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
      lagInFrames={motion.lag ? motion.lag : 0.1 * fps}
      layers={motion.layers || 50}
      trailOpacity={motion.opacity || 1}
    >
      <>{children}</>
    </Trail>
  );
};
