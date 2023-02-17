"use client";

import { Color, InputTypes, TextStyle } from "@motionly/base";
import { IoIosAdd, IoIosRemove } from "react-icons/io";
import { Media } from "../Media";
import { useProject } from "../../hooks/useProject";
import { ColorInput } from "./color";
import { useComponent } from "../../hooks/useComponent";
import { VariableSelect } from "./VariableSelect";
import { TextStyleInput } from "./textStyle";
export * from "./color";

export function VariableInput<T extends any>({
  className,
  tooltip,
  prop,
  label,
  ...props
}: {
  type: InputTypes;
  label?: string;
  value?: T;
  onChange: (value?: T) => void;
  className?: string;
  tooltip?: string;
  placeholder?: string;
  options?: { value: string; label: string }[];
  prop?: string;
  disabled?: boolean;
}) {
  const { type, value } = props;
  const setSelected = useProject((t) => t.setSelected);
  const setComp = useProject((t) => t.setComp);
  const comp = useComponent();
  const inputId = comp?.compInputs?.find((i) => i.prop === prop)?.id;
  const input = useProject((t) =>
    inputId ? t.project.template.inputs?.byIds[inputId] : undefined
  );

  return (
    <div
      className={`form-control ${
        type === "number" || type === "checkbox" ? "" : "col-span-2"
      } ${className}`}
    >
      <div
        className={`${label ? "label" : ""} ${tooltip ? "tooltip" : ""}`}
        data-tip={tooltip}
      >
        {label && <span className="label-text">{label}</span>}
        {prop && !input && (
          <div className="dropdown dropdown-bottom dropdown-end">
            <IoIosAdd tabIndex={0} className="cursor-pointer" />
            <VariableSelect
              prop={prop}
              type={type}
              value={value}
              label={label}
            />
          </div>
        )}
        {prop && input && (
          <IoIosRemove
            className="cursor-pointer"
            onClick={() =>
              setComp((s) => {
                s.compInputs = s.compInputs?.filter((i) => i.prop !== prop);
              })
            }
          />
        )}
      </div>
      {input && (
        <div
          onClick={() => setSelected("inputs")}
          className="input input-sm input-bordered bg-primary"
        >
          {input.label}
        </div>
      )}
      {!input && <Input {...props} />}
    </div>
  );
}
export function Input<T extends any>({
  type,
  value,
  onChange,
  placeholder,
  options,
  prop,
  disabled,
}: {
  type: InputTypes;
  value?: T;
  onChange: (value?: T) => void;
  placeholder?: string;
  options?: { value: string; label: string }[];
  prop?: string;
  disabled?: boolean;
}) {
  return (
    <>
      {type === "checkbox" && (
        <input
          disabled={disabled}
          type="checkbox"
          checked={(value as boolean) || false}
          className="checkbox checkbox-primary"
          onChange={(e) => onChange(e.target.checked as T)}
        />
      )}
      {type === "number" && (
        <input
          disabled={disabled}
          type="number"
          placeholder={placeholder}
          value={value === undefined ? "" : (value as unknown as number)}
          className="input input-sm bg-base-200 input-bordered w-full"
          onChange={(e) =>
            onChange(e.target.value ? (Number(e.target.value) as T) : undefined)
          }
        />
      )}
      {type === "text" && (
        <input
          disabled={disabled}
          type="text"
          placeholder={placeholder}
          value={(value as string) || ""}
          className="input input-sm bg-base-200 input-bordered w-full"
          onChange={(e) => onChange(e.target.value as T)}
        />
      )}
      {type === "textarea" && (
        <textarea
          disabled={disabled}
          placeholder={placeholder}
          value={(value as string) || ""}
          className="textarea bg-base-200 textarea-bordered w-full"
          onChange={(e) => onChange(e.target.value as T)}
        />
      )}
      {type === "select" && (
        <select
          disabled={disabled}
          className="select select-bordered select-sm bg-base-200"
          value={value as string}
          onChange={(e) => onChange(e.target.value as T)}
        >
          <option value={undefined}>Not selected</option>
          {options?.map(({ value, label }, i) => (
            <option key={i} value={value}>
              {label}
            </option>
          ))}
        </select>
      )}
      {type === "color" && (
        <ColorInput
          gradients
          value={value as Color}
          onChange={(value) => onChange(value as T)}
        />
      )}
      {type === "style" && (
        <TextStyleInput
          prop={prop}
          style={value as TextStyle}
          setStyle={(textStyle) => onChange(textStyle as T)}
        />
      )}
      {(type === "gif" ||
        type === "image" ||
        type === "video" ||
        type === "audio") && (
        <Media
          type={type.toLowerCase() as any}
          value={value as string}
          onChange={(value) => onChange(value as T)}
        />
      )}
    </>
  );
}
