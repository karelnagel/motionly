import { z } from "zod";
import { DefineInput, getColspan } from "..";

export const range: DefineInput<
  number,
  {
    min: number;
    max: number;
    step?: number;
  }
> = {
  zod: z.number(),
  component: ({ value, onChange, props: { label, min, max, step, colspan, def = 1 } }) => {
    return (
      <div className="form" style={getColspan(colspan)}>
        <label>{label}</label>
        <input type="range" min={min} max={max} step={step} value={value || def} onChange={(e) => onChange(Number(e.target.value))} />
      </div>
    );
  },
};
