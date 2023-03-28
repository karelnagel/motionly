import { z } from "zod";
import { Input } from ".";

export const text: Input<string> = {
  type: "text",
  zod: z.string(),
  component: ({ label, value, onChange }) => {
    return (
      <div>
        <label>{label}</label>
        <input type="text" value={value} onChange={(e) => onChange(e.target.value)} />
      </div>
    );
  },
};
