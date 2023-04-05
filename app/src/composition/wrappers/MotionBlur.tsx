import { Trail } from "@remotion/motion-blur";
import { MdOutlineAutoAwesomeMotion } from "react-icons/md";
import { useVideoConfig } from "remotion";
import { z } from "zod";
import { DefineWrapper } from ".";
import { Inputs } from "../../inputs";

export const MotionBlur = z.object({
  type: z.literal("motion_blur"),
  active: z.boolean().optional(),
  layers: z.number().optional(),
  lag: z.number().optional(),
  opacity: z.number().optional(),
});

type MotionBlur = z.infer<typeof MotionBlur>;
const inputs: Inputs<MotionBlur> = {
  active: { checkbox: { label: "Active" } },
  layers: { number: { label: "Layers", placeholder: "50" } },
  lag: { number: { label: "Lag", placeholder: "0.1" } },
  opacity: { number: { label: "Opacity", placeholder: "1" } },
};
export const motion_blur: DefineWrapper<MotionBlur> = {
  zod: MotionBlur,
  title: "Motion Blur",
  icon: MdOutlineAutoAwesomeMotion,
  default: { type: "motion_blur" },
  edit: ({ value, onChange }) => {
    return <Inputs value={value} inputs={inputs} onChange={onChange} />;
  },
  wrapper: ({ layers, lag, opacity, children, active }) => {
    const { fps } = useVideoConfig();
    if (!active) return <>{children}</>;
    return (
      <Trail lagInFrames={lag ? lag : 0.1 * fps} layers={layers || 50} trailOpacity={opacity || 1}>
        <>{children}</>
      </Trail>
    );
  },
};
