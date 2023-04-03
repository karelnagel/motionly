import { Loop, useVideoConfig } from "remotion";
import { z } from "zod";
import { WrapperType } from ".";

const LoopType = z.object({
  duration: z.number().optional(),
});
type LoopType = z.infer<typeof LoopType>;

export const loop: WrapperType<LoopType> = {
  zod: LoopType,
  wrapper: ({ duration, children }) => {
    const { fps } = useVideoConfig();
    return (
      <Loop durationInFrames={Math.round((duration || 0) * fps)} layout="none">
        <>{children}</>
      </Loop>
    );
  },
};
