import { Input } from "..";
import { SelectOptions } from "./options";

export const select: Input<boolean, { options: keyof typeof SelectOptions }> = {
  zod: ({ options }) => SelectOptions[options] as any,
  component: ({ disabled, value, onChange, props: { placeholder, label, tooltip } }) => {
    return (
      <div>
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
