import { InputProps } from "..";

export const TextAreaInput = ({
  disabled,
  placeholder,
  value,
  onChange,
}: InputProps<string>) => {
  return (
    <textarea
      disabled={disabled}
      placeholder={placeholder}
      value={value || ""}
      className="textarea bg-base-200 textarea-bordered w-full"
      onChange={(e) => onChange(e.target.value)}
    />
  );
};
