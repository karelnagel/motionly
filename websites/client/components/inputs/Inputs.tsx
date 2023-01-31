import { inputTypes } from "@motionly/base";
import { Input } from ".";
import { useTemplate } from "../../hooks/useTemplate";

export type UserInput = {
  prop: string;
  type: keyof typeof inputTypes;
  label?: string;
  if?: (comp: any) => boolean;
  options?: { value: string; label: string }[];
};
export const Inputs = ({ inputs }: { inputs: UserInput[] }) => {
  const { selectedComp, setComp } = useTemplate();
  return (
    <>
      {inputs
        .filter((c) => (c.if ? c.if(selectedComp) : true))
        .map(({ prop, type }) => (
          <Input
            key={prop}
            prop={prop}
            type={type}
            label={prop}
            value={(selectedComp as any)[prop]}
            onChange={(value) => setComp({ [prop]: value })}
          />
        ))}
    </>
  );
};
