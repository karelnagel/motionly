"use client";

import { Color, InputTypes, TextStyle } from "@motionly/base";
import { IoIosAdd, IoIosRemove } from "react-icons/io";
import { Media } from "../Media";
import { useProject } from "../../hooks/useProject";
import { ColorInput } from "./types/color";
import { useComponent } from "../../hooks/useComponent";
import { VariableSelect } from "./VariableSelect";
import { TextStyleInput } from "./types/textStyle";
import { StringArray } from "./types/StringArray";
import { useState } from "react";
import { CheckBoxInput } from "./types/checkbox";
import { NumberInput } from "./types/number";
import { TextAreaInput } from "./types/textarea";
import { TextInput } from "./types/text";
import { SelectInput } from "./types/select";

export function VariableInput({
  className,
  tooltip,
  ...props
}: Input & { className?: string; tooltip?: string }) {
  const { type, value } = props;
  const setSelected = useProject((t) => t.setSelected);
  const setComp = useProject((t) => t.setComp);
  const comp = useComponent();
  const inputId = comp?.compInputs?.find((i) => i.prop === props.prop)?.id;
  const input = useProject((t) =>
    inputId ? t.project.template.inputs?.byIds[inputId] : undefined
  );
  const [show, setShow] = useState(false);
  return (
    <div className={`form-control ${className}`}>
      <div
        className={`${props.label ? "label" : ""} ${tooltip ? "tooltip" : ""}`}
        data-tip={tooltip}
      >
        {props.label && <span className="label-text">{props.label}</span>}
        {props.prop && !input && (
          <div className="dropdown dropdown-bottom dropdown-end">
            <IoIosAdd
              tabIndex={0}
              className="cursor-pointer"
              onClick={() => setShow(!show)}
            />
            {show && (
              <VariableSelect
                prop={props.prop}
                type={type}
                value={value}
                label={props.label}
              />
            )}
          </div>
        )}
        {props.prop && input && (
          <IoIosRemove
            className="cursor-pointer"
            onClick={() =>
              setComp((s) => {
                s.compInputs = s.compInputs?.filter(
                  (i) => i.prop !== props.prop
                );
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
export type InputProps<T> = {
  type: InputTypes;
  value?: T;
  onChange: (value?: T) => void;
  placeholder?: string;
  disabled?: boolean;
  prop?: string;
  label?: string;
  options?: { value: string; label: string }[];
};

type Input =
  | ({ type: "text" | "textarea" } & InputProps<string>)
  | ({ type: "gif" | "image" | "video" | "audio" } & InputProps<string>)
  | ({ type: "number" } & InputProps<number>)
  | ({ type: "checkbox" } & InputProps<boolean>)
  | ({ type: "stringArray" } & InputProps<string[]>)
  | ({ type: "select" } & InputProps<string>)
  | ({ type: "color" } & InputProps<Color>)
  | ({ type: "style" } & InputProps<TextStyle>)
  | ({ type: "color" } & InputProps<Color>);

export function Input(props: Input) {
  return (
    <>
      {props.type === "checkbox" && <CheckBoxInput {...props} />}
      {props.type === "number" && <NumberInput {...props} />}
      {props.type === "text" && <TextInput {...props} />}
      {props.type === "stringArray" && <StringArray {...props} />}
      {props.type === "textarea" && <TextAreaInput {...props} />}
      {props.type === "select" && <SelectInput {...props} />}
      {props.type === "color" && <ColorInput {...props} />}
      {props.type === "style" && <TextStyleInput {...props} />}
      {(props.type === "gif" ||
        props.type === "image" ||
        props.type === "video" ||
        props.type === "audio") && <Media {...props} />}
    </>
  );
}
