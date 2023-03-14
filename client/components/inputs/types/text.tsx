import { InputProps } from "..";

export const TextInput = ({
  disabled,
  placeholder,
  value,
  onChange,
}: InputProps<string>) => {
  return (
    <input
      disabled={disabled}
      type="text"
      placeholder={placeholder}
      value={value || ""}
      className="input input-sm bg-base-200 input-bordered w-full"
      onChange={(e) => onChange(e.target.value)}
    />
  );
};
