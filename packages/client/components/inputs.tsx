"use client";

import { hexToPercent, percentToHex } from "../helpers";

export function NumberInput({
  label,
  value,
  onChange,
  className,
}: {
  label: string;
  value?: number;
  onChange: (value?: number) => void;
  className?: string;
}) {
  return (
    <div
      className={`flex items-center space-x-3 bg-base-300 rounded-lg py-1 px-2 w-full ${className}`}
    >
      <label className="whitespace-nowrap shrink-0">{label}</label>
      <input
        type="number"
        value={value === undefined ? "" : value}
        className=" bg-base-300 w-full"
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
    <div
      className={`flex items-center space-x-2 bg-base-300 rounded-lg py-1 px-2 w-full ${className}`}
    >
      <label>{label}</label>
      <input
        type="checkbox"
        checked={value || false}
        className=" bg-base-300 w-full"
        onChange={(e) => onChange(e.target.checked as T)}
      />
    </div>
  );
}

export function TextInput<T extends string | undefined>({
  label,
  value,
  onChange,
  area,
}: {
  label: string;
  value: T;
  onChange: (value: T) => void;
  area?: boolean;
}) {
  return (
    <div className="flex items-center p-2 space-x-2 bg-base-300 rounded-lg py-1 px-2 col-span-2 w-full">
      <label>{label}</label>
      {area ? (
        <textarea
          value={value || ""}
          onChange={(e) => onChange(e.target.value as T)}
          className="bg-base-300 w-full"
        />
      ) : (
        <input
          type="text"
          value={value || ""}
          onChange={(e) => onChange(e.target.value as T)}
          className="bg-base-300 w-full"
        />
      )}
    </div>
  );
}
export function ColorInput<T extends string | undefined>({
  label,
  value,
  onChange,
}: {
  label: string;
  value: T;
  onChange: (value?: T) => void;
}) {
  const color = value?.slice(0, 7);
  const alpha = value?.slice(7);
  return (
    <div className="flex items-center p-2  space-x-2 bg-base-300 rounded-lg py-1 px-2 col-span-2 w-full justify-between">
      <label>{label}</label>
      {!value && (
        <button onClick={() => onChange("#000000FF" as T)}>ADD</button>
      )}
      {value && (
        <>
          <input
            type="color"
            value={color || ""}
            onChange={(e) => onChange((e.target.value + alpha) as T)}
            className="bg-base-300 w-10 rounded-md"
          />
          <input
            type="text"
            value={color || ""}
            onChange={(e) => onChange((e.target.value + alpha) as T)}
            className="bg-base-300 w-20"
          />
          <input
            type="number"
            value={alpha ? hexToPercent(alpha) : 100}
            onChange={(e) =>
              onChange((color + percentToHex(Number(e.target.value || 0))) as T)
            }
            className="bg-base-300 w-10"
          />
          <button onClick={() => onChange()}>X</button>
        </>
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
    <div className="flex items-center p-2 space-x-2 bg-base-300 rounded-lg py-1 px-2 col-span-2 w-full">
      <label>{label}</label>
      <select
        className=" w-full h-full bg-base-300"
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
