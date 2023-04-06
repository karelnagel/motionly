import { z } from "zod";
import { DefineInput, getColspan } from ".";

export const text: DefineInput<string> = {
  zod: z.string(),
  component: ({ props: { label, colspan }, value, onChange }) => {
    return (
      <div className="form" style={getColspan(colspan)}>
        <label>{label}</label>
        <input type="text" value={value} onChange={(e) => onChange(e.target.value)} />
      </div>
    );
  },
};
