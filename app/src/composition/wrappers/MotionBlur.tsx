import { Trail } from "@remotion/motion-blur";
import { IoLockOpen } from "react-icons/io5";
import { useVideoConfig } from "remotion";
import { z } from "zod";
import { WrapperType } from ".";

export const MotionBlur = z.object({
  type: z.literal("motion_blur"),
  layers: z.number().optional(),
  lag: z.number().optional(),
  opacity: z.number().optional(),
});
type MotionBlur = z.infer<typeof MotionBlur>;

export const motion_blur: WrapperType<MotionBlur> = {
  zod: MotionBlur,
  title: "Motion Blur",
  icon: IoLockOpen,
  edit: (props) => {
    return <div></div>;
  },
  wrapper: ({ layers, lag, opacity, children }) => {
    const { fps } = useVideoConfig();
    return (
      <Trail lagInFrames={lag ? lag : 0.1 * fps} layers={layers || 50} trailOpacity={opacity || 1}>
        <>{children}</>
      </Trail>
    );
  },
};
