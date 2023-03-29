import { z } from "zod";
import { loop } from "./Loop";
import { animation } from "./Animation";
import { freeze } from "./Freeze";
import { motion_blur } from "./MotionBlur";

export type WrapperType<T> = {
  wrapper: React.FC<T>;
  zod: z.ZodType<T>;
};
export const WrapperNames = z.enum(["loop", "animation", "freeze", "motion_blur"]);
export type WrapperNames = z.infer<typeof WrapperNames>;

export const wrappersCollection = { loop, animation, freeze, motion_blur };

export const Wrappers = z.object({
  wrappers: z.record(
    z.object({
      name: WrapperNames,
      props: z.any(),
    })
  ),
  allWrappers: z.string().array(),
});
export type Wrappers = z.infer<typeof Wrappers>;

export const Wrapper: React.FC<Wrappers> = ({ children, wrappers, allWrappers }) => {
  const Wrap = ({ allWrappers }: { allWrappers: string[] }) => {
    if (allWrappers.length === 0) return <>{children}</>;

    const wrapper = wrappers[allWrappers[0]];
    const Wrapper = wrappersCollection[wrapper.name];
    return (
      <Wrapper.wrapper {...wrapper.props}>
        <Wrap allWrappers={allWrappers.slice(1)} />
      </Wrapper.wrapper>
    );
  };
  return <Wrap allWrappers={allWrappers} />;
};
