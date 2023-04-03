import { Freeze as RemotionFreeze } from "remotion";
import { z } from "zod";
import { WrapperType } from ".";

const Freeze = z.object({
  frame: z.number().optional(),
});
type Freeze = z.infer<typeof Freeze>;

export const freeze: WrapperType<Freeze> = {
  zod: Freeze,
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
