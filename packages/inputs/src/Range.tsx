import { z } from "zod";
import { Input, InputProps } from ".";

type RangeProps = InputProps<number | undefined> & {
  min: number;
  max: number;
  step: number;
};
export const range: Input<number, RangeProps> = {
  type: "range",
  zod: z.number(),
  component: ({ label, value, onChange, min, max, step }) => {
    return (
      <div>
        <label>{label}</label>
        <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(Number(e.target.value))} />
      </div>
    );
  },
};
