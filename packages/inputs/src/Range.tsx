import { z } from "zod";
import { Input } from ".";

export const range: Input<
  number,
  {
    min: number;
    max: number;
    step: number;
  }
> = {
  zod: z.number(),
  component: ({ value, onChange, props: { label, min, max, step } }) => {
    return (
      <div>
        <label>{label}</label>
        <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(Number(e.target.value))} />
      </div>
    );
  },
};
