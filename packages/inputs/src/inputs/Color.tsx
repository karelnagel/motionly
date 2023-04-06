import { z } from "zod";
import { DefineInput, getColspan } from "..";

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

export const color: DefineInput<string> = {
  zod: Color,
  component: ({ disabled, value, onChange, props: { label, colspan } }) => {
    const color = value?.slice(0, 7);
    const alpha = value?.slice(7) || "FF";
    return (
      <div className="form form-color" style={{ borderColor: value, ...getColspan(colspan) }}>
        <label>{label}</label>
        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", width: "100%" }}>
          <input type="color" value={color || ""} disabled={disabled} onChange={(e) => onChange(e.target.value + alpha)} />
          <input
            type="text"
            value={color || ""}
            onChange={(e) => onChange(e.target.value + alpha)}
            disabled={disabled}
            style={{ margin: "0 10px" }}
          />
          <div style={{ display: "flex", flexDirection: "row" }}>
            <input
              style={{ width: "40px" }}
              type="NUMBER"
              disabled={disabled}
              min={0}
              max={100}
              value={alpha ? hexToPercent(alpha) : "100"}
              onChange={(e) => onChange(color + (e.target.value ? percentToHex(Number(e.target.value)) : ""))}
            />
            %
          </div>
        </div>
      </div>
    );
  },
};
