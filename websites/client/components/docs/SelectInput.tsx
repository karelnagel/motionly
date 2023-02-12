export const SelectInput = ({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}) => {
  return (
    <select
      className=""
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {options.map(({ value, label }, i) => (
        <option key={i} value={value}>
          {label}
        </option>
      ))}
    </select>
  );
};
