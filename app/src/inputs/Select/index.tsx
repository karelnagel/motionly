import { z } from "zod";
import { DefineInput, getColspan } from "..";
import { capitalize } from "../../helpers";

// Todo fix this and also rethink options
export const select: DefineInput<string, { zod: z.ZodEnum<[string, ...string[]]> }> = {
  zod: ({ zod }) => zod,
  component: ({ disabled, value, onChange, props: { label, colspan, zod } }) => {
    return (
      <div className="form" style={getColspan(colspan)}>
        <label>{label}</label>
        <select disabled={disabled} onChange={(e) => onChange(e.target.value)} value={value}>
          {zod.options.map((option) => (
            <option key={option} value={option}>
              {capitalize(option)}
            </option>
          ))}
        </select>
      </div>
    );
  },
};
