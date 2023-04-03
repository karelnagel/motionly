import { z } from "zod";
import { loop } from "./Loop";
import { animation } from "./Animation";
import { freeze } from "./Freeze";
import { motion_blur } from "./MotionBlur";
import { ReactNode } from "react";
import { useCompositionStore } from "..";

export type WrapperType<T> = {
  wrapper: React.FC<T & { children: ReactNode }>;
  zod: z.ZodType<T>;
};
export const WrapperNames = z.enum(["loop", "animation", "freeze", "motion_blur"]);
export type WrapperNames = z.infer<typeof WrapperNames>;

export const wrappersCollection = { loop, animation, freeze, motion_blur };

export const WrappersType = z.object({
  wrappers: z.record(
    z.object({
      name: WrapperNames,
      props: z.any(),
    })
  ),
  allWrappers: z.string().array(),
});
export type WrappersType = z.infer<typeof WrappersType>;

const Wrap = ({ allWrappers, id, children }: { allWrappers: string[]; id: string; children: ReactNode }) => {
  const wrapper = useCompositionStore((s) => s.template?.components[id]?.wrappers.wrappers[allWrappers[0]]);
  if (allWrappers.length === 0 || !wrapper) return <>{children}</>;

  const Wrapper = wrappersCollection[wrapper.name].wrapper;
  return (
    <Wrapper {...wrapper.props}>
      <Wrap allWrappers={allWrappers.slice(1)} id={id} children={children} />
    </Wrapper>
  );
};

export const Wrappers = ({ children, id }: { children: ReactNode; id: string }) => {
  const allWrappers = useCompositionStore((s) => s.template?.components[id]?.wrappers.allWrappers);
  return (
    <Wrap allWrappers={allWrappers || []} id={id}>
      {children}
    </Wrap>
  );
};
