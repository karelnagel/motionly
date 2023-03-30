import { z } from "zod";
import { Input } from ".";

const percentToHex = (p: number) => {
  const intValue = Math.round((p / 100) * 255); // map percent to nearest integer (0 - 255)
  const hexValue = intValue.toString(16); // get hexadecimal representation
  return hexValue.padStart(2, "0").toUpperCase(); // format with leading 0 and upper case characters
};

const normalize = (val: number, max: number, min: number) => {
  return (val - min) / (max - min);
};
const hexToPercent = (alpha: string) => {
  return Math.round(normalize(parseInt(alpha, 16), 255, 0) * 100);
};

export const Color = z.string().startsWith("#").max(9);

export const color: Input<string> = {
  zod: Color,
  component: ({ disabled, value, onChange, props: { placeholder, label, tooltip } }) => {
    const color = value?.slice(0, 7);
    const alpha = value?.slice(7) || "FF";
    return (
      <div
        className="pr-3 flex bg-base-200 w-full items-center justify-end rounded-lg border leading-none overflow-hidden"
        style={{ borderColor: value }}
      >
        <label>{label}</label>
        <div className="flex w-full justify-between">
          <input
            type="color"
            value={color || ""}
            disabled={disabled}
            onChange={(e) => onChange(e.target.value + alpha)}
            className="bg-transparent w-14 h-11 -my-2 -ml-2 p-0 mr-0"
          />
          <input
            type="text"
            value={color || ""}
            onChange={(e) => onChange(e.target.value + alpha)}
            disabled={disabled}
            className=" bg-transparent w-20"
          />
          <div className="flex items-center">
            <input
              type="NUMBER"
              disabled={disabled}
              min={0}
              max={100}
              value={alpha ? hexToPercent(alpha) : "100"}
              onChange={(e) => onChange(color + (e.target.value ? percentToHex(Number(e.target.value)) : ""))}
              className="w-10 bg-transparent"
            />
            %
          </div>
        </div>
      </div>
    );
  },
};
