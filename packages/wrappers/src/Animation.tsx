import { z } from "zod";
import { WrapperType } from ".";

const Animation = z.object({});
type Animation = z.infer<typeof Animation>;

export const animation: WrapperType<Animation> = {
  zod: Animation,
  wrapper: ({ children }) => {
    return <div>{children}</div>;
  },
};
