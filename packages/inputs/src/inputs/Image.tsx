import { z } from "zod";
import { DefineInput, getColspan } from "..";

export const image: DefineInput<string> = {
  zod: z.string().url(),
  component: ({ disabled, value, onChange, props: { placeholder, label, colspan } }) => {
    return (
      <div className="form" style={getColspan(colspan)}>
        <label>{label}</label>
        <input disabled={disabled} placeholder={placeholder} type="text" onChange={(e) => onChange(e.target.value)} />
      </div>
    );
  },
};
