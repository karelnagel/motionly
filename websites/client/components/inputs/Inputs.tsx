import { inputTypes } from "@motionly/base";
import { Input } from ".";
import { useComponent } from "../../hooks/useComponent";
import { useProject } from "../../hooks/useProject";

export type UserInput = {
  prop: string;
  type: keyof typeof inputTypes;
  label?: string;
  if?: (comp: any) => boolean;
  options?: { value: string; label: string }[];
};
export const Inputs = ({ inputs }: { inputs: UserInput[] }) => {
  const comp = useComponent();
  const setComp = useProject((t) => t.setComp);
  return (
    <>
      {inputs
        .filter((c) => (c.if ? c.if(comp) : true))
        .map(({ prop, type }) => (
          <Input
            key={prop}
            prop={prop}
            type={type}
            label={prop}
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
