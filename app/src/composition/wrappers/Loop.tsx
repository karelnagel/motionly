import { MdOutlineLoop } from "react-icons/md";
import { Loop, useVideoConfig } from "remotion";
import { z } from "zod";
import { DefineWrapper } from ".";
import { Inputs } from "../../inputs";

export const LoopType = z.object({
  type: z.literal("loop"),
  duration: z.number().optional(),
});
type LoopType = z.infer<typeof LoopType>;
const inputs: Inputs<LoopType> = {
  duration: { number: { label: "Duration", placeholder: "Not looping" } },
};
export const loop: DefineWrapper<LoopType> = {
  zod: LoopType,
  title: "Loop",
  icon: MdOutlineLoop,
  default: { type: "loop" },
  edit: ({ value, onChange }) => {
    return <Inputs value={value} inputs={inputs} onChange={onChange} />;
  },
  wrapper: ({ duration, children }) => {
    const { fps } = useVideoConfig();
    if (!duration) return <>{children}</>;
    return (
      <Loop durationInFrames={Math.round((duration || 0) * fps)} layout="none">
        <>{children}</>
      </Loop>
    );
  },
};
