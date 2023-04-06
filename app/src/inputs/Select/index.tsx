import { DefineInput, getColspan } from "..";
import { SelectOptions } from "./options";

// Todo fix this and also rethink options
export const select: DefineInput<boolean, { options: keyof typeof SelectOptions }> = {
  zod: ({ options }) => SelectOptions[options] as any,
  component: ({ disabled, value, onChange, props: { placeholder, label, tooltip, colspan } }) => {
    return (
      <div className="form" style={getColspan(colspan)}>
        <label>{label}</label>
        <input
          disabled={disabled}
          placeholder={placeholder}
          type="checkbox"
          checked={value || false}
          className="checkbox checkbox-primary"
          onChange={(e) => onChange(e.target.checked)}
        />
      </div>
    );
  },
};
