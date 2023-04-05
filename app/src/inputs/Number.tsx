import { z } from "zod";
import { getColspan, DefineInput } from ".";

export const number: DefineInput<number> = {
  zod: z.number(),
  component: ({ props: { label, placeholder, colspan }, value, onChange, disabled }) => {
    return (
      <div className="form" style={getColspan(colspan)}>
        <label>{label}</label>
        <input
          onWheel={(e) => e.currentTarget.blur()}
          disabled={disabled}
          type="number"
          placeholder={placeholder}
          value={value === undefined ? "" : value}
          onChange={(e) => onChange(e.target.value ? Number(e.target.value) : undefined)}
        />
      </div>
    );
  },
};
