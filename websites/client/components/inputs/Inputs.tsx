import { ComponentProps, inputTypes } from "@motionly/base";
import { Input } from ".";
import { useComponent } from "../../hooks/useComponent";
import { useProject } from "../../hooks/useProject";

export type UserInput<T> = {
  prop: keyof T;
  type: keyof typeof inputTypes;
  label?: string;
  if?: (comp: T) => boolean;
  options?: { value: string; label: string }[];
};
export const Inputs = ({ inputs }: { inputs: UserInput<ComponentProps>[] }) => {
  const comp = useComponent();
  if (!comp) return null;
  const setComp = useProject((t) => t.setComp);
  return (
    <>
      {inputs
        .filter((c) => (c.if ? c.if(comp) : true))
        .map(({ prop, type, label }) => (
          <Input
            key={prop}
            prop={prop}
            type={type}
            label={label || prop}
            value={(comp as any)[prop]}
            onChange={(value) =>
              setComp((c: any) => {
                c[prop] = value;
              })
            }
          />
        ))}
    </>
  );
};
