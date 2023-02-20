import { InputProps } from "..";

export const SelectInput = ({
  disabled,
  value,
  onChange,
}: InputProps<string>) => {
  return (
    <select
      disabled={disabled}
      className="select select-bordered select-sm bg-base-200 w-full"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value={undefined}>Not selected</option>
      {/* {options?.map(({ value, label }, i) => (
        <option key={i} value={value}>
          {label}
        </option>
      ))} */}
    </select>
  );
};
