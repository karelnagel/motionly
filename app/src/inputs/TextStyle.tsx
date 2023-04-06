import { z } from "zod";
import { DefineInput, getColspan } from ".";
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
