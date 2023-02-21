import {
  BaseColor,
  Color,
  InterpolateColor,
  GradientColor,
} from "@motionly/base";
import { useState } from "react";
import { IoIosAdd, IoIosTrash } from "react-icons/io";
import { InputProps } from "..";
import { hexToPercent, percentToHex } from "../../../helpers";
import { ShowHide } from "../../ShowHide";

function Select({
  type,
  onChange,
  hasGradients,
}: {
  hasGradients?: boolean;
  type?: Colors;
  onChange: (type?: Colors) => void;
}) {
  return (
    <select
      className="select select-bordered select-sm bg-base-200 w-full"
      value={type}
      onChange={(e) => onChange(e.target.value as Colors)}
    >
      <option value="">None</option>
      <option value="basic">Basic</option>
      <option value="interpolate">Interpolate</option>
      {hasGradients && <option value="linear">Linear</option>}
      {hasGradients && <option value="radial">Radial</option>}
    </select>
  );
}

export function OneColorInput({
  value = "#ffffffff",
  onChange,
}: {
  value?: string;
  onChange: (value?: string) => void;
}) {
  const color = value?.slice(0, 7);
  const alpha = value?.slice(7);

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
            type="NUMBER"
            value={alpha ? hexToPercent(alpha) : ""}
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

export const InterpolateColorInput = ({
  value,
  onChange,
}: {
  value: InterpolateColor;
  onChange: (value?: InterpolateColor) => void;
}) => {
  return (
    <div className="flex flex-col space-y-2">
      {value.colors?.map((c, i) => (
        <div key={i} className="flex items-center space-x-2">
          <OneColorInput
            value={c.color}
            onChange={(color) => {
              onChange({
                ...value,
                colors: value.colors?.map((c, j) =>
                  i === j ? { ...c, color } : c
                ),
              });
            }}
          />
          <input
            type="number"
            className="w-10 rounded-lg"
            value={c.start === undefined ? "" : c.start}
            onChange={(e) => {
              onChange({
                ...value,
                colors: value.colors?.map((c, j) =>
                  i === j
                    ? {
                        ...c,
                        start: e.target.value
                          ? Number(e.target.value)
                          : undefined,
                      }
                    : c
                ),
              });
            }}
          />
          <button
            className="btn btn-ghost btn-sm"
            onClick={() => {
              onChange({
                ...value,
                colors: value.colors?.filter((_, j) => i !== j),
              });
            }}
          >
            <IoIosTrash />
          </button>
        </div>
      ))}
      <button
        className="btn btn-ghost btn-sm"
        onClick={() => {
          onChange({
            ...value,
            colors: [
              ...(value.colors || []),
              { color: "#ffffffff", start: value.colors?.length || 0 },
            ],
          });
        }}
      >
        <IoIosAdd />
      </button>
    </div>
  );
};
type Colors = "basic" | "interpolate" | "linear" | "radial";

export const GradientInput = ({
  value,
  onChange,
}: {
  value: GradientColor;
  onChange: (c: GradientColor) => void;
}) => {
  return (
    <div className="flex flex-col space-y-2">
      <input
        type="number"
        className="rounded-lg"
        placeholder="angle"
        value={value.angle === undefined ? "" : value.angle}
        onChange={(e) =>
          onChange({
            ...value,
            angle: e.target.value ? Number(e.target.value) : undefined,
          })
        }
      />
      {value.gradients?.map((color, i) => (
        <div key={i} className="flex flex-col">
          <div className="flex items-center justify-between">
            <p>Color {i + 1}</p>
            <Select
              type={color.color?.type}
              onChange={(type) => {
                if (type)
                  onChange({
                    ...value,
                    gradients: value.gradients?.map((c, j) =>
                      i === j
                        ? {
                            ...c,
                            color: {
                              type: type as "basic" | "interpolate",
                            },
                          }
                        : c
                    ),
                  });
              }}
            />
            <input
              type="number"
              className="w-10 rounded-lg"
              placeholder="stops"
              value={color.stop === undefined ? "" : color.stop}
              onChange={(e) => {
                onChange({
                  ...value,
                  gradients: value.gradients?.map((c, j) =>
                    i === j
                      ? {
                          ...c,
                          stop: e.target.value
                            ? Number(e.target.value)
                            : undefined,
                        }
                      : c
                  ),
                });
              }}
            />
            <button
              className="btn btn-ghost btn-sm"
              onClick={() => {
                onChange({
                  ...value,
                  gradients: value.gradients?.filter((_, j) => i !== j),
                });
              }}
            >
              <IoIosTrash />
            </button>
          </div>

          {color.color?.type === "basic" && (
            <OneColorInput
              value={color.color.color}
              onChange={(color) => {
                onChange({
                  ...value,
                  gradients: value.gradients?.map((c, j) =>
                    j === i ? { ...c, color: { type: "basic", color } } : c
                  ),
                });
              }}
            />
          )}
          {color.color?.type === "interpolate" && (
            <InterpolateColorInput
              value={color.color}
              onChange={(v) => {
                onChange({
                  ...value,
                  gradients: value.gradients?.map((c, j) =>
                    j === i ? { color: v, stop: c.stop } : c
                  ),
                });
              }}
            />
          )}
        </div>
      ))}

      <button
        className="btn btn-ghost btn-sm"
        onClick={() => {
          onChange({
            ...value,
            gradients: [
              ...(value.gradients || []),
              { color: { type: "basic", color: "#ffffffff" }, stop: 0 },
            ],
          });
        }}
      >
        <IoIosAdd />
      </button>
    </div>
  );
};

export function ColorInput<T extends BaseColor | Color>({
  value,
  onChange,
}: InputProps<Color>) {
  const [show, setShow] = useState(true);
  return (
    <div className="col-span-2 mt-2">
      <Select
        type={value?.type}
        onChange={(type) =>
          onChange(type ? ({ ...value, type } as T) : undefined)
        }
        hasGradients={true}
      />
      {value && value.type !== "basic" && (
        <ShowHide show={show} setShow={setShow} />
      )}
      {value?.type === "basic" && (
        <OneColorInput
          value={value.color}
          onChange={(v) => onChange({ ...value, color: v })}
        />
      )}
      {show && value?.type === "interpolate" && (
        <InterpolateColorInput
          value={value}
          onChange={(v) => onChange(v as any)}
        />
      )}
      {show && (value?.type === "linear" || value?.type === "radial") && (
        <GradientInput value={value} onChange={(v) => onChange(v as any)} />
      )}
    </div>
  );
}
