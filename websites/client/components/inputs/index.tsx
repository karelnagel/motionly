"use client";

import { Color, inputTypes, TextStyle } from "@motionly/base";
import { IoIosAdd, IoIosRemove } from "react-icons/io";
import { EditTextStyle } from "../../app/edit/[id]/SidePanel/Panels/EditCompPanel/EditTextStyle";
import { getRandomId } from "../../helpers";
import { Media } from "../Media";
import { useTemplate } from "../../hooks/useTemplate";
import { ColorInput } from "./color";
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
  const template = useTemplate((t) => t.project.template);
  // const setTemplate = useTemplate((t) => t.setTemplate);
  const selected = useTemplate((t) => t.selected);

  return (
    <div
      className="absolute dropdown-content menu p-2 shadow bg-base-100 rounded-box w-40 cursor-pointer"
      tabIndex={0}
    >
      {template.inputs?.map((input) => (
        <button
          key={input.id}
          onClick={
            () => {}
            // setTemplate({
            //   ...template,
            //   inputs: template.inputs?.map((inp) =>
            //     input.id === inp.id
            //       ? {
            //           ...inp,
            //           properties: [
            //             ...(inp.properties || []),
            //             { prop, id: selected },
            //           ],
            //         }
            //       : inp
            //   ),
            // })
          }
        >
          {input.label}
        </button>
      ))}
      <button
        onClick={
          () => {}
          // setTemplate({
          //   ...template,
          //   inputs: [
          //     ...(template.inputs || []),
          //     {
          //       id: getRandomId(),
          //       type,
          //       label: prop,
          //       value,
          //       properties: [{ prop, id: selected }],
          //     },
          //   ],
          // })
        }
      >
        Add new
      </button>
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
  const template = useTemplate((t) => t.project.template);
  // const setTemplate = useTemplate((t) => t.setTemplate);
  const selected = useTemplate((t) => t.selected);
  const setSelected = useTemplate((t) => t.setSelected);

  const input = prop
    ? template.inputs?.find((input) =>
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
            onClick={
              () => {}
              // setTemplate({
              //   ...template,
              //   inputs: template.inputs?.map((i) => ({
              //     ...i,
              //     properties: i.properties?.filter(
              //       (i) => i.id !== selected && i.prop !== prop
              //     ),
              //   })),
              // })
            }
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
