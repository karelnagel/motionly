import { InputProps } from "..";

export const NumberInput = ({
  disabled,
  placeholder,
  value,
  onChange,
}: InputProps<number>) => {
  return (
    <input
      disabled={disabled}
      type="number"
      placeholder={placeholder}
      value={value === undefined ? "" : value}
      className="input input-sm bg-base-200 input-bordered w-full"
      onChange={(e) =>
        onChange(e.target.value ? Number(e.target.value) : undefined)
      }
    />
  );
};
