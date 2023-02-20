import { TextAlign, TextStyle } from "@motionly/base";
import { getAvailableFonts } from "@remotion/google-fonts";
import { InputProps, VariableInput } from "..";
import { UserInput } from "../Inputs";

export const inputs: UserInput<TextStyle>[] = [
  {
    prop: "fontFamily",
    type: "select",
    label: "Font",
    options: getAvailableFonts().map((f) => ({
      label: f.fontFamily,
      value: f.fontFamily,
    })),
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
    type: "number",
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
    type: "select",
    label: "Align",
    options: Object.keys(TextAlign).map((a) => ({
      label: a,
      value: a,
    })),
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
          type={input.type}
          prop={`${prop}.${input.prop}`}
          label={input.label}
          value={value?.[input.prop] as any}
          onChange={(style: any) => {
            onChange({
              ...value,
              [input.prop]: style,
            });
          }}
          options={input.options}
        />
      ))}
    </div>
  );
};
