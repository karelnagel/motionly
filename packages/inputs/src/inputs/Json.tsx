import { z } from "zod";
import { DefineInput, getColspan } from "..";

export const json: DefineInput<string> = {
  zod: z.string(),
  component: ({ disabled, value, onChange, props: { placeholder, label, colspan } }) => {
    return (
      <div className="form" style={getColspan(colspan)}>
        <label>{label}</label>
        <textarea disabled={disabled} placeholder={placeholder} value={value} onChange={(e) => onChange(e.target.value)} />
      </div>
    );
  },
};
