"use client";

import { Color, TextStyle, VariableTypes } from "@motionly/base";
import { MediaInput } from "./types/media";
import { useProject } from "../../hooks/useProject";
import { ColorInput } from "./types/color";
import { useComponent } from "../../hooks/useComponent";
import { VariableSelect } from "./VariableSelect";
import { TextStyleInput } from "./types/textStyle";
import { StringArray } from "./types/StringArray";
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
  const setSelected = useProject((t) => t.leftSetTab);
  const comp = useComponent();
  const variableId = comp?.compVariables?.find(
    (i) => i.prop === props.prop
  )?.id;
  const variable = useProject((t) =>
    variableId ? t.project.template.variables?.byIds[variableId] : undefined
  );
  const isDivider = props.label?.includes("divider");
  return (
    <div className={`grid grid-cols-4 w-full ${className}`}>
      {!isDivider && (
        <div
          className={`shrink-0 flex items-center ${tooltip ? "tooltip" : ""}`}
          data-tip={tooltip}
        >
          {props.prop && (
            <VariableSelect
              prop={props.prop}
              type={type}
              value={value}
              label={props.label}
              variable={!!variable}
            />
          )}
          {props.label && <span className="label-text">{props.label}</span>}
        </div>
      )}
      <div className={`w-full ${isDivider ? "col-span-4" : "col-span-3"}`}>
        {isDivider && (
          <div>
            <div className="divider" />
            <div className="flex items-center space-x-2">
              {props.prop && (
                <VariableSelect
                  prop={props.prop}
                  type={type}
                  value={value}
                  label={props.label}
                  variable={!!variable}
                />
              )}
              <p>{props.label?.replace("divider", "")}</p>
            </div>
          </div>
        )}
        {variable && (
          <div
            onClick={() => setSelected("inputs")}
            className="input input-sm input-bordered bg-primary overflow-hidden"
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
