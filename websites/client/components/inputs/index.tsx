"use client";

import { Color, inputTypes, TextStyle } from "@motionly/base";
import { IoIosAdd, IoIosRemove } from "react-icons/io";
import { Media } from "../Media";
import { useProject } from "../../hooks/useProject";
import { ColorInput } from "./color";
import { getRandomId } from "../../helpers";
import { useComponent } from "../../hooks/useComponent";
export * from "./color";

export const VariableSelect = ({
  prop,
  type,
  value,
}: {
  prop: string;
  type: keyof typeof inputTypes;
  value: any;
}) => {
  const inputs = useProject((t) => t.project.template.inputs);
  const set = useProject((t) => t.set);
  const setComp = useProject((t) => t.setComp);

  return (
    <div
      className="absolute dropdown-content menu p-2 shadow bg-base-100 rounded-box w-40 cursor-pointer"
      tabIndex={0}
    >
      {inputs?.allIds.map((id) => {
        const input = inputs.byIds[id];
        if (input.type !== type) return null;
        return (
          <p
            key={id}
            onClick={() =>
              setComp((s) => {
                if (!s.compInputs) s.compInputs = [];
                s.compInputs.push({
                  id,
                  prop,
                });
              })
            }
          >
            {input.label}
          </p>
        );
      })}
      <p
        onClick={() => {
          const id = getRandomId();
          set((s) => {
            if (!s.project.template.inputs)
              s.project.template.inputs = { allIds: [], byIds: {} };
            const inputs = s.project.template.inputs;
            inputs.allIds.push(id);
            inputs.byIds[id] = {
              id,
              label: prop,
              type,
              value,
            };
          });
          setComp((s) => {
            if (!s.compInputs) s.compInputs = [];
            s.compInputs.push({ id, prop });
          });
        }}
      >
        Add new
      </p>
    </div>
  );
};

export function Input<T extends any>({
  type,
  label,
  value,
  onChange,
  className,
  tooltip,
  placeholder,
  options,
  prop,
  disabled,
}: {
  type: keyof typeof inputTypes;
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
            <VariableSelect prop={prop} type={type} value={value} />
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
      {!input && (
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
                onChange(
                  e.target.value ? (Number(e.target.value) as T) : undefined
                )
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
          {/* {type === "style" && (
            <EditTextStyle
              style={value as TextStyle}
              setStyle={(textStyle) => onChange(textStyle as T)}
            />
          )} */}
          {(type === "gif" || type === "image" || type === "video") && (
            <Media
              type={type}
              value={value as string}
              onChange={(value) => onChange(value as T)}
            />
          )}
        </>
      )}
    </div>
  );
}
