import { z } from "zod";
import { Input } from ".";

export const json: Input<string> = {
  zod: z.string(),
  component: ({ disabled, value, onChange, props: { placeholder, label, tooltip } }) => {
    return (
      <div>
        <label>{label}</label>
        <textarea
          disabled={disabled}
          placeholder={placeholder}
          value={value}
          className="checkbox checkbox-primary"
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    );
  },
};
