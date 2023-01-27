
import { BaseColor, Color } from "@motionly/base";
import { IoIosAdd, IoIosTrash } from "react-icons/io";
import { hexToPercent, percentToHex } from "../../helpers";

export function OneColorInput({
    value,
    onChange,
  }: {
    value?: string;
    onChange: (value?: string) => void;
  }) {
    if (!value) return null;
    const color = value.slice(0, 7);
    const alpha = value.slice(7);
  
    return (
      <div
        className="pr-3 flex bg-base-200 w-full items-center justify-end rounded-lg border leading-none overflow-hidden"
        style={{ borderColor: value }}
      >
        <div className="flex w-full justify-between">
          <input
            type="color"
            value={color || ""}
            onChange={(e) => onChange(e.target.value + alpha)}
            className="bg-transparent w-14 h-11 -my-2 -ml-2 p-0 mr-0"
          />
          <input
            type="text"
            value={color || ""}
            onChange={(e) => onChange(e.target.value + alpha)}
            className=" bg-transparent w-20"
          />
          <div className="flex items-center">
            <input
              type="number"
              value={alpha !== undefined ? hexToPercent(alpha) : ""}
              onChange={(e) =>
                onChange(
                  color +
                    (e.target.value ? percentToHex(Number(e.target.value)) : "")
                )
              }
              className="w-10 bg-transparent"
            />
            %
          </div>
        </div>
      </div>
    );
  }
  export function ColorInput<T extends BaseColor | Color>({
    label,
    value,
    onChange,
    gradients,
  }: {
    label: string;
    value?: T;
    onChange: (value?: T) => void;
    gradients?: boolean;
  }) {
    return (
      <div className="col-span-2 mt-2">
        <div className="flex justify-between">
          <p className="label label-text">{label}</p>
          <select
            className="select select-bordered select-sm bg-base-200"
            value={value?.type}
            onChange={(e) =>
              onChange(
                e.target.value
                  ? ({ ...value, type: e.target.value } as T)
                  : undefined
              )
            }
          >
            <option value={undefined}>None</option>
            <option value="basic">Basic</option>
            <option value="interpolate">Interpolate</option>
            {gradients && <option value="linear">Linear</option>}
            {gradients && <option value="radial">Radial</option>}
          </select>
        </div>
  
        {value?.type === "basic" && (
          <OneColorInput
            value={value.color}
            onChange={(v) => onChange({ ...value, color: v })}
          />
        )}
        {value?.type === "interpolate" && (
          <div className="flex flex-col space-y-2">
            {value.colors?.map((c, i) => (
              <div key={i} className="flex items-center space-x-2">
                <OneColorInput
                  value={c}
                  onChange={(v) => {
                    const colors = [...(value.colors || [])];
                    colors[i] = v || "";
                    onChange({ ...value, colors });
                  }}
                />
                <input
                  type="number"
                  className="w-10 rounded-lg"
                  value={value.durations?.[i]}
                  onChange={(e) => {
                    const durations = [...(value.durations || [])];
                    durations[i] = Number(e.target.value);
                    onChange({ ...value, durations });
                  }}
                />
                <button
                  className="btn btn-ghost btn-sm"
                  onClick={() => {
                    const colors = [...(value.colors || [])];
                    colors.splice(i, 1);
                    onChange({ ...value, colors });
                  }}
                >
                  <IoIosTrash />
                </button>
              </div>
            ))}
            <button
              className="btn btn-ghost btn-sm"
              onClick={() => {
                const colors = [...(value.colors || [])];
                colors.push("#ffffffff");
                onChange({ ...value, colors });
              }}
            >
              <IoIosAdd />
            </button>
          </div>
        )}
      </div>
    );
  }
  