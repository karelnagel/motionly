"use client";

import { hexToPercent, percentToHex } from "../helpers";

export const NumberInput = ({
  label,
  value,
  onChange,
  className,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  className?: string;
}) => {
  return (
    <div
      className={`flex items-center space-x-2 bg-base-300 rounded-lg py-1 px-2 w-full ${className}`}
    >
      <label>{label}</label>
      <input
        type="number"
        value={value || 0}
        className=" bg-base-300 w-full"
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
    <div className="flex items-center p-2 space-x-2 bg-base-300 rounded-lg py-1 px-2 col-span-2 w-full">
      <label>{label}</label>
      <input
        type="text"
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        className="bg-base-300 w-full"
      />
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
  const color = value.slice(0, 7);
  const alpha = value.slice(7);
  return (
    <div className="flex items-center p-2  space-x-2 bg-base-300 rounded-lg py-1 px-2 col-span-2 w-full">
      <label>{label}</label>
      <input
        type="color"
        value={color || ""}
        onChange={(e) => onChange(e.target.value + alpha)}
        className="bg-base-300 w-10 rounded-md"
      />
      <input
        type="text"
        value={color || ""}
        onChange={(e) => onChange(e.target.value + alpha)}
        className="bg-base-300 w-20"
      />
      <input
        type="number"
        value={alpha ? hexToPercent(alpha) : 100}
        onChange={(e) => onChange(color + percentToHex(Number(e.target.value || 0)))}
        className="bg-base-300 w-10"
      />
    </div>
  );
};

export const SelectInput = ({
  label,
  value,
  onChange,
  list,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  list: string[];
}) => {
  return (
    <div className="flex items-center p-2 space-x-2 bg-base-300 rounded-lg py-1 px-2 col-span-2 w-full">
      <label>{label}</label>
      <select
        className=" w-full h-full bg-base-300"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {list.map((font, i) => (
          <option key={i} value={font}>
            {font}
          </option>
        ))}
      </select>
    </div>
  );
};
