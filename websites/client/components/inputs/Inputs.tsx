import { ComponentProps, VariableTypes } from "@motionly/base";
import { VariableInput } from ".";
import { useComponent } from "../../hooks/useComponent";
import { useProject } from "../../hooks/useProject";

export type UserInput<T> = {
  prop: keyof T;
  type: VariableTypes;
  label?: string;
  if?: (comp: T) => boolean;
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
          <VariableInput
            key={prop}
            prop={prop}
            type={type as any}
            label={label || prop}
            value={(comp as any)[prop]}
            onChange={(value: any) =>
              setComp((c: any) => {
                c[prop] = value;
              })
            }
          />
        ))}
    </>
  );
};
