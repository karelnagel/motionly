import { TextStyle } from "@motionly/base";
import { InputProps, VariableInput } from "..";
import { UserInput } from "../Inputs";

export const inputs: UserInput<TextStyle>[] = [
  {
    prop: "fontFamily",
    label: "Font",
    type: "font-family",
  },
  {
    prop: "fontSize",
    type: "number",
    label: "Font size (px)",
  },
  {
    prop: "lineHeight",
    type: "number",
    label: "Line height (px)",
  },
  {
    prop: "fontWeight",
    type: "font-weight",
    label: "Font weight",
  },
  {
    prop: "color",
    type: "color",
    label: "Color",
  },
  {
    prop: "bg",
    type: "color",
    label: "BG",
  },
  {
    prop: "textAlign",
    label: "Align",
    type: "align",
  },
  {
    prop: "outlineColor",
    type: "color",
    label: "Outline color",
  },
  {
    prop: "outlineWidth",
    type: "number",
    label: "Outline width",
    if: (c) => !!c.outlineColor,
  },
];

export const TextStyleInput = ({
  value,
  onChange,
  prop,
}: InputProps<TextStyle>) => {
  return (
    <div className="space-y-2">
      {inputs.map((input) => (
        <VariableInput
          key={input.prop}
          type={input.type as any}
          prop={`${prop}.${input.prop}`}
          label={input.label}
          value={value?.[input.prop] as any}
          onChange={(style: any) => {
            onChange({
              ...value,
              [input.prop]: style,
            });
          }}
        />
      ))}
    </div>
  );
};
