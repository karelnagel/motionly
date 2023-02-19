import { InputProps } from "..";

export const CheckBoxInput = ({
  onChange,
  value,
  disabled,
}: InputProps<boolean>) => {
  return (
    <input
      disabled={disabled}
      type="checkbox"
      checked={(value as boolean) || false}
      className="checkbox checkbox-primary"
      onChange={(e) => onChange(e.target.checked)}
    />
  );
};
