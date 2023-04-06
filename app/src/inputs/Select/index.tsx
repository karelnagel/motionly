import { z } from "zod";
import { DefineInput, getColspan } from "..";
import { capitalize } from "../../helpers";

type Option = { value: string; label?: string };
export const select: DefineInput<string, { zod?: z.ZodEnum<[string, ...string[]]>; options?: Option[] }> = {
  zod: ({ zod }) => zod || z.any(),
  component: ({ disabled, value, onChange, props: { label, colspan, zod, options } }) => {
    const opts = options || zod?.options.map((option) => ({ value: option, label: capitalize(option) }));
    return (
      <div className="form" style={getColspan(colspan)}>
        <label>{label}</label>
        <select disabled={disabled} onChange={(e) => onChange(e.target.value)} value={value}>
          {opts?.map(({ value, label }) => (
            <option key={value} value={value}>
              {label || value}
            </option>
          ))}
        </select>
      </div>
    );
  },
};
