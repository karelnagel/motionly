import { z } from "zod";
import { DefineInput, getColspan, Inputs } from "..";
import { fonts } from "@motionly/core";
import { Color } from "./Color";
export const TextAlign = z.enum(["left", "center", "right"]);
export type TextAlign = z.infer<typeof TextAlign>;
export const FontWeight = z.enum(["100", "200", "300", "400", "500", "600", "700", "800", "900"]);
export type FontWeight = z.infer<typeof FontWeight>;
export const TextStyle = z.object({
  fontSize: z.number().min(0).optional(),
  fontFamily: z.string().optional(),
  fontWeight: FontWeight.optional(),
  lineHeight: z.number().min(0).max(10).optional(),
  textAlign: TextAlign.optional(),
  bg: Color.optional(),
  color: Color.optional(),
  outlineColor: Color.optional(),
  outlineWidth: z.number().min(0).optional(),
});
export type TextStyle = z.infer<typeof TextStyle>;

export const inputs: Inputs<TextStyle> = {
  fontFamily: { select: { label: "Font Family", options: fonts } },
  fontSize: { number: { label: "Font Size", placeholder: "Font Size" } },
  fontWeight: { select: { label: "Font Weight", placeholder: "Font Weight", zod: FontWeight } },
  lineHeight: { number: { label: "Line Height", placeholder: "Line Height" } },
  textAlign: { select: { label: "Text Align", zod: TextAlign } },
  bg: { color: { label: "Background" } },
  color: { color: { label: "Color" } },
  outlineColor: { color: { label: "Outline Color" } },
  outlineWidth: { number: { label: "Outline Width" } },
};

export const text_style: DefineInput<TextStyle> = {
  zod: TextStyle,
  component: ({ props: { label, colspan }, value, onChange }) => {
    return (
      <div className="form-group" style={getColspan(colspan)}>
        <label>{label}</label>
        <Inputs inputs={inputs} value={value} onChange={(v) => onChange({ ...value, ...v })} />
      </div>
    );
  },
};
