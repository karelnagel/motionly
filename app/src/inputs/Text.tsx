import { z } from "zod";
import { DefineInput } from ".";

export const text: DefineInput<string> = {
  zod: z.string(),
  component: ({ props: { label }, value, onChange }) => {
    return (
      <div className="form">
        <label>{label}</label>
        <input type="text" value={value} onChange={(e) => onChange(e.target.value)} />
      </div>
    );
  },
};
