import { z } from "zod";
import { Input } from ".";

export const number: Input<number> = {
  zod: z.number(),
  component: ({ props: { label, placeholder }, value, onChange, disabled }) => {
    return (
      <div className="form">
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
