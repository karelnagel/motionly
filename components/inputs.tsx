
export const NumberInput = ({
    label,
    value,
    onChange,
  }: {
    label: string;
    value: number;
    onChange: (value: number) => void;
  }) => {
    return (
      <div>
        <label>{label}</label>
        <input
          type="number"
          value={value || 0}
          onChange={(e) => onChange(parseInt(e.target.value))}
        />
      </div>
    );
  };
  
  export const TextInput = ({
    label,
    value,
    onChange,
  }: {
    label: string;
    value: string;
    onChange: (value: string) => void;
  }) => {
    return (
      <div>
        <label>{label}</label>
        <input type="text" value={value || ""} onChange={(e) => onChange(e.target.value)} />
      </div>
    );
  };
  export const ColorInput = ({
    label,
    value,
    onChange,
  }: {
    label: string;
    value: string;
    onChange: (value: string) => void;
  }) => {
    return (
      <div>
        <label>{label}</label>
        <input type="color" value={value || ""} onChange={(e) => onChange(e.target.value)} />
      </div>
    );
  };
  