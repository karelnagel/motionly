import { z } from "zod";
import { loop } from "./Loop";
import { ReactNode } from "react";
import { freeze } from "./Freeze";
import { animation } from "./Animation";
import { motion_blur } from "./MotionBlur";
import { useComponent } from "../helpers/store";

export const WrapperName = z.enum(["freeze", "loop", "motion_blur", "animation"]);
export type WrapperName = z.infer<typeof WrapperName>;

export type DefineWrapper<T extends { type: WrapperName }> = {
  wrapper: React.FC<T & { children: ReactNode }>;
  zod: z.ZodType<T>;
  title: string;
  icon: React.FC;
  default: T;
  edit: React.FC<{ value: T; onChange: (v: Partial<T>) => void }>;
};
export const Wrapper = z.union([loop.zod, freeze.zod, animation.zod, motion_blur.zod]);
export type Wrapper = z.infer<typeof Wrapper>;

export const Wrappers = z.record(WrapperName, Wrapper);
export type Wrappers = z.infer<typeof Wrappers>;

export const definedWrappers = { loop, freeze, animation, motion_blur };

const Wrap = ({ allWrappers, id, children }: { allWrappers: WrapperName[]; id: string; children: ReactNode }) => {
  const w = allWrappers[0];
  if (allWrappers.length === 0) return <>{children}</>;

  const props = useComponent((c) => c.wrappers[w], id);
  if (!props) return <Wrap allWrappers={allWrappers.slice(1)} id={id} children={children} />;
  const Wrapper = definedWrappers[w].wrapper;
  return (
    <Wrapper {...(props as any)}>
      <Wrap allWrappers={allWrappers.slice(1)} id={id} children={children} />
    </Wrapper>
  );
};

export const WrappersComponent = ({ children, id }: { children: ReactNode; id: string }) => {
  const allWrappers = WrapperName.options;
  return (
    <Wrap allWrappers={allWrappers || []} id={id}>
      {children}
    </Wrap>
  );
};
