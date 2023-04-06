import { z } from "zod";
import { DefineInput, getColspan } from "..";

export const video: DefineInput<string> = {
  zod: z.string().url(),
  component: ({ disabled, onChange, props: { placeholder, label, colspan } }) => {
    return (
      <div className="form" style={getColspan(colspan)}>
        <label>{label}</label>
        <input disabled={disabled} placeholder={placeholder} type="text" onChange={(e) => onChange(e.target.value)} />
      </div>
    );
  },
};
