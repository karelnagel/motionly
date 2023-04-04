import { z } from "zod";
import { Input } from ".";

export const json: Input<string> = {
  zod: z.string(),
  component: ({ disabled, value, onChange, props: { placeholder, label, tooltip } }) => {
    return (
      <div className="form">
        <label>{label}</label>
        <textarea
          disabled={disabled}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    );
  },
};
