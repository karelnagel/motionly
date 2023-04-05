import { IoLockOpen } from "react-icons/io5";
import { Freeze as RemotionFreeze } from "remotion";
import { z } from "zod";
import { WrapperType } from ".";

export const Freeze = z.object({
  type: z.literal("freeze"),
  frame: z.number().optional(),
});
type Freeze = z.infer<typeof Freeze>;

export const freeze: WrapperType<Freeze> = {
  zod: Freeze,
  title: "Freeze",
  icon: IoLockOpen,
  edit: (props) => {
    return <div></div>;
  },
  wrapper: ({ frame, children }) => {
    if (frame === undefined) return <>{children}</>;
    else
      return (
        <RemotionFreeze frame={frame}>
          <>{children}</>
        </RemotionFreeze>
      );
  },
};
