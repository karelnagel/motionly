import { z } from "zod";
import { DefineInput, getColspan, TextAlign } from ".";
import { Color } from "./Color";

export const TextStyle = z.object({
  fontSize: z.number().min(0).optional(),
  fontFamily: z.string().optional(),
  fontWeight: z.string().min(0).optional(),
  lineHeight: z.number().min(0).max(10).optional(),
  textAlign: TextAlign.optional(),
  bg: Color.optional(),
  color: Color.optional(),
  outlineColor: Color.optional(),
  outlineWidth: z.number().min(0).optional(),
});
export type TextStyle = z.infer<typeof TextStyle>;

export const text_style: DefineInput<TextStyle> = {
  zod: TextStyle,
  component: ({ props: { label, colspan }, value, onChange }) => {
    return (
      <div className="form" style={getColspan(colspan)}>
        <label>{label}</label>
        <div></div>
      </div>
    );
  },
};
