"use client";

import { Color, TextStyle, VariableTypes } from "@motionly/base";
import { IoIosAdd, IoIosRemove } from "react-icons/io";
import { MediaInput } from "./types/media";
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
  const variableId = comp?.compVariables?.find(
    (i) => i.prop === props.prop
  )?.id;
  const variable = useProject((t) =>
    variableId ? t.project.template.variables?.byIds[variableId] : undefined
  );
  const [show, setShow] = useState(false);
  return (
    <div className={`${className}`}>
      <div
        className={`${props.label ? "label" : ""} ${tooltip ? "tooltip" : ""}`}
        data-tip={tooltip}
      >
        {props.label && <span className="label-text">{props.label}</span>}
        {props.prop && !variable ? (
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
        ) : (
          <IoIosRemove
            className="cursor-pointer"
            onClick={() =>
              setComp((s) => {
                s.compVariables = s.compVariables?.filter(
                  (i) => i.prop !== props.prop
                );
              })
            }
          />
        )}
      </div>
      <div>
        {variable && (
          <div
            onClick={() => setSelected("inputs")}
            className="input input-sm input-bordered bg-primary"
          >
            {variable.label}
          </div>
        )}
        {!variable && <Input {...props} />}
      </div>
    </div>
  );
}
export type InputProps<T> = {
  type: VariableTypes;
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
        props.type === "audio") && <MediaInput {...props} />}
    </>
  );
}
