import { IoLockOpen } from "react-icons/io5";
import { Loop, useVideoConfig } from "remotion";
import { z } from "zod";
import { WrapperType } from ".";

export const LoopType = z.object({
  type: z.literal("loop"),
  duration: z.number().optional(),
});
type LoopType = z.infer<typeof LoopType>;

export const loop: WrapperType<LoopType> = {
  zod: LoopType,
  title: "Loop",
  icon: IoLockOpen,
  edit: (props) => {
    return <div></div>;
  },
  wrapper: ({ duration, children }) => {
    const { fps } = useVideoConfig();
    return (
      <Loop durationInFrames={Math.round((duration || 0) * fps)} layout="none">
        <>{children}</>
      </Loop>
    );
  },
};
