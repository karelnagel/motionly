import { z } from "zod";
import { Input } from ".";

export const text: Input<string> = {
  zod: z.string(),
  component: ({ props: { label }, value, onChange }) => {
    return (
      <div>
        <label>{label}</label>
        <input type="text" value={value} onChange={(e) => onChange(e.target.value)} />
      </div>
    );
  },
};
