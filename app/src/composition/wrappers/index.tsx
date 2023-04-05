import { z } from "zod";
import { loop } from "./Loop";
import { ReactNode } from "react";
import { useComponent } from "..";
import { freeze } from "./Freeze";
import { animation } from "./Animation";
import { motion_blur } from "./MotionBlur";

export const WrapperName = z.enum(["loop", "animation", "freeze", "motion_blur"]);
export type WrapperName = z.infer<typeof WrapperName>;

export type WrapperType<T extends { type: WrapperName }> = {
  wrapper: React.FC<T & { children: ReactNode }>;
  zod: z.ZodType<T>;
  title: string;
  icon: React.FC;
  edit: React.FC<{ value: T; onChange: (v: Partial<T>) => void }>;
};
export const Wrapper = z.union([loop.zod, freeze.zod, animation.zod, motion_blur.zod]);
export type Wrapper = z.infer<typeof Wrapper>;

export const Wrappers = z.record(WrapperName, Wrapper);
export type Wrappers = z.infer<typeof Wrappers>;

export const items = { loop, freeze, animation, motion_blur };

export const WrappersComponent = ({ children, id }: { children: ReactNode; id: string }) => {
  const wrappers = useComponent((c) => c.wrappers, id);
  return (
    <>
      {WrapperName.options.map((w) => {
        const Wrapper = items[w].wrapper;
        return (
          <Wrapper {...(wrappers[w] as any)} type={w}>
            {children}
          </Wrapper>
        );
      })}
    </>
  );
};
