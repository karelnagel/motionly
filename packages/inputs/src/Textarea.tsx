import { z } from "zod";
import { Input } from ".";

export const textarea: Input<string> = {
  zod: z.string(),
  component: ({ disabled, value, onChange, props: { placeholder, label } }) => {
    return (
      <div>
        <label>{label}</label>
        <textarea
          disabled={disabled}
          placeholder={placeholder}
          value={value || ""}
          className="textarea bg-base-200 textarea-bordered w-full"
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    );
  },
};
