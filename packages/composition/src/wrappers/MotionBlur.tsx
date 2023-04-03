import { Trail } from "@remotion/motion-blur";
import { useVideoConfig } from "remotion";
import { z } from "zod";
import { WrapperType } from ".";

const MotionBlur = z.object({
  layers: z.number().optional(),
  lag: z.number().optional(),
  opacity: z.number().optional(),
});
type MotionBlur = z.infer<typeof MotionBlur>;

export const motion_blur: WrapperType<MotionBlur> = {
  zod: MotionBlur,
  wrapper: ({ layers, lag, opacity, children }) => {
    const { fps } = useVideoConfig();
    return (
      <Trail lagInFrames={lag ? lag : 0.1 * fps} layers={layers || 50} trailOpacity={opacity || 1}>
        <>{children}</>
      </Trail>
    );
  },
};
