import { JustifyContent, TextStyle } from "@motionly/inputs";
import { z } from "zod";
import { Component } from "..";
import { useTextStyles } from "../helpers/useTextStyles";

export const TextProps = z.object({
  textStyle: TextStyle,
  text: z.string(),
  justifyContent: JustifyContent.optional(),
});
export type TextProps = z.infer<typeof TextProps>;

export const text: Component<TextProps> = {
  zod: TextProps,
  inputs: {
    text: { text: { label: "Text" } },
    textStyle: { text_style: { label: "Text Style" } },
    justifyContent: { select: { label: "Justify Content", options: "justify" } },
  },
  component: ({ text, textStyle, justifyContent }) => {
    const styles = useTextStyles(textStyle);
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent,
          height: "100%",
          width: "100%",
        }}
      >
        <p
          style={{
            ...styles,
            width: "100%",
            whiteSpace: "pre-wrap",
          }}
        >
          {text}
        </p>
      </div>
    );
  },
};
