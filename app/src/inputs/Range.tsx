import { z } from "zod";
import { DefineInput, getColspan } from ".";

export const range: DefineInput<
  number,
  {
    min: number;
    max: number;
    step?: number;
  }
> = {
  zod: z.number(),
  component: ({ value, onChange, props: { label, min, max, step, colspan } }) => {
    return (
      <div className="form" style={getColspan(colspan)}>
        <label>{label}</label>
        <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(Number(e.target.value))} />
      </div>
    );
  },
};
