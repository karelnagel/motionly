"use client";

export * from "./color";

export function NumberInput({
  label,
  value,
  onChange,
  className,
  tooltip,
  placeholder = "",
}: {
  label: string;
  value?: number;
  onChange: (value?: number) => void;
  className?: string;
  tooltip?: boolean;
  placeholder?: string;
}) {
  return (
    <div className={`form-control items-start ${className}`}>
      <label
        className={`label label-text ${tooltip ? "tooltip" : ""}`}
        data-tip="Negative numbers will start from end"
      >
        <span>{label}</span>
      </label>
      <input
        type="number"
        placeholder={placeholder}
        value={value === undefined ? "" : value}
        className="input input-sm bg-base-200 input-bordered min-w-[50px] w-full"
        onChange={(e) =>
          onChange(e.target.value ? Number(e.target.value) : undefined)
        }
      />
    </div>
  );
}
export function BooleanInput<T extends boolean | undefined>({
  label,
  value,
  onChange,
  className,
}: {
  label: string;
  value: T;
  onChange: (value: T) => void;
  className?: string;
}) {
  return (
    <div className={`form-control ${className}`}>
      <label className="label cursor-pointer">
        <span className="label-text">{label}</span>
        <input
          type="checkbox"
          checked={value || false}
          className="checkbox checkbox-primary"
          onChange={(e) => onChange(e.target.checked as T)}
        />
      </label>
    </div>
  );
}

export function TextInput<T extends string | undefined>({
  label,
  value,
  onChange,
  area,
  className,
}: {
  label: string;
  value: T;
  onChange: (value: T) => void;
  area?: boolean;
  className?: string;
}) {
  return (
    <div className={`col-span-2 form-control`}>
      <label className="label label-text">{label}</label>
      {area ? (
        <textarea
          value={value || ""}
          onChange={(e) => onChange(e.target.value as T)}
          className={`textarea bg-base-200 textarea-bordered ${className}`}
        />
      ) : (
        <input
          type="text"
          value={value || ""}
          onChange={(e) => onChange(e.target.value as T)}
          className="input bg-base-200 input-bordered input-sm"
        />
      )}
    </div>
  );
}
export const SelectInput = ({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value?: string;
  onChange: (value?: string) => void;
  options: { value: string; label: string }[];
}) => {
  return (
    <div className="col-span-2 form-control">
      <label className="label label-text">{label}</label>
      <select
        className="select select-bordered select-sm bg-base-200"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value={undefined}>Not selected</option>
        {options.map(({ value, label }, i) => (
          <option key={i} value={value}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
};
