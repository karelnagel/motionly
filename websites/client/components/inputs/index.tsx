"use client";

import { Color, inputTypes, TextStyle } from "@motionly/base";
import { IoIosAdd, IoIosRemove } from "react-icons/io";
import { EditTextStyle } from "../../app/edit/[id]/SidePanel/Panels/EditCompPanel/EditTextStyle";
import { Media } from "../Media";
import { useStore } from "../../hooks/useStore";
import { ColorInput } from "./color";
import { getRandomId } from "../../helpers";
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
  const inputs = useStore((t) => t.project.template.inputs);
  const selected = useStore((t) => t.selected);
  const set = useStore((t) => t.set);

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
              set((s) => {
                const input = s.project.template.inputs!.byIds[id];
                if (!input.properties) input.properties = [];
                input.properties.push({ prop, id: selected });
              })
            }
          >
            {input.label}
          </p>
        );
      })}
      <p
        onClick={() =>
          set((s) => {
            const id = getRandomId();
            if (!s.project.template.inputs)
              s.project.template.inputs = { allIds: [], byIds: {} };
            const inputs = s.project.template.inputs;
            inputs.allIds.push(id);
            inputs.byIds[id] = {
              id,
              label: prop,
              type,
              value,
              properties: [{ id: selected, prop }],
            };
          })
        }
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
}: {
  type: keyof typeof inputTypes;
  label: string;
  value?: T;
  onChange: (value?: T) => void;
  className?: string;
  tooltip?: string;
  placeholder?: string;
  options?: { value: string; label: string }[];
  prop?: string;
}) {
  const inputs = useStore((t) => t.project.template.inputs?.byIds);
  const selected = useStore((t) => t.selected);
  const setSelected = useStore((t) => t.setSelected);
  const set = useStore((t) => t.set);

  const input = prop
    ? Object.values(inputs || {}).find((input) =>
        input.properties?.find((p) => p.id === selected && p.prop === prop)
      )
    : undefined;

  return (
    <div
      className={`form-control ${
        type === "number" || type === "checkbox" ? "col-span-1" : "col-span-2"
      } ${className}`}
    >
      <div className={`label ${tooltip ? "tooltip" : ""}`} data-tip={tooltip}>
        <span className="label-text">{label}</span>
        {prop && !input && (
          <div className="dropdown dropdown-bottom dropdown-end">
            <IoIosAdd tabIndex={0} className="cursor-pointer" />
            <VariableSelect prop={prop} type={type} value={value} />
          </div>
        )}
        {prop && input && (
          <IoIosRemove
            className="cursor-pointer"
            onClick={() => set((s) => {})} //Todo
          />
        )}
      </div>
      {input && (
        <button
          onClick={() => setSelected("inputs")}
          className="input input-sm input-bordered bg-primary"
        >
          {input.label}
        </button>
      )}
      {!input && (
        <>
          {type === "checkbox" && (
            <input
              type="checkbox"
              checked={(value as boolean) || false}
              className="checkbox checkbox-primary"
              onChange={(e) => onChange(e.target.checked as T)}
            />
          )}
          {type === "number" && (
            <input
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
              type="text"
              placeholder={placeholder}
              value={(value as string) || ""}
              className="input input-sm bg-base-200 input-bordered w-full"
              onChange={(e) => onChange(e.target.value as T)}
            />
          )}
          {type === "textarea" && (
            <textarea
              placeholder={placeholder}
              value={(value as string) || ""}
              className="textarea bg-base-200 textarea-bordered w-full"
              onChange={(e) => onChange(e.target.value as T)}
            />
          )}
          {type === "select" && (
            <select
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
            <EditTextStyle
              style={value as TextStyle}
              setStyle={(textStyle) => onChange(textStyle as T)}
            />
          )}
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
