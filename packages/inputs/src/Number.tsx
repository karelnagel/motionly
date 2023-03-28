import { z } from "zod";
import { Input } from ".";

export const number: Input<number> = {
  type: "number",
  zod: z.number(),
  component: ({ label, value, onChange }) => {
    return (
      <div>
        <label>{label}</label>
        <input type="number" value={value} onChange={(e) => onChange(Number(e.target.value))} />
      </div>
    );
  },
};
