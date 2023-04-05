import { z } from "zod";
import { DefineInput } from ".";

export const gif: DefineInput<string> = {
  zod: z.string().url(),
  component: ({ disabled, value, onChange, props: { placeholder, label, tooltip } }) => {
    return (
      <div className="form">
        <label>{label}</label>
        <input
          disabled={disabled}
          placeholder={placeholder}
          type="text"
          className="checkbox checkbox-primary"
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    );
  },
};
