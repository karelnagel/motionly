"use client";

import {
  Color,
  MediaTypes,
  SelectTypes,
  TextStyle,
  VariableTypes,
} from "@motionly/base";
import { MediaInput } from "./types/media";
import { useProject } from "../../hooks/useProject";
import { ColorInput } from "./types/color";
import { VariableSelect } from "./VariableSelect";
import { TextStyleInput } from "./types/textStyle";
import { StringArray } from "./types/StringArray";
import { CheckBoxInput } from "./types/checkbox";
import { NumberInput } from "./types/number";
import { TextAreaInput } from "./types/textarea";
import { TextInput } from "./types/text";
import { SelectInput, SelectOptions } from "./types/select";
import { useCallback } from "react";

export function VariableInput({
  className,
  tooltip,
  isTemplate,
  ...props
}: Input & { className?: string; tooltip?: string; isTemplate?: boolean }) {
  const { type, value } = props;
  const setSelected = useProject((t) => t.leftSetTab);
  const variable = useProject(
    useCallback(
      (p) => {
        if (isTemplate) {
          const id = p.project.template.templateVariables?.find(
            (i) => i.prop === props.prop
          )?.id;
          return id ? p.project.template.variables?.byIds[id] : undefined;
        } else {
          const id = p.project.template.components[
            p.selected
          ].compVariables?.find((i) => i.prop === props.prop)?.id;
          return id ? p.project.template.variables?.byIds[id] : undefined;
        }
      },
      [isTemplate]
    )
  );
  const isDivider = props.label?.includes("divider");
  return (
    <div className={`grid grid-cols-5 gap-2 w-full ${className}`}>
      {!isDivider && props.label && (
        <div
          className={`shrink-0 col-span-2 flex items-center ${
            tooltip ? "tooltip" : ""
          }`}
          data-tip={tooltip}
        >
          {props.prop && (
            <VariableSelect
              isTemplate={isTemplate}
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
      <div
        className={`w-full ${
          !props.label || isDivider ? "col-span-5" : "col-span-3"
        }`}
      >
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
  options?: SelectOptions;
};

type Input =
  | ({ type: "text" | "textarea" } & InputProps<string>)
  | ({ type: MediaTypes } & InputProps<string>)
  | ({ type: "number" } & InputProps<number>)
  | ({ type: "checkbox" } & InputProps<boolean>)
  | ({ type: "stringArray" } & InputProps<string[]>)
  | ({ type: SelectTypes } & InputProps<string | number>)
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
      {SelectTypes.options.includes(props.type as any) && (
        <SelectInput {...(props as InputProps<string | number>)} />
      )}
      {props.type === "color" && <ColorInput {...props} />}
      {props.type === "style" && <TextStyleInput {...props} />}
      {MediaTypes.options.includes(props.type as any) && (
        <MediaInput {...(props as InputProps<string>)} />
      )}
    </>
  );
}
